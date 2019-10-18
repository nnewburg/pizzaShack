$(function( $ ){

//   $.ajax({
//            method: "GET",
//             url: "/api/items"
//         }).done ((items) => {

//     let currentValItems = {}
//      for(value of items){
//       currentValItems[value.description] = $(`#${value.description}Cart`).val()
//      }
// }).done((results) => {
$(document).on("change", '.itemInputBox', function (e) {

console.log(e.currentTarget)
console.log(e.currentTarget.alt)



$.ajax({
           method: "GET",
            url: "/api/items"
        }).done ((items) => {


                  let placeHolder = e.target.id
                  let res = placeHolder.replace("Cart", "");
                  let price = 0;

                  for(product of items){
                      if(res == product.description){
                        price = product.price;
                      }
                  }

    let quantity = $(`#${res}Cart`).val()

    if(quantity > e.currentTarget.alt){

      let str = e.currentTarget.id
      incrementTotalCost(price)
      $(`#${res}Cart`).attr("alt", quantity)



        $.ajax({
        type: "POST",
        url: "/addItem",
        data: {
            id: str.replace("Cart", ""), // < note use of 'this' here
            access_token: $("#access_token").val()
        },
        success: function(result) {
                $.ajax({
                     method: "GET",
                     url: "/api/orders"
                }).done((resources) => {
                  $(`#${res}Price`).text(`Cost: $ ${price * quantity}`)
                })
        }
        })
        }else {

          let str = e.currentTarget.id
          decrementTotalCost(price)
          $(`#${res}Cart`).attr("alt", quantity)


        $.ajax({
        type: "POST",
        url: "/decrementItem",
        data: {
            id: str.replace("Cart", ""), // < note use of 'this' here
            access_token: $("#access_token").val()
        },
        success: function(result) {
                $.ajax({
                     method: "GET",
                     url: "/api/orders"
                }).done((resources) => {
                  $(`#${res}Price`).text(`Cost: $ ${price * quantity}`)
                })
        }
        })

        }



   })






  })
});


function incrementTotalCost (data){
    let test = $('#totalCost').text()
    let result = parseInt(test.replace(/\D/g, ''));

    $('#totalCost').text(`Total Cost: $ ${result+data}`)
}

function decrementTotalCost (data){
    let test = $('#totalCost').text()
    let result = parseInt(test.replace(/\D/g, ''));

    $('#totalCost').text(`Total Cost: $ ${result-data}`)
}
