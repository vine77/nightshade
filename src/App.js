import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    try {
      this.state = { tasks: JSON.parse(localStorage.getItem('tasks')) || [] }
    } catch (error) {
      this.state = { tasks: [] }
    }

    this.updateTaskName = this.updateTaskName.bind(this)
    this.addTask = this.addTask.bind(this)
  }

  addTask() {
    this.setState({ tasks: [...this.state.tasks, { title: '' }] })
  }

  updateTaskName(index, event) {
    this.setState({
      tasks: [
        ...this.state.tasks.slice(0, index),
        { ...this.state.tasks[index], title: event.target.value },
        ...this.state.tasks.slice(index + 1),
      ],
    })
  }

  componentDidUpdate() {
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks))
  }

  render() {
    return (
      <div>
        <header>
          <h1>Nightshade</h1>
        </header>
        <ul className="tasks">
          {this.state.tasks.map((task, index) => (
            <li key={index}>
              <input
                value={task.title}
                onChange={this.updateTaskName.bind(this, index)}
              />
            </li>
          ))}
          <li>
            <button onClick={this.addTask}>Add task</button>
          </li>
        </ul>
      </div>
    )
  }
}

export default App
