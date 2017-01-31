module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      User.new(cookies[:name])
    end
  end

  class User
    def initialize(name)
      @name = name
    end

    attr_reader :name

    def appear(on: nil)
      puts "#{@name} appearing on #{on}"
    end

    def away
      puts "#{@name} away"
    end

    def disappear
      puts "#{@name} disappear"
    end
  end
end
