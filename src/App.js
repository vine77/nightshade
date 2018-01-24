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
    const date = new Date().toJSON().slice(0, 10)

    // Disallow adding duplicate days
    if (date === this.state.days[0].date) {
      window.alert('Day already exists')
      return
    }

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

  removeTask = (index, event) => {
    this.setState((prevState, props) => ({
      days: [
        {
          ...prevState.days[0],
          tasks: [
            ...prevState.days[0].tasks.slice(0, index),
            ...prevState.days[0].tasks.slice(index + 1),
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

  updateTaskCount = (index, event) => {
    const taskCount = event.target.value

    this.setState((prevState, props) => {
      return {
        days: [
          {
            ...prevState.days[0],
            tasks: [
              ...prevState.days[0].tasks.slice(0, index),
              { ...prevState.days[0].tasks[index], count: taskCount },
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
          {this.state.days.map((day, dayIndex) => (
            <li key={day.date}>
              {day.date}
              <ul className="tasks">
                {!dayIndex && (
                  <li>
                    <button onClick={this.addTask}>Add task</button>
                  </li>
                )}
                {day.tasks.map((task, taskIndex) => (
                  <li key={taskIndex}>
                    {dayIndex ? (
                      task.title
                    ) : (
                      <input
                        value={task.title}
                        onChange={this.updateTaskName.bind(this, taskIndex)}
                      />
                    )}
                    :&nbsp;
                    {dayIndex ? (
                      task.count
                    ) : (
                      <input
                        type="number"
                        value={task.count}
                        onChange={this.updateTaskCount.bind(this, taskIndex)}
                      />
                    )}
                    {!dayIndex && (
                      <button onClick={this.removeTask.bind(this, taskIndex)}>
                        ✕
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default App
