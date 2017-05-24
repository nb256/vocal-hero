
$(function(){

  window.HighScore = Backbone.Model.extend({
	  idAttribute: "_id",

    defaults: function() {
      return {
        done:  false
      };
    }

  });


  window.HighScores = Backbone.Collection.extend({

    model: HighScore,

	  url: '/api/highscores'
  });


  window.HighScores = new HighScores();


  window.HighScoreView = Backbone.View.extend({

  //   //... is a list tag.
  //   tagName:  "li",
  //
  //   // Cache the template function for a single item.
  //   template: _.template($('#highscore-template').html()),
  //
  //
  //   // Re-render the contents of the todo item.
  //   render: function() {
  //     $(this.el).html(this.template(this.model.toJSON()));
  //     this.setText();
  //     return this;
  //   },
  //
  //   // // To avoid XSS (not that it would be harmful in this particular app),
  //   // // we use `jQuery.text` to set the contents of the todo item.
  //   // setText: function() {
  //   //   var text = this.model.get('text');
  //   //   this.$('.todo-text').text(text);
  //   //   this.input = this.$('.todo-input');
  //   //   this.input.bind('blur', _.bind(this.close, this)).val(text);
  //   // },
  //   //
  //   // // Remove this view from the DOM.
  //   // remove: function() {
  //   //   $(this.el).remove();
  //   // },
  //   //
  //   // // Remove the item, destroy the model.
  //   // clear: function() {
  //   //   this.model.destroy();
  //   // }
  //
  // });
  //
  // // The Application
  // // ---------------
  //
  // // Our overall **AppView** is the top-level piece of UI.
  // window.AppView = Backbone.View.extend({
  //
  //   // // Instead of generating a new element, bind to the existing skeleton of
  //   // // the App already present in the HTML.
  //   // el: $("#todoapp"),
  //   //
  //   // // Our template for the line of statistics at the bottom of the app.
  //   // statsTemplate: _.template($('#stats-template').html()),
  //   //
  //   // // Delegated events for creating new items, and clearing completed ones.
  //   // events: {
  //   //   "keypress #new-todo":  "createOnEnter",
  //   //   "keyup #new-todo":     "showTooltip",
  //   //   "click .todo-clear a": "clearCompleted"
  //   // },
  //   //
  //   // // At initialization we bind to the relevant events on the `Todos`
  //   // // collection, when items are added or changed. Kick things off by
  //   // // loading any preexisting todos that might be saved in *localStorage*.
  //   // initialize: function() {
  //   //   this.input    = this.$("#new-todo");
  //   //
  //   //   Todos.bind('add',   this.addOne, this);
  //   //   Todos.bind('reset', this.addAll, this);
  //   //   Todos.bind('all',   this.render, this);
  //   //
  //   //   Todos.fetch();
  //   // },
  //   //
  //   // // Re-rendering the App just means refreshing the statistics -- the rest
  //   // // of the app doesn't change.
  //   // render: function() {
  //   //   this.$('#todo-stats').html(this.statsTemplate({
  //   //     total:      Todos.length,
  //   //     done:       Todos.done().length,
  //   //     remaining:  Todos.remaining().length
  //   //   }));
  //   // },
  //   //
  //   // // Add a single todo item to the list by creating a view for it, and
  //   // // appending its element to the `<ul>`.
  //   // addOne: function(todo) {
  //   //   var view = new TodoView({model: todo});
  //   //   this.$("#todo-list").append(view.render().el);
  //   // },
  //   //
  //   // // Add all items in the **Todos** collection at once.
  //   // addAll: function() {
  //   //   Todos.each(this.addOne);
  //   // },
  //   //
  //   // // If you hit return in the main input field, and there is text to save,
  //   // // create new **Todo** model persisting it to *localStorage*.
  //   // createOnEnter: function(e) {
  //   //   var text = this.input.val();
  //   //   if (!text || e.keyCode != 13) return;
  //   //   Todos.create({text: text});
  //   //   this.input.val('');
  //   // },
  //   //
  //   // // Clear all done todo items, destroying their models.
  //   // clearCompleted: function() {
  //   //   _.each(Todos.done(), function(todo){ todo.destroy(); });
  //   //   return false;
  //   // },
  //   //
  //   // // Lazily show the tooltip that tells you to press `enter` to save
  //   // // a new todo item, after one second.
  //   // showTooltip: function(e) {
  //   //   var tooltip = this.$(".ui-tooltip-top");
  //   //   var val = this.input.val();
  //   //   tooltip.fadeOut();
  //   //   if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
  //   //   if (val === '' || val == this.input.attr('placeholder')) return;
  //   //   var show = function(){ tooltip.show().fadeIn(); };
  //   //   this.tooltipTimeout = _.delay(show, 1000);
  //   // }

  });

  // Finally, we kick things off by creating the **App**.
  // window.App = new AppView();

});
