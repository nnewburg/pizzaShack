 $(function( $ ){

$(document).on("click", '.addItem', function () {
    console.log("works")

    $.ajax({
        type: "POST",
        url: "/addItem",
        data: {
            id: $(this).val(), // < note use of 'this' here
            access_token: $("#access_token").val()
        },
        success: function(result) {
            alert('ok');
        },
        fail: function(result) {
            alert('error');
        }
    });

     $.ajax({
    method: "GET",
    url: "/api/orders"
  }).done((resources) => {
    console.log(resources)

      renderOrders(createOrder(resources[resources.length-1]))

  });




});
})

 function createOrder(resource){

    let dummy = $("<div></div>");
    $(dummy).text("hello world");
    return dummy
  };

function renderOrders(data) {
    data.appendTo($('#myOrder'));
}
