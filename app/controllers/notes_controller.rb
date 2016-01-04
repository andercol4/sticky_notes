class NotesController < ApplicationController
  def index
  	@notes = Note.priority
  end

  def create
    note = Note.create(note_params)
    render json: note
  end
  def destroy
  		note = Note.find(params[:id])
  		note.destroy
  		notes = Note.priority
  		render json: notes

  end

  private
    def note_params
      params.require(:note).permit(:name, :description, :priority)
    end

end
