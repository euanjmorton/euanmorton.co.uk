$( document ).ready(function() {
    console.log( "ready!" );
  
    $("#burgerButton").on( "click", function() {
        var sideBarOpen = !$("#sideBarContent").hasClass("hidden");
        if(sideBarOpen){
            $("#sideBarContent").addClass("hidden");
            $("#sideBarContainer").css("width", "");
        }
        else{
            $("#sideBarContent").removeClass("hidden");
            $("#sideBarContainer").css("width", "200px");
        }
    });

    //get temp:
    $.ajax({
        url: "/api/getFridgeStatusText",
        dataType: 'json',
        crossDomain: true,
        timeout: 4000,
        success: function (data,status,xhr) {
            console.log(data);
            $('#heatingMessage').text(data.message);
            $('#currentTemp').text(data.temperature);
        },
        error: function (jqXhr, textStatus, errorMessage) { 
            console.log('jqXhr: ' + jqXhr); 
            console.log('error: ' + textStatus); 
            console.log('data: ' + errorMessage);
        }
      });
    
});