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
	submitNote: function(){

	},
	addNotesName: function(){

	},
	addNotesDescription: function(){

	}, 
	addNotesPriority: function(){

	},
	addNote:function(){
		
		if (this.state.openForm){

			return(<div>
							<form onSubmit={this.submitNote}>
								<div className='input-field'>
									<input autofocus='true' type='text'  onChange={this.addNotesName}></input>
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
