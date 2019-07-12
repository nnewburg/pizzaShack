

 $(function( $ ){
  $.ajax({
    method: "GET",
    url: "/api/orders"
  }).done((resources) => {
    $.ajax({
       method: "GET",
        url: "/api/items"
    }).done ((items) => {
    console.log(resources)
    if(resources[0]){
       let price = 0;
       let totalPrice = 0;
    let data = resources[0].itemsOrdered
    let crop = data.split(",")
    for(resource of crop) {
      for(product of items){
        if(resource == product.description){
          price = product.price;
          totalPrice += product.price;
        }
      }

      renderOrders(createOrder(resource,price,totalPrice))

    }
    calculateTotalPrice(totalPrice)
  }
});
  });





function createOrder(resource, price){

    let dummy = $("<div></div>");
    $(dummy).addClass("cartItem");
    $(dummy).text(resource);
    let numOfPrice = $("<p></p>")
    $(numOfPrice).text(`Cost: $ ${price}`);
    $(dummy).append(numOfPrice);
    return dummy
  };


function renderOrders(data) {
    data.appendTo($('#cartItems'));
}

function calculateTotalPrice(price){
  $('#totalCost').text(`Total Cost: $ ${price}`)
}

});




