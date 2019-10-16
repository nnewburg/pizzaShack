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

      for(let prop in quantityObj){


       words += prop + " x " + quantityObj[prop] + ", "

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
    $(tele).addClass("adminItems")
    let name = $("<p></p>")
    $(name).addClass("adminItems")
    $(name).text(resource+ "  ")
    let itemTotal = $("<span></span>");
    $(itemTotal).addClass("adminItems")
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