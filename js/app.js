
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
  
  var book = new Book({
    title:"New title",
    author:"Another Guy",
    releaseDate:"Long ago",
    keywords:"Javasciprt pogrom"
  });
  
  var bookView = new BookView({
    model: book
  })
  
  var Library = Backbone.Collection.extend({
    model:Book
  })
  
  var LibraryView = Backbone.View.extend({
    el:$("#books"),
    
    initialize:function() {
      this.collection = new Library(books);
      this.render();
    },
    
    render: function(){
      var self = this;
      _.each(this.collection.models, function(itm) {
        self.renderBook(item);
      }, this);
    },
    
    renderBook:function(item) {
      var bookView = new BookView({
        model:item
      });
      this.$el.append(bookView.render().el);
    }
    
  })
  
  $("#books").append(bookView.render().el);
  
})(jQuery);
