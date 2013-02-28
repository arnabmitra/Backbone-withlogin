window.User = Backbone.Model.extend({
	urlRoot: "api/users",
	defaults: {
		"userName": null,
	    "password":  null
	  }
});