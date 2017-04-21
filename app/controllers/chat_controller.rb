class ChatController < ApplicationController
  def index
    @users = User.where(active: true)
  end
end
