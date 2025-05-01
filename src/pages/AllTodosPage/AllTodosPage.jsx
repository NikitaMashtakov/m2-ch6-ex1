import { TodoList } from 'components/TodoList/TodoList';
import { NewTodoInput } from 'components/NewTodoInput/NewTodoInput';
import { Toolbar } from 'components/Toolbar/Toolbar';
import { useState, useEffect } from 'react';
import useDebouncedValue from 'hooks/useDebouncedValue';
import { getTodos, completeTodo, addTodo } from 'utils/api';

const AllTodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedSort, setSelectedSort] = useState('_sort=id&_order=desc');
  const debouncedSearch = useDebouncedValue(search, 250);

  useEffect(() => {
    getTodos(selectedSort).then((loadedTodos) => setTodos(loadedTodos));
  }, [selectedSort]);

  const searchHandler = (value) => {
    setSearch(value);
  };
  const selectorHandler = (value) => {
    setSelectedSort(value);
  };
  const onAddTodo = (text) => {
    addTodo(text)
      .then((newTodo) => {
        setTodos((prev) => [newTodo, ...prev]);
      })
      .catch((err) => console.log(err));
  };
  const onCompleteTodo = (id, completed) => {
    completeTodo(id, completed)
      .then((updatedTodo) =>
        setTodos((prev) => prev.map((todo) => (todo.id === id ? updatedTodo : todo))),
      )
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Toolbar
        search={search}
        searchHandler={searchHandler}
        selectorHandler={selectorHandler}
      />

      <NewTodoInput
        placeholder="Новая задача..."
        buttonName="Добавить"
        inputHandler={onAddTodo}
      />

      <TodoList
        todos={todos}
        onCompleteTodo={onCompleteTodo}
        debouncedSearch={debouncedSearch}
      />
    </>
  );
};

export default AllTodoPage;
