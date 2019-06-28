

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
    console.log("shoal")
    console.log(resources)
    let data = resources[0].itemsOrdered
    let crop = data.split(",")
      renderOrders(createOrder(crop[crop.length-1]))

  });
        },
        fail: function(result) {
            alert('error');
        }
    });






});
})

 function createOrder(resource){

    let dummy = $("<div></div>");
    $(dummy).text(resource);
    return dummy
  };

function renderOrders(data) {
    data.appendTo($('#myOrder'));
}
