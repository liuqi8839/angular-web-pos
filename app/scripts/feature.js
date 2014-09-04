function initShoppingCart() {
    var numbers = 0;
    if (!localStorage.Item) {
        localStorage.Item = "[]";
    }
    var Items = JSON.parse(localStorage.Item);
    for (var i = 0; i < Items.length; i++) {
        numbers += Items[i].numbers;
    }
    return numbers;
}

function initItemsList() {
    var ItemList = [
        {
            kind:'饮料',
            name:'可口可乐',
            price:3,
            unit:'瓶'
        },
        {
            kind:'饮料',
            name:'雪碧',
            price:3,
            unit:'瓶'
        },
        {
            kind:'水果',
            name:'苹果',
            price:5.5,
            unit:'斤'
        },
        {
            kind:'水果',
            name:'荔枝',
            price:15,
            unit:'斤'
        },
        {
            kind:'生活用品',
            name:'电池',
            price:2,
            unit:'个'
        },
        {
            kind:'食品',
            name:'方便面',
            price:4.5,
            unit:'袋'
        }
    ];
    localStorage.AllItems = JSON.stringify(ItemList);
}

function initPreferentialGoods() {
    var preferential = ['可口可乐','雪碧','方便面'];
    localStorage.preferential = JSON.stringify(preferential);
}