$(function( $ ){

$(document).on("click", '.removeItem', function (e) {

      $.ajax({
        type: "POST",
        url: "/removeItem",
        data: {
            id: e.target.id, // < note use of 'this' here
            access_token: $("#access_token").val()
        },
                   }).done((resources) => {
                     $.ajax({
           method: "GET",
            url: "/api/items"
        }).done ((items) => {

console.log("Birchwood" + items)



let item = e.target.id.slice(6,e.target.id.length)
let parse = e.target.id.slice(0,6)

let price = 0;
console.log("zoidberg" + items[0].price)

for(product of items){
        if(item == product.description){
          price = product.price;
        }
      }


console.log("derpity" + price)


let quantity = $(`#${item}Cart`).val()

decrementTotalCost((quantity*price))

let parent = $(`#${e.target.id}`).parent()
$(parent).remove();

})

})



})

})


function decrementTotalCost (data){
    let test = $('#totalCost').text()
    let result = parseInt(test.replace(/\D/g, ''));

    $('#totalCost').text(`Total Cost: $ ${result-data}`)
}
