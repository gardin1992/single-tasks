import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import TaskForm from './components/TaskForm'
import TaskTable from './components/TaskTable'


class App extends Component {

  HOST = 'http://localhost:5000'
  URL = this.HOST + '/tasks'

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      item: {
        'index': '',
        '_id': '',
        'name': '',
        'description': ''
      }
    };
  }

  getHeader = (method = '', data = {}) => {

    const body = JSON.stringify(data);

    return {
      method: method,
      body: body,
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }
  }

  resetItem() {

    this.setState({
      item: {
        'index': '',
        '_id': '',
        'name': '',
        'description': ''
      }
    })
  }

  handleRequestPost = (task) => {

    delete task._id;
    delete task.index;

    const header = this.getHeader('POST', task);

    return fetch(`${this.URL}`, header)
      .then(res => res.json())
      .then(json => {

        const {items} = this.state;
        items.push(json);

        this.resetItem();
        this.setState({items: items});
      })
      .catch(err => {

        console.log(err)
      })
  }

  handleRequestPut = (id, task) => {

    const header = this.getHeader('PUT', task);
    const index = task.index;

    delete task.index;

    return fetch(`${this.URL}/${id}`, header)
      .then(res => res.json())
      .then(json => {

        const {items} = this.state;

        items[index] = json;

        this.setState({items: items});
        this.resetItem();
      })
      .catch(err => {

        console.log(err)
      })
  }

  handleOnSubmit = task => {

    if (task._id)
      this.handleRequestPut(task._id, task);
    else
      this.handleRequestPost(task);
  }

  handleSetItem = (item, index) => evt => {

    this.setState({item: {
      index: index,
      '_id': item._id,
      'name': item.name,
      'description': item.description
    }});
  }

  handleRemoveItem = (item, index) => evt => {

    const header = this.getHeader('DELETE');
    
    return fetch(`${this.URL}/${item._id}`, header)
      .then(res => res.json())
      .then(json => {

        let {items} = this.state;
        items.splice(index, 1);

        this.setState({items: items});
      })
  }

  handleRequestAll = () => {

    return fetch(this.URL)
      .then(res => res.json())
      .then(json => {

        this.setState({
          items: json
        })
      })
      .catch(err => {

        console.log(err);
      })
  }

  componentDidMount() {

    this.handleRequestAll();
  }

  componentWillUnmont() {

    this.handleRequestAll();
  }

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
