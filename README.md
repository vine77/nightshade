# Nightshade

Nightshade is named after the family of plants that includes the tomato, or "pomodoro" in Italian, because it is a task tracking app that works well with the Pomodoro Technique time management method. For each day, it allows the user to log the number of pomodoros (uninterrupted 25-minute work intervals) completed. This web application currently saves these locally to the user's browser with the Web Storage API.

![nightshade](https://user-images.githubusercontent.com/175123/47594830-fe6d4900-d931-11e8-802e-6093d7d5a4dd.png)

## Getting started

- Clone this repo

    ```sh
    git clone git@github.com:vine77/nightshade.git
    cd nightshade
    ```

- Install dependencies

    ```sh
    npm install
    ```

- Start the server

    ```sh
    npm start
    ```

- Navigate to http://localhost:3000

## Configuration

Run `echo "PORT=3333" > .env` to change the default port used. (Note: localStorage is separate for each port, so changing this will result in a fresh data set.)