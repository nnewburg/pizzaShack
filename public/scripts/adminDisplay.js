 $(function( $ ){
      $.ajax({
        method: "GET",
        url: "/api/allOrders"
      }).done((resources) => {
        $.ajax({
           method: "GET",
            url: "/api/items"
        }).done ((items) => {
    console.log("check" + resources[0].itemsOrdered)

    resources.forEach(function(order){

    let data = order.itemsOrdered
    let crop = data.split(",")
    let quantityObj = {}

    crop.forEach(function(ele) {
        if(quantityObj.hasOwnProperty(ele)){
          quantityObj[ele] += 1
        }else {
          quantityObj[ele] = 1
        }
    })

    let totalCost = 0

    for(let prop in quantityObj){
      if(Object.prototype.hasOwnProperty.call(quantityObj, prop)){
        let price = 0;
        for(let i = 0; i < items.length; i++) {
            if(items[i].description == prop ){
              console.log("if works")
              price = items[i].price
              console.log(price)
            }
        }

        totalCost += (price * quantityObj[prop])

        renderOrders(displayOrder(prop, price, quantityObj[prop]));
      }
    }

   totalItemsCost(totalCost)

   // console.log("Daj")

   // let nard = $("<p></p>")
   // $(nard).text("Yuck")
   // $(nard).appendTo($('#adminMain'))

})
    })
  })
});

 function totalItemsCost(arg){
  let totalCostEle = $("<p></p>")
  $('#jim').val(arg)
  $(totalCostEle).text("Total: $" + arg)
  $(totalCostEle).css("float", "right")
  $(totalCostEle).css("marginRight", "4rem")
  $(totalCostEle).appendTo($('#adminMain'));
 }


 function renderOrders(data) {
    data.appendTo($('#adminMain'));
  }

  function displayOrder(resource,cost,quantity){

  if(resource.length > 0){
    let dummy = $("<div></div>");
    $(dummy).addClass("orderDiv")
    let name = $("<p></p>")
    $(name).addClass("orderItem");
    $(name).text(resource+ "  ")
    let price = $("<p></p>")

    let quantity1 = $("<p></p>");
    $(quantity1).text(" x " + quantity)
    $(quantity1).addClass("orderItem");
    let itemTotal = $("<p></p>");
    $(itemTotal).addClass("orderItemCost");
    $(itemTotal).text("$" + cost*quantity);
    $(dummy).append(name)
    $(dummy).append(quantity1)


    $(dummy).append(itemTotal)

    return dummy
  }
  };
