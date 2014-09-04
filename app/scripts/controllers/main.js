angular.module('angularWebPosApp')

    .controller('MainCtrl', function ($scope, $location) {
        $scope.cart_number = initShoppingCart();
        $scope.GoToItemList = function() {
            $location.path('/item_list');
        };
        $scope.GOToCart = function() {
            $location.path('/cart');
        };

        initItemsList();
        initPreferentialGoods();
    });