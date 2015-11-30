class Idea < ActiveRecord::Base
  validates :title, :body, presence: true
  enum quality: [:swill, :plausible, :genius]

  def upgrade
    if self.swill?
      self.quality = 1
    else
      self.quality = 2
    end
  end

  def downgrade
    if self.genius?
      self.quality = 1
    else
      self.quality = 0
    end
  end
end
