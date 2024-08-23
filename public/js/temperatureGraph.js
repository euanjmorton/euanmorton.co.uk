console.log("Tempy graphs");


//call db
//get values
//create graph
//plot temps


$( document ).ready(function() {
    console.log( "ready!" );
  
    //call website
    $.ajax({
        url: "/api/getFridgeStatus",   // request url
        dataType: 'json', // type of response data
        crossDomain: true,
        timeout: 4000,     // timeout milliseconds
        success: function (data,status,xhr) {   // success callback function
            console.log(data);
            $('#heatingMessage').text(data);
        },
        error: function (jqXhr, textStatus, errorMessage) { // error callback 
            console.log('jqXhr: ' + jqXhr); 
            console.log('error: ' + textStatus); 
          console.log('data: ' + errorMessage);
        }
      });
    
});