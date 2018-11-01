import React, { Component } from 'react'
import './App.css'

function getCurrentDate() {
  const date = new Date()

  return (
    date
      .getFullYear()
      .toString()
      .padStart(2, '0') +
    '-' +
    (date.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    date
      .getDate()
      .toString()
      .padStart(2, '0')
  )
}

class App extends Component {
  constructor(props) {
    super(props)

    const defaultTodos = []
    const defaultDays = [{ date: getCurrentDate(), tasks: [] }]

    try {
      this.state = {
        todos:
          JSON.parse(localStorage.getItem('nightshade')).todos || defaultTodos,
        days:
          JSON.parse(localStorage.getItem('nightshade')).days || defaultDays,
      }
    } catch (error) {
      this.state = { todos: defaultTodos, days: defaultDays }
    }
  }

  /* Todos */

  addTodo = () => {
    this.setState((prevState, props) => ({
      todos: [{ name: '' }, ...prevState.todos],
    }))
  }

  updateTodoName = (index, event) => {
    const todoName = event.target.value

    this.setState((prevState, props) => {
      return {
        todos: [
          ...prevState.todos.slice(0, index),
          { ...prevState.todos[index], name: todoName },
          ...prevState.todos.slice(index + 1),
        ],
      }
    })
  }

  removeTodo = (index, event) => {
    this.setState((prevState, props) => ({
      todos: [
        ...prevState.todos.slice(0, index),
        ...prevState.todos.slice(index + 1),
      ],
    }))
  }

  /* Tasks time tracking */

  addDay = () => {
    const date = getCurrentDate()

    // Disallow adding duplicate days
    if (date === this.state.days[0].date) {
      window.alert('Day already exists')
      return
    }

    this.setState((prevState, props) => ({
      days: [
        {
          date,
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
              name: '',
              count: 0,
              notes: '',
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
    const taskName = event.target.value

    this.setState((prevState, props) => {
      return {
        days: [
          {
            ...prevState.days[0],
            tasks: [
              ...prevState.days[0].tasks.slice(0, index),
              { ...prevState.days[0].tasks[index], name: taskName },
              ...prevState.days[0].tasks.slice(index + 1),
            ],
          },
          ...prevState.days.slice(1),
        ],
      }
    })
  }

  updateTaskCount = (index, event) => {
    const taskCount =
      event.target.value === '' ? 0 : parseInt(event.target.value, 10)

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

  updateTaskNotes = (index, event) => {
    const taskNotes = event.target.value

    this.setState((prevState, props) => {
      return {
        days: [
          {
            ...prevState.days[0],
            tasks: [
              ...prevState.days[0].tasks.slice(0, index),
              {
                ...prevState.days[0].tasks[index],
                notes: taskNotes,
              },
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
      JSON.stringify({ todos: this.state.todos, days: this.state.days }),
    )
  }

  render() {
    return (
      <div>
        <header>
          <h1>Nightshade</h1>
        </header>

        <h2>To do</h2>
        <ul className="todos">
          <li>
            <button onClick={this.addTodo}>Add todo</button>
          </li>
          {this.state.todos.map((todo, todoIndex) => (
            <li key={todoIndex}>
              <input
                value={todo.name}
                onChange={this.updateTodoName.bind(this, todoIndex)}
              />
              <button
                title="Delete todo"
                onClick={this.removeTodo.bind(this, todoIndex)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        <h2>Pomodori</h2>
        <ul className="days">
          <li>
            <button onClick={this.addDay}>Add day</button>
          </li>
          {this.state.days.map((day, dayIndex) => (
            <li key={day.date}>
              {day.date}
              :&nbsp;
              {day.tasks.reduce((sum, task) => sum + task.count, 0)}
              <ul className="tasks">
                {!dayIndex ? (
                  <div>
                    <li>
                      <button onClick={this.addTask}>Add task</button>
                    </li>
                    {day.tasks.map((task, taskIndex) => (
                      <li key={taskIndex}>
                        <input
                          value={task.name}
                          onChange={this.updateTaskName.bind(this, taskIndex)}
                        />
                        :&nbsp;
                        <input
                          type="number"
                          min="0"
                          value={task.count}
                          onChange={this.updateTaskCount.bind(this, taskIndex)}
                        />
                        <button
                          title="Delete task"
                          onClick={this.removeTask.bind(this, taskIndex)}
                        >
                          ✕
                        </button>
                        <small>
                          <details open={task.notes}>
                            <summary>
                              {task.notes ? 'Notes:' : 'Add notes:'}
                            </summary>
                            <input
                              value={task.notes}
                              onChange={this.updateTaskNotes.bind(
                                this,
                                taskIndex,
                              )}
                            />
                          </details>
                        </small>
                      </li>
                    ))}
                  </div>
                ) : (
                  <div>
                    {day.tasks.map((task, taskIndex) => (
                      <li key={taskIndex}>
                        {task.name}:&nbsp;{task.count}
                        {task.notes && (
                          <div>
                            <small>Notes: {task.notes}</small>
                          </div>
                        )}
                      </li>
                    ))}
                  </div>
                )}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default App
