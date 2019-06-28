

 $(function( $ ){
  $.ajax({
    method: "GET",
    url: "/api/orders"
  }).done((resources) => {
    console.log(resources)
    if(resources[0]){
    let data = resources[0].itemsOrdered
    let crop = data.split(",")
    for(resource of crop) {
      renderOrders(createOrder(resource))
    }
  }
  });


function createOrder(resource){

    let dummy = $("<div></div>");
    $(dummy).text(resource);
    return dummy
  };

function renderOrders(data) {
    data.appendTo($('#myOrder'));
}

});




