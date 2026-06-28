import './App.scss';
import { Todo, TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import React, { useState } from 'react';

function getNewId(newTodo: Todo[]) {
  const maxId = Math.max(0, ...newTodo.map(mass => mass.id));

  return maxId + 1;
}

export function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const App = () => {
  const [userValue, setUserValue] = useState(0);
  const [userTitle, setUserTitle] = useState('');

  const [hasUserValueInput, setHasUserValueInput] = useState(false);
  const [hasUserTitleInput, setHasUserTitleInput] = useState(false);

  const [todosFrom, setTodosFrom] = useState(todosFromServer);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const titleTrimed = userTitle.trim();

    if (!userValue || !titleTrimed) {
      setHasUserValueInput(!userValue);
      setHasUserTitleInput(!titleTrimed);

      return;
    }

    const user = getUserById(userValue);

    if (!user) {
      return;
    }

    const { id } = user;

    const newTodo = {
      id: getNewId(todosFrom),
      title: titleTrimed,
      completed: false,
      userId: id,
      user: user,
    };

    if (userValue) {
      setTodosFrom(todo => [...todo, newTodo]);
    }

    setUserValue(0);
    setUserTitle('');
    setHasUserValueInput(false);
    setHasUserTitleInput(false);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title-input">Title:</label>
          <input
            id="title-input"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={userTitle}
            onChange={event => {
              setUserTitle(event.target.value);
              setHasUserTitleInput(false);
            }}
          />
          {hasUserTitleInput && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user-input">User:</label>
          <select
            id="user-input"
            data-cy="userSelect"
            onChange={e => {
              setUserValue(+e.target.value);
              setHasUserValueInput(false);
            }}
            value={userValue}
          >
            <option value={0} disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>

          {hasUserValueInput && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosFrom} />
    </div>
  );
};
