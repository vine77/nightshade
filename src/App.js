import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    try {
      this.state = {
        days: JSON.parse(localStorage.getItem('nightshade')).days,
      }
    } catch (error) {
      this.state = {
        days: [
          {
            date: new Date().toJSON().slice(0, 10),
            tasks: [],
          },
        ],
      }
    }
  }

  addDay = () => {
    this.setState((prevState, props) => ({
      days: [
        {
          date: new Date().toJSON().slice(0, 10),
          tasks: [],
        },
        ...prevState.days,
      ],
    }))
  }

  addTask = () => {
    this.setState((prevState, props) => ({
      days: [
        {
          ...prevState.days[0],
          tasks: [
            {
              title: '',
              count: 0,
            },
            ...prevState.days[0].tasks,
          ],
        },
        ...prevState.days.slice(1),
      ],
    }))
  }

  updateTaskName = (index, event) => {
    const taskTitle = event.target.value

    this.setState((prevState, props) => {
      return {
        days: [
          {
            ...prevState.days[0],
            tasks: [
              ...prevState.days[0].tasks.slice(0, index),
              { ...prevState.days[0].tasks[index], title: taskTitle },
              ...prevState.days[0].tasks.slice(index + 1),
            ],
          },
          ...prevState.days.slice(1),
        ],
      }
    })
  }

  componentDidUpdate() {
    localStorage.setItem(
      'nightshade',
      JSON.stringify({ days: this.state.days }),
    )
  }

  render() {
    return (
      <div>
        <header>
          <h1>Nightshade</h1>
        </header>
        <ul className="days">
          <li>
            <button onClick={this.addDay}>Add day</button>
          </li>
          {this.state.days.map((day, index) => (
            <li key={day.date}>
              {day.date}
              <ul className="tasks">
                {day.tasks.map((task, index) => (
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
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default App
