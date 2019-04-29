import React, {Component} from 'react';


export default class TaskForm extends Component {

	constructor(props) {
		super(props);

		this.state = {
			'description': '',
			'name': ''
		}
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

    this.setState({
			'description': '',
			'name': ''
		})
  }

  handleChange = (event) => {

  	const target = event.target;
  	const name = target.name;
  	const obj = {};
  	obj[name] = target.value;

  	this.setState(obj)
  }

	render() {

		const {className, handleOnSubmit, item = {}} = this.props;

		let _id = item._id;
		let index = item.index;
		let description = this.state['description'] ? this.state['description'] : item['description'];
		let name = this.state['name'] ? this.state['name'] : item['name'];

		return (<div className={"TaskForm " + className}>
		  
		  <form className="form-horizontal" onSubmit={this.handleOnSubmit(handleOnSubmit)}>

		  	<input type="hidden" value={_id} name="_id" />
		  	<input type="hidden" value={index} name="index" />

		    <div className="form-group">
		      <label >Task name</label>
		      <input className="form-control" name="name" value={name} placeholder="Job" onChange={this.handleChange}/>
		    </div>

		    <div className="form-group">
		      <label>Task Description</label>
		      <textarea className="form-control" name="description" value={description} onChange={this.handleChange} />
		    </div>

		    <div className="form-group">
		      <button className="btn btn-primary" type="submit">Add</button>
		    </div>
		  </form>
		  </div>)
	}
}