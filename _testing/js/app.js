
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
 
  var bookData = {
    title:"New title",
    author:"Another Guy",
    releaseDate:"Long ago",
    keywords:"Javasciprt pogrom"
  }
   
  var book = new Book({
    title:"New title",
    author:"Another Guy",
    releaseDate:"Long ago",
    keywords:"Javasciprt pogrom"
  });
  
  var bookView = new BookView({
    model: new Book( bookData )
  })
    
  $("#books").append(bookView.render().el);
  
})(jQuery);
