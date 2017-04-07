class User < ApplicationRecord
  def appear(name)
    update!(name: name, active: true) unless active?
  end

  def away
    update!(active: false) if active?
  end
end
