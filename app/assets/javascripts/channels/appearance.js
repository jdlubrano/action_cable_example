(function(App) {
  var nameSelector = "[name=username]";
  var awaySelector = "[data-behavior=appear-away]";
  var appearSelector = "[data-behavior=appear]";
  var userListSelector = '.user-list';

  var users = [];

  function initializeUserList() {
    users = [...document.querySelectorAll(userListSelector + ' li')]
      .map(function(user) {
        return {
          id: $(user).data('user-id'),
          active: true
        };
      });
  }

  function getName() {
    return $(nameSelector).val();
  }

  function findUserById(userId) {
    return users.filter(function(user) {
      return user.id === userId;
    })[0];
  }

  function addUserToList(user) {
    if (!user) {
      return;
    }

    if (findUserById(user.id)) {
      return;
    }

    $(userListSelector).append($('<li/>', {
      text: user.name,
      'data-user-id': user.id
    }));

    users.push(user);
  }

  function removeUserFromList(user) {
    var lis = $('[data-user-id="' + user.id + '"]').remove();

    users = users.filter(function(u) {
      return user.id !== u.id;
    });
  }

  function updateUserList(user) {
    console.log(user);
    user.active ? addUserToList(user) : removeUserFromList(user);
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

      initializeUserList();

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
      return this.perform('away');
    },
    received: function(data) {
      updateUserList(data.user);
    }
  });
}(this.App));
