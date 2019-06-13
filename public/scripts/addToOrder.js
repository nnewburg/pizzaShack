$(document).ready(function () {

$('#main').on('click', '.addItem', function(e) {

    let dummy = $("<div></div>");
    $(dummy).text("hello world");
    $("#myOrder").append(dummy);
  });

    $.ajax({
      method: 'PUT',
      url: `/`,

      success: function(result){
        console.log('post')
      },
      error: function(err){
        console.log("there was an error updating rating to db");
      }
    })


  });

