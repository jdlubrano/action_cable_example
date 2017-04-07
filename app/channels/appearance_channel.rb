# app/channels/appearance_channel.rb
class AppearanceChannel < ApplicationCable::Channel
  def subscribed
    stream_from('appearances')
  end

  def unsubscribed
    # Maybe read a cookie?
  end

  def appear(data)
    name = data['name']
    current_user = User.find_or_create_by(name: name)
    current_user.appear(name)
    ActionCable.server.broadcast('appearances',
                                 user: { name: current_user.name })
  end

  def away
    current_user.away
  end
end
