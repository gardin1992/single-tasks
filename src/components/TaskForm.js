import React, {Component} from 'react';


export default class TaskForm extends Component {

	constructor(props) {
		super(props);
	}

	handleOnSubmit = callback => evt => {

    evt.preventDefault();

    const form = evt.target;
    const formData = new FormData(form);
    const obj = {};

    for (var key of formData.keys()) {

      obj[key] = formData.get(key);
    }

    callback(obj);

    form.reset();
  }

	render() {

		const {className, handleOnSubmit, item = {}} = this.props;

		return (<div className={"TaskForm " + className}>
		  
		  <form className="form-horizontal" onSubmit={this.handleOnSubmit(handleOnSubmit)}>

		  	<input type="hidden" defaultValue={item.id} name="id" />
		    <div className="form-group">
		      <label >Task name</label>
		      <input className="form-control" type="text" name="task-name" defaultValue={item['task-name']} placeholder="Job" />
		    </div>

		    <div className="form-group">
		      <label>Task Description</label>
		      <textarea className="form-control" name="task-description" defaultValue={item['task-description']}/>
		    </div>

		    <div className="form-group">
		      <button className="btn btn-primary" type="submit">Add</button>
		    </div>
		  </form>
		  </div>)
	}
}