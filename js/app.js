
(function ($) {

  var Book = Backbone.Model.extend({
    defaults:{
      coverImage:"img/placeholder.png",
      title:"Some title",
      author:"Jone Doe",
      releaseDate:"2012",
      keywords:"Javascript programming"
    }
  })
  
  var BookView = Backbone.View.extend({
    tagName:"div",
    className:"bookContainer",
    template:$("#bookTemplate").html(),
    
    render:function() {
      var tmpl = _.template(this.template);
      this.$el.html(tmpl(this.model.toJSON()));
      return this;
    }
  })
  
  var abook = new Book({
    title:"New title",
    author:"Another Guy",
    releaseDate:"Long ago",
    keywords:"Javasciprt programme"
  });
  
  var abookView = new BookView({
    model: abook
  })
  
  $("#books").append(abookView.render().el);
  
})(jQuery);
