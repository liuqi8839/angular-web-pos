
angular.module('angularWebPosApp')
  .controller('CartCtrl', function ($scope,$location) {
        $scope.cart_number = initShoppingCart();

        $scope.GoToMain = function() {
            $location.path('/');
        };
        $scope.GoToItemList = function() {
            $location.path('/item_list');
        };
        $scope.GoToPay = function() {
            $location.path('/pay');
        };

        var goods = JSON.parse(localStorage.Item);

        function showAll() {
            var total = 0;
            var minor_total = 0;
            var allItems = JSON.parse(localStorage.AllItems);
            var preferential = JSON.parse(localStorage.preferential);
            $scope.allGoods = [];

            _.some(allItems, function (oneItem) {
                _.some(goods, function (oneGoods) {
                    var name = oneGoods.name;
                    var count = oneGoods.numbers;
                    if (oneItem.name == name) {
                        var kind = oneItem.kind;
                        var price = oneItem.price;
                        var unit = oneItem.unit;
                        var original_cost = minor_total = price * count;
                        var cost = minor_total + "元";

                        _.some(preferential, function (onePreferential) {
                            if (name == onePreferential && count >= 3) {
                                var num = count - parseInt(count / 3);
                                minor_total = price * num;
                                cost = minor_total + "元(原价：" + original_cost + "元)";
                            }
                        });

                        $scope.allGoods.push({kind: kind, name: name, price: price, unit: unit, count: count, cost: cost});

                        total += minor_total;
                    }
                })
            });

            $scope.total_cost = total.toFixed(2);
        }

        showAll();

        $scope.subGoods = function(name) {
            _.some(goods, function(oneGoods) {
                if(oneGoods.name == name) {
                    oneGoods.numbers -= 1;
                }
            });
            for(var i = 0; i < goods.length; i++) {
                if(goods[i].numbers == 0) {
                    goods.splice(i,1);
                }
            }
            localStorage.Item = JSON.stringify(goods);
            if(goods.length == 0) {
                $location.path('/item_list');
            }
            showAll();
        };

        $scope.addGoods = function(name) {
            _.findWhere(goods, {name: name}).numbers += 1;
            localStorage.Item = JSON.stringify(goods);
            showAll();
        };
  });
