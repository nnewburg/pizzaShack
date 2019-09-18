

 $(function( $ ){
      $.ajax({
        method: "GET",
        url: "/api/orders"
      }).done((resources) => {
        $.ajax({
           method: "GET",
            url: "/api/items"
        }).done ((items) => {
    console.log("check" + resources[0].itemsOrdered)

    let data = resources[0].itemsOrdered
    let crop = data.split(",")


crop.forEach(function(element) {
  let price = 0;

  for(let i = 0; i < items.length; i++) {
        if(items[i].description == element ){
          console.log("if works")
          price = items[i].price
          console.log(price)
        }
    }

  renderOrders(displayOrder(element, price));
});


  })
  })
});

 function renderOrders(data) {
    data.appendTo($('#itemsOrdCheckout'));
}

      function displayOrder(resource,cost){

  if(resource.length > 0){
    let dummy = $("<div></div>");
    let name = $("<p></p>")
    $(name).addClass("orderItem");
    $(name).text(resource+ "  ")
    let price = $("<p></p>")
    $(price).addClass("orderItem orderPrice");
    $(price).text("cost: $" + cost)
    $(dummy).append(name)
    $(dummy).append(price)
    // let quantity = $("<input></input>")
    // $(quantity).attr({
    //   id: resource + "Cart",
    //   size: "10",
    //   class: "itemInputBox",
    //   type: "number",
    //   min: "1",
    //   max: "10",
    //   value: amount,
    //   alt: amount

    // })

    // let numOfPrice = $("<p></p>")
    // $(numOfPrice).attr({id: resource+"Price", class:"itemPrice"})
    // $(numOfPrice).text(`Cost: $ ${price * amount}`);
    // $(dummy).append(quantity)
    // $(dummy).append(numOfPrice);
    // let deleteOrder = $("<a></a>")
    // $(deleteOrder).attr({id: "remove" + resource, href: "#", class: "removeItem"})
    // $(deleteOrder).text("Remove Item")
    // $(dummy).append(deleteOrder);
    return dummy
  }
  };
