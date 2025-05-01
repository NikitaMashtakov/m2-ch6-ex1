import { Todo } from 'components/Todo/Todo';
import PropTypes from 'prop-types';
import styles from './TodoList.module.css';
export const TodoList = ({ todos, debouncedSearch, onCompleteTodo }) => {
  const todosToShow = todos.filter(({ title }) =>
    title.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );
  return (
    <div className={styles.container}>
      {todosToShow.length !== 0 ? (
        todosToShow.map(({ id, title, completed }) => (
          <Todo
            key={id}
            id={id}
            title={title}
            completed={completed}
            onCompleteTodo={onCompleteTodo}
            debouncedSearch={debouncedSearch}
          />
        ))
      ) : (
        <h2 className={styles.noTodos}>Задач нет</h2>
      )}
    </div>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  debouncedSearch: PropTypes.string,
  onCompleteTodo: PropTypes.func,
};
