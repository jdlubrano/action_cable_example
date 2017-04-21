class User < ApplicationRecord
  def appear
    update!(active: true)
  end

  def away
    update!(active: false)
  end
end
