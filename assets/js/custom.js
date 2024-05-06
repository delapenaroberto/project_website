

$(document).ready(function(){

    var spinnerWrapper = $('.spinner-wrapper');
    var nav = $('nav');
    var div = $('div');
    lastScrollTop = 0;
 
    navbar_height = document.querySelector('.navbar').offsetHeight;
     document.body.style.paddingTop = navbar_height + 'px';
    
    $(window).on('scroll', function() {
       var currentScrollTop = $(this).scrollTop();
 
       if(currentScrollTop > lastScrollTop) {
          nav.removeClass('scrolled-up');
          nav.addClass('scrolled-down');
       } else {
          nav.addClass('scrolled-up');
          nav.removeClass('scrolled-down');
       }
 
       lastScrollTop = currentScrollTop;
    },
    function() {
      
 
    }
    
   );
 
    $(window).on('load', function() {
       spinnerWrapper.css('opacity','0');
       
 
       setTimeout(function(){
          spinnerWrapper.css('display', 'none');
          $('#loader').remove();
       }, 200);
    });
 
   $('#contactForm').submit(function (e) { 
    
    e.preventDefault();
    var name = $('#contact-name').val();
    var email = $('#contact-email').val();
    var message = $('#contact-message').val();
    
    
    var errorOccured;
    if(($.trim(name).length == 0 || $.trim(email).length == 0 || $.trim(message).length == 0)) {
       if($('#messageDisplay').hasClass("alert alert-danger") == false){
          $('#messageDisplay').addClass("alert alert-danger my-2 p-2 text-center");
          $("<p> Incomplete fields. Try again. </p>").appendTo('#messageDisplay');
          errorOccured = true;
       }
     
    }  else {
       $('#messageDisplay').removeClass("alert alert-danger my-2 p-2 text-center");
       $('#messageDisplay').find("p").remove();
       errorOccured = false;
    }
 
    if(!emailValidation(email)) {
       if($('#messageDisplay').hasClass("alert alert-danger") == false){
          $('#messageDisplay').addClass("alert alert-danger my-2 p-2 text-center");
          $("<p> Invalid email. Try again. </p>").appendTo('#messageDisplay');
          errorOccured = true;
       }
    } else {
       $('#messageDisplay').removeClass("alert alert-danger my-2 p-2 text-center");
       $('#messageDisplay').find("p").remove();
       errorOccured = false;
    }
    
    
    if(errorOccured == false) {
       var formData = $('#contactForm').serializeArray();
      
    $.ajax({
       // database connection na
       type: "POST",
       url: "submit.php",
       data: formData,
       
       success: function () {
          Swal.fire(
             'Good job!',
             'You clicked the button!',
             'success'
           )
 
         
          reset();
       }
    });
    }
      
    
   });
 });
 
 function emailValidation($email) {
    var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailPattern.test($email);
 }
 
 function reset() {
    $('form :input').val('');
    $('#contact-submit').val("Send Message");
 
 }
 
 