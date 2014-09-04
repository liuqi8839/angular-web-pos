angular.module('angularWebPosApp')
    .controller('PayCtrl', function ($scope,$location) {
        $scope.cart_number = initShoppingCart();
        $scope.GoToMain = function() {
            $location.path('/');
        };
        $scope.GoToItemList = function() {
            $location.path('/item_list');
        };
        $scope.GoToCart = function() {
            $location.path('/cart');
        };
        $scope.ClearGoods = function() {
            localStorage.Item = "[]";
            $location.path('/');
        };

        var myDate = new Date();
        $scope.time = myDate.toLocaleString( );
        var goods = JSON.parse(localStorage.Item);

        var total = 0;
        var preferential_price = 0;
        var minor_total = 0;
        var allItems = JSON.parse(localStorage.AllItems);
        var preferential = JSON.parse(localStorage.preferential);
        $scope.all_goods = [];
        $scope.preferential_goods = [];

        _.some(allItems, function (oneItem) {
            _.some(goods, function (oneGoods) {
                var name = oneGoods.name;
                var count = oneGoods.numbers;
                if(oneItem.name == name) {
                    var kind = oneItem.kind;
                    var price = oneItem.price;
                    var unit = oneItem.unit;
                    var original_cost = minor_total = price * count;
                    var cost =  minor_total + "元";

                    _.some(preferential, function (onePreferential) {
                        if(name == onePreferential && count >= 3) {
                            var preferential_counts = parseInt(count / 3);
                            var num = count - preferential_counts;
                            minor_total = price * num;
                            cost = minor_total + "元(原价：" + original_cost + "元)";
                            $scope.preferential_goods.push({kind: kind, name: name, count: preferential_counts});
                            preferential_price += preferential_counts * price;
                        }
                    });
                    $scope.all_goods.push({kind: kind, name: name, price: price, unit: unit, count: count, cost: cost});

                    total += minor_total;
                }
            });
        });
        $scope.total_cost = total.toFixed(2);
        $scope.total_preferential = preferential_price.toFixed(2);
    });