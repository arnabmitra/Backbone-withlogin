Backbone.View.prototype.close = function () {
    console.log('Closing view ' + this);
    if (this.beforeClose) {
        this.beforeClose();
    }
    this.remove();
    this.unbind();
};

var AppRouter = Backbone.Router.extend({

    initialize: function() {
        $('#header').html( new HeaderView().render().el );
    },

	routes: {
		"list"    :"list",
		""			: "login",
		"wines/new"	: "newWine",
		"wines/:id"	: "wineDetails"
	},

	list: function() {
		
		var c=$.cookie('user_login');
		if(c!=null)
			{
		//var username=c.get('data');
        this.before();
			}
		else
			{
			this.showErrorPage();
			}
  	},

	wineDetails: function(id) {
        this.before(function() {
			var wine = app.wineList.get(id);
		    app.showView( '#content', new WineView({model: wine}) );
        });
  	},

	newWine: function() {
        this.before(function() {
    		app.showView( '#content', new WineView({model: new Wine()}) );
        });
	},

    showView: function(selector, view) {
        if (this.currentView)
            this.currentView.close();
        $(selector).html(view.render().el);
        this.currentView = view;
        return view;
    },

    before: function(callback) {
        if (this.wineList) {
            if (callback) callback();
        } else {
            this.wineList = new WineCollection();
       		this.wineList.fetch({success: function() {
       		   $('#mainSpan3').append('<div id="sidebar" class="well sidebar-nav"></div>');
       		   $('#mainSpan3').append('<div id="header"></div>');
       		   $('#header').html( new HeaderView().render().el );
               $('#sidebar').html( new WineListView({model: app.wineList}).render().el );
               var id1=1;
               var wine = app.wineList.get(id1);
               app.showView( '#content', new WineView({model: wine}) );
               if (callback) callback();
            }});
        }
    },
    login: function() {
    	
        $('#content').html(new UserView().render().el);
    },
    showErrorPage: function () {
    	$(document.body).append(new ErrorView().render().el);
    }

});

tpl.loadTemplates(['login','header', 'wine-details', 'wine-list-item','error'], function() {
    app = new AppRouter();
    Backbone.history.start();
});

$.ajaxSetup({
    statusCode: {
        401: function(){
            // Redirec the to the login page.
            window.location.replace('/#login');
         
        },
        403: function() {
            // 403 -- Access denied
            window.location.replace('/#denied');
        }
    }
});

