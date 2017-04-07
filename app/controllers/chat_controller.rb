class ChatController < ApplicationController
  def index
    @users = User.all
  end
end
