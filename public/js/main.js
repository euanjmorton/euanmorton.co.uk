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
    
});