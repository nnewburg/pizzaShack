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

console.log("Birchwood" + e.target.id)
console.log(items[0])

let parse = e.target.id.slice(0,6)

let price = $(`#${e.target.id}`).siblings(`id.${parse}+price`)

console.log(price)

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
