class Idea < ActiveRecord::Base

  enum quality: [:swill, :plausible, :genius]
end
