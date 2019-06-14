$(document).ready(function() {
$(".addItem").click(function(e) {
    console.log("jquery works")

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
        error: function(result) {
            alert('error');
        }
    });
});
});