module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :client_ip

    def connect
      self.client_ip = request.remote_ip
    end
  end
end
