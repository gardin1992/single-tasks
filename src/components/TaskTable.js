import React, { Component } from 'react';


export default class TaskTable extends Component {

	render() {

		const {items, handleSetItem, handleRemoveItem} = this.props;

		return (<table className="table">
	  <thead>
	  <tr>
	  <th>#</th>
	  <th>Name</th>
	  <th>Description</th>
	  <th/>
	  <th/>
	  </tr>
	  </thead>
	  <tbody>

	  {items.map((item, index) => (<tr key={index}>

	    <td>{item.id}</td>
	    <td>{item['task-name']}</td>
	    <td>{item['task-description']}</td>
	    <td style={{cursor: 'pointer'}} onClick={handleSetItem(item)}><i className="fa fa-edit"></i></td>
	    <td style={{cursor: 'pointer'}} onClick={handleRemoveItem(item)}><i className="fa fa-times"></i></td>
	  </tr>))}

	  </tbody>
	  </table>)
	}
}