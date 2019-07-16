

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
    let flagAdd = true;
    let flagLoop = true;

    for(let i = 0; i < items.length; i++) {
        console.log("loop works")
        if(items[i].description == crop[crop.length-1]){
           price = items[i].price
        }
    }

    while(flagLoop){
    for (let i = 0; i < crop.length-1; i++){
        if(crop[i] == crop[crop.length-1]){
            addItem(crop[i], price)
            incrementTotalCost(price)
            flagAdd = false;
            flagLoop = false;
            return
        }
    }
        flagLoop = false;
    }

    if(flagAdd){

      renderOrders(createOrder(crop[crop.length-1],1, price))
      incrementTotalCost(price)
  }
  })
});
        },
        fail: function(result) {
            alert('error');
        }
    });






});
})

 function addItem(resource,price){
    let value = parseInt($(`#${resource}Cart`).val())
    $(`#${resource}Cart`).val(parseInt(value+1))
    let amount = value + 1
    $(`#${resource}Price`).text(`Cost: $ ${price * amount}`);
 }

function createOrder(resource,amount,price){

    let dummy = $("<div></div>");
    $(dummy).addClass("cartItem");
    $(dummy).text(resource);
    let quantity = $("<input></input>")
    $(quantity).attr({
      id: resource + "Cart",
      size: "10",
      class: "itemInputBox",
      type: "number",
      min: "0",
      max: "10",
      value: amount
    })
    $(quantity).attr("mog", "amount")
    let numOfPrice = $("<p></p>")
    $(numOfPrice).attr({id: resource+"Price"})
    $(numOfPrice).text(`Cost: $ ${price * amount}`);
    $(dummy).append(quantity)
    $(dummy).append(numOfPrice);
    return dummy
  };


function renderOrders(data) {
    data.appendTo($('#cartItems'));
}

function incrementTotalCost (data){
    let test = $('#totalCost').text()
    let result = parseInt(test.replace(/\D/g, ''));

    $('#totalCost').text(`Total Cost: $ ${result+data}`)
}
