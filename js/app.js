
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
  
})(jQuery);
