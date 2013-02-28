window.UserView = Backbone.View.extend({
	
	
	
	initialize: function() {
        this.template = _.template(tpl.get('login'));
    },
    
    render: function(eventName) {
    	$(this.el).html(this.template());
        return this;
    },
    events: {
       
		"click #loginButton": "loginUser"
    },
    loginUser: function(event) {
    
    	
    	 event.preventDefault(); // Don't let this button submit the form
         $('.alert-error').hide(); // Hide any errors on a new submit
         var url = 'api/users';
         console.log('Loggin in... ');
         /*var formValues = {
             email: $('#userName').val(),
             password: $('#password').val()
         };*/
         var formValues = JSON.stringify({
        	 userName: $('#userName').val(),
             password: $('#password').val()
             }); 

         $.ajax({
             url:url,
             contentType: "application/json",
             type:'POST',
             dataType:"json",
             data: formValues,
             success:function (data) {
                 console.log(["Login request details: ", data]);
                 var result = data.userName;
                 var id=data.id;
                 if(result==null)
                 {	 
                	 $('.alert-error').text('User Name or password incorrect').show();
                 }
                 else { // If not, send them back to the home page
                	// var DATA = result;
                	 //var COOKIE = 'user_login';
                	 //var c = newCookie(COOKIE);
                	 //c.save();
                	 $.cookie('user_login', result, { expires: 1 });
                     window.location.replace('#list');
                 }
             }
         });
    }

});

var newCookie = function(COOKIE,DATA) {
    return new Cookie({ id: COOKIE,data:DATA });
};