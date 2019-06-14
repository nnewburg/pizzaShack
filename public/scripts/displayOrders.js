  $(() => {
  $.ajax({
    method: "GET",
    url: "/api/orders"
  }).done((resources) => {
    for(resource of resources) {
      renderOrders(createOrder(resource))
    }
  });


function createOrder(resource){

    let dummy = $("<div></div>");
    $(dummy).text("hello world");
    return dummy
  });

function renderOrders(data) {
    data.appendTo($('#myOrder'));
}

});




