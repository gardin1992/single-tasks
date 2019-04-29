import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import TaskForm from './components/TaskForm'
import TaskTable from './components/TaskTable'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      item: {}
    };
  }

  handleOnSubmit = task => {

    const {items, lastId} = this.state;

    if (!task.id) {

      items.push(task);

      const index = items.length - 1;
      items[index].id = index;

    } else {

      items[task.id] = task;
    }

    this.setState({
      items: items,
      item: {
        'task-name': '',
        'task-description': ''
      }
    });
  }

  handleSetItem = item => evt => {

    this.setState({item: item});
  }

  handleRemoveItem = item => evt => {

    const {items} = this.state;
    delete items[item.id];

    this.setState({items: items});
  };

  render() {

    const {items, item} = this.state;

    return (<div className="App">
      <div className="container">

      <div className="row ">
      <h1>List Tasks</h1>
      </div>

      <div className="row justify-content-md-center">
        <TaskForm className="col-12" handleOnSubmit={this.handleOnSubmit} item={item}/>
      </div>

      <div className="col-12 App-tasks">
        <TaskTable 
          items={items}
          handleSetItem={this.handleSetItem}
          handleRemoveItem={this.handleRemoveItem}/>
      </div>

      </div>
      </div>
      )
  }
}

export default App;
