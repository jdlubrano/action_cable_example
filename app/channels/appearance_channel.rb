# app/channels/appearance_channel.rb
class AppearanceChannel < ApplicationCable::Channel
  def subscribed
    stream_from('appearances')
  end

  def unsubscribed
    away
  end

  def appear(data)
    load_user(data['name'])
    @current_user.appear
    ActionCable.server.broadcast('appearances', user: @current_user)
  end

  def away
    return unless @current_user

    @current_user.away
    ActionCable.server.broadcast('appearances', user: @current_user)
  end

  private

  def load_user(name)
    @current_user = User.find_or_create_by(name: name)
  end
end
