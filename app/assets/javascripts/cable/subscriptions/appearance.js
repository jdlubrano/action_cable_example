(function(App) {
  var buttonSelector = "[data-behavior~=appear-away]";

  App.cable.subscriptions.create('AppearanceChannel', {
    connected: function() {
      this.install();
      return this.appear();
    },
    disconnected: function() {
      return this.uninstall();
    },
    rejected: function() {
      return this.uninstall();
    },
    appear: function() {
      return this.perform("appear", {
        appearing_on: 'HAI'
      });
    },
    away: function() {
      return this.perform('away');
    },
    install: function() {
      var self = this;

      $(document).on("turbolinks:load.appearance", function() {
        console.log('tb:load');
        return self.appear();
      });

      $(document).on("click.appearance", buttonSelector, function() {
        console.log('c.app');
        self.away();
        return false;
      });

      return $(buttonSelector).show();
    },
    uninstall: function() {
      $(document).off('.appearance');
      return $(buttonSelector).hide();
    }
  });
}(this.App));
