 $(function( $ ){
      $.ajax({
        method: "GET",
        url: "/api/allOrders"
      }).done((resources) => {
        $.ajax({
           method: "GET",
            url: "/api/items"
        }).done ((items) => {

resources.forEach(function(order){


          let data = order.itemsOrdered
          let crop = data.split(",")
          let quantityObj = {}
          let words = ""

          crop.forEach(function(ele) {
              if(quantityObj.hasOwnProperty(ele)){
                quantityObj[ele] += 1
              }else {
                quantityObj[ele] = 1
              }
          })

      let count = 0
      for(let prop in quantityObj){

       if(count !== 0){
        words += ", " + prop + " x " + quantityObj[prop]
       }
       else {
        words += prop + " x " + quantityObj[prop]
       }

       count ++
      }

      renderOrders(displayOrder(order.Date, order.Phone, words, order.totalCost ));
    })

    })
  })
});

 function renderOrders(data) {
    data.appendTo($('#adminMain'));
  }

  function displayOrder(ordDate, phone, resource, total){

  if(resource.length > 0){
    let orderDiv = $("<div></div>");
    $(orderDiv).addClass("adminOrdDiv")
    let date = $("<p></p>")
    $(date).text(ordDate)
    $(date).addClass("adminItems")
    let tele = $("<p></p>")
    $(tele).text(addDashes(phone))
    $(tele).addClass("adminTel")
    let name = $("<p></p>")
    $(name).addClass("adminDesc")
    $(name).text(resource+ "  ")
    let itemTotal = $("<p></p>");
    $(itemTotal).addClass("adminCost")
    $(itemTotal).text("Total: $" + total);
    $(orderDiv).append(date)
    $(orderDiv).append(tele)
    $(orderDiv).append(name)
    $(orderDiv).append(itemTotal)



    return orderDiv
  }
  };

function addDashes(f)
{
   let f_val = f.replace(/\D[^\.]/g, "");
   return done = f_val.slice(0,3)+"-"+f_val.slice(3,6)+"-"+f_val.slice(6);

}