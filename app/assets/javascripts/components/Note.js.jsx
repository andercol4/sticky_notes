var Note = React.createClass({
	getInitialState: function(){
		return { notes: this.props.notes };
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
								<div className='input-field'>
									<input  type='number' onChange={this.addNotesPriority}></input>
									<label>Priority</label>
								</div>
								<button type='submit' className='btn'>stick a sticky</button>
							</form>
						 </div>)
		}
	},



	render: function(){
		return(<div>
							<button className='btn' onClick={this.openForm}>New Sticky</button>
							{this.addNote()}
					</div>)

	}
});
