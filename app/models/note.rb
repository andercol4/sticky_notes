class Note < ActiveRecord::Base
  def self.priority
    Note.order(:priority)
  end
end
