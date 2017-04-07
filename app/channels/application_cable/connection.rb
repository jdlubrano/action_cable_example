module ApplicationCable
  class Connection < ActionCable::Connection::Base
    attr_accessor :current_user

    identified_by :client_ip

    def connect
      self.client_ip = request.remote_ip
    end
  end
end
