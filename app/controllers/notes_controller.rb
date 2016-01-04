class NotesController < ApplicationController
  def index
  	@notes = Note.all
  end

  def create
    note = Note.create(note_params)
    render json: note
  end

  private
    def note_params
      params.require(:note).permit(:name, :description, :priority)
    end

end
