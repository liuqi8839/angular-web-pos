
angular.module('angularWebPosApp')

    .controller('ItemListCtrl', function ($scope, $location) {
        $scope.cart_number = initShoppingCart();

        $scope.GoToMain = function() {
            $location.path('/');
        };
        $scope.GoToCart = function() {
            $location.path('/cart');
        };

        $scope.all_items = JSON.parse(localStorage.AllItems);

        $scope.addGoods = function(name) {
            $scope.cart_number += 1;
            var goods = JSON.parse(localStorage.Item);
            if(_.find(goods, {name: name})) {
                _.findWhere(goods, {name: name}).numbers += 1;
                return localStorage.Item = JSON.stringify(goods);
            }
            goods.push({name: name, numbers: 1});
            localStorage.Item = JSON.stringify(goods);
        };

    });