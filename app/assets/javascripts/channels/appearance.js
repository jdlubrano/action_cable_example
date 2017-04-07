(function(App) {
  var nameSelector = "[name=username]";
  var awaySelector = "[data-behavior=appear-away]";
  var appearSelector = "[data-behavior=appear]";

  function getName() {
    return $(nameSelector).val();
  }

  function addUserToList(user) {
    if (!user) {
      return;
    }

    $('.user-list').append($('<li/>', {
      text: user.name
    }));
  }

  App.cable.subscriptions.create('AppearanceChannel', {
    connected: function() {
      this.install();
    },
    disconnected: function() {
      return this.uninstall();
    },
    rejected: function() {
      return this.uninstall();
    },
    appear: function() {
      if (getName()) {
        return this.perform("appear", { name: getName() });
      }
    },
    away: function() {
      return this.perform('away');
    },
    install: function() {
      var self = this;

      $(document).on("turbolinks:load.appearance", function() {
        console.log('tb:load');
      });

      $(document).on("click.appearance", appearSelector, function() {
        self.appear();
        return false;
      });

      $(document).on("click.appearance", awaySelector, function() {
        self.away();
        return false;
      });
    },
    uninstall: function() {
      $(document).off('.appearance');
    },
    received: function(data) {
      addUserToList(data.user);
    }
  });
}(this.App));
