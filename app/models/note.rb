class Note < ActiveRecord::Base
  def self.priority
    Note.order(:priority)
  end

  def new_priority
    self.priority = Note.all.length 
  end
end
