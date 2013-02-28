window.Cookie = Backbone.Model.extend({
	initialize: function() {
		 $.cookie(this.id, this.data);
        //this.fetch();
    },

    fetch: function() {
        this.set($.cookie(this.id,this.data));
    },

    save: function(attributes) {
        this.set(attributes);
        $.cookie(this.id, JSON.stringify(this.toJSON()));
    },

    destroy: function(options) {
        $.removeCookie(this.id);
    },

    isEmpty: function() {
        return (_.size(this.attributes) > 1); // ignore 'id'
    }
	
});