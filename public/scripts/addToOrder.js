

 $(function( $ ){

$(document).on("click", '.addItem', function (e) {
    // console.log(e.target.id)

    $.ajax({
        type: "POST",
        url: "/addItem",
        data: {
            id: e.target.id, // < note use of 'this' here
            access_token: $("#access_token").val()
        },
        success: function(result) {
                $.ajax({
                     method: "GET",
                     url: "/api/orders"
                }).done((resources) => {
    $.ajax({
       method: "GET",
        url: "/api/items"
    }).done ((items) => {
    console.log("shoal")

    console.log(items)

    let price = 0;
    let data = resources[0].itemsOrdered
    let crop = data.split(",")

    console.log(crop[crop.length-1])
    console.log(items[0].description)
    console.log(items[0].price)

    for(let i = 0; i < items.length; i++) {
        console.log("loop works")
        if(items[i].description == crop[crop.length-1]){
           price = items[i].price
        }
        console.log("price declared")
    }

    console.log('price actually', price)

      renderOrders(createOrder(crop[crop.length-1], price))
  })
});
        },
        fail: function(result) {
            alert('error');
        }
    });






});
})

 function createOrder(resource, price){

    let dummy = $("<div></div>");
    $(dummy).addClass("cartItem");
    $(dummy).text(resource);
    let numOfPrice = $("<p></p>")
    $(numOfPrice).text(price);
    $(dummy).append(numOfPrice);
    return dummy
  };

function renderOrders(data) {
    data.appendTo($('#myOrder'));
}
