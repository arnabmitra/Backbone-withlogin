window.ErrorView = Backbone.View.extend({

	
	
    initialize: function () {
    	this.template = _.template(tpl.get('error'));
    
    },

    render: function () {
        this.el.html(this.template());
        return this;
    },

    events: {
        'click .retry':'retry'
    },

    retry: function () {
        Backbone.history.loadUrl(Backbone.history.fragment);
    }

});