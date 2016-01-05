var Note = React.createClass({
	getInitialState: function(){
		return { notes: this.props.notes, noteName: null, noteDescription: null, notePriority: null };
	},
	getDefaultState: function(){
		return { notes: []};
	},
	openForm: function(){
		this.setState({openForm: !this.state.openForm});
	},
	submitNote: function(e){
    e.preventDefault();
    var self = this;
    $.ajax({
      url: '/notes',
      type: 'POST',
      data: {note: {name: this.state.noteName, description: this.state.noteDescription, priority: this.state.notePriority}},
      success: function(data) {
        var notes = self.state.notes
        notes.push(data)
        notes = notes.sort(function(a,b){return a.priority - b.priority})
        self.setState({notes: notes, openForm: false, noteName: null, noteDescription: null, notePriority: null})
      }
    });
	},
	addNotesName: function(e){
    this.setState({noteName: e.currentTarget.value})
	},
	addNotesDescription: function(e){
    this.setState({noteDescription: e.currentTarget.value})
	},
	addNotesPriority: function(e){
    this.setState({notePriority: e.currentTarget.value})
	},
	addNote:function(){

		if (this.state.openForm){

			return(<div>
							<form onSubmit={this.submitNote}>
								<div className='input-field'>
									<input autofocus='true' type='text' onChange={this.addNotesName}></input>
									<label>Name</label>
								</div>
								<div className='input-field'>
									<input  type='text' onChange={this.addNotesDescription}></input>
									<label>Description</label>
								</div>
								<button type='submit' className='btn'>stick a sticky</button>
							</form>
						 </div>)
		  } else if(  this.state.noteName != null || this.state.noteDescription != null || this.state.notePriority != null) {
			this.setState({ noteName: null, noteDescription: null, notePriority: null})
    }
	},
	deleteNote: function(id){
		var self = this;
	  $.ajax({
	  	url: '/notes/'+ id,
	  	type: 'DELETE',
	  	success: function(data){
	  		self.setState({notes: data})
	  	}
	  })
	},
  upPriority: function(id){
		var self = this;
    var note = this.props.notes.find(function(e,i,a){ if(e.id ===id){return e}})
    var newPriority = note.priority -= 1
	  $.ajax({
	  	url: '/notes/'+ id,
	  	type: 'PUT',
      data: {note: {priority: newPriority}},
	  	success: function(data){
        var notes = self.state.notes
        notes = notes.sort(function(a,b){return a.priority - b.priority})
        self.setState({notes: notes})
	  	}
	  })
	},
  downPriority: function(id){
		var self = this;
    var note = this.props.notes.find(function(e,i,a){ if(e.id ===id){return e}})
    var newPriority = note.priority += 1
	  $.ajax({
	  	url: '/notes/'+ id,
	  	type: 'PUT',
      data: {note: {priority: newPriority}},
	  	success: function(data){
        var notes = self.state.notes
        notes = notes.sort(function(a,b){return a.priority - b.priority})
        self.setState({notes: notes})
	  	}
	  })
	},
	drawNotes: function(){
		var notes =[];
		var self = this;
		this.state.notes.forEach(function(note){

			notes.push(
						        <div className="col m3">
						          <div className="card small yellow lighten-3">
						            <div className="card-content black-text">
						              <span className="card-title">{note.name}</span>
						              <p>{note.description}</p>
						              <p>{note.priority}</p>

						            </div>
						            <div className="card-action">
           								<button className='btn' onClick={ () => self.deleteNote(note.id)}>Delete</button>
                          <button className='btn' onClick={ () => self.upPriority(note.id)}>&#9757;</button>
                          <button className='btn' onClick={ () => self.downPriority(note.id)}>&#9759;</button>
            					  </div>

						          </div>
						        </div>


									)
		})

		return notes;
	},




	render: function(){
		return(<div>
							<button className='btn' onClick={this.openForm}>New Sticky</button>
								{this.addNote()}
							<div className="row">
								{this.drawNotes()}
							</div>
					</div>)

	}
});
