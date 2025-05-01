import PropTypes from 'prop-types';
import styles from './Todo.module.css';
import { Link } from 'react-router';

export const Todo = ({ id, title, completed, onCompleteTodo }) => {
  return (
    <div className={styles.container}>
      <div className={styles.todo}>
        <input
          className={`${completed ? styles.checked : ''}`}
          type="checkbox"
          id={id}
          checked={completed}
          onChange={() => onCompleteTodo(id, completed)}
        />

        <Link
          to={`/todos/${id}`}
          className={`${
            completed ? styles.checkedLabel + ' ' + styles.todoLabel : styles.todoLabel
          }`}
        >
          {title}
        </Link>
      </div>
    </div>
  );
};

Todo.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  completed: PropTypes.bool,
  onCompleteTodo: PropTypes.func,
};
