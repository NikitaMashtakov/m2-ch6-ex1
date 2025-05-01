import { Button } from 'components/Button/Button';
import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getTodoById } from 'utils/api';
import { MdOutlineEdit, MdOutlineDelete, MdDone, MdClose } from 'react-icons/md';
import { NotFoundPage } from 'pages/NotFoundPage/NotFoundPage';
import styles from './TodoPage.module.css';
import { editTodo } from 'utils/api';
import { deleteTodo } from 'utils/api';

export const TodoPage = () => {
  const [todo, setTodo] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState('');
  const editInputRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEditing) {
      editInputRef.current.focus();
      editInputRef.current.selectionStart = editInputRef.current.value.length;
    }
  }, [isEditing]);
  useEffect(() => {
    getTodoById(id).then((data) => {
      setTodo(data);
      setText(data.title);
    });
  }, [id]);

  const onStartEditTodo = () => {
    setIsEditing(true);
    setText(todo.title);
  };

  const onCancelEdit = () => {
    setIsEditing(false);
  };

  const onConfirmEditTodo = (id, text) => {
    editTodo(id, text).then((data) => {
      setTodo(data);
      setText(data.title);
    });
    setIsEditing(false);
  };
  const onDeleteTodo = (id) => {
    deleteTodo(id);
    navigate(-1);
  };

  if (!todo.id) {
    return <NotFoundPage />;
  }
  return (
    <div className={styles.container}>
      <Button onClick={() => navigate(-1)} style={{ border: '1px solid #ccc' }}>
        Назад
      </Button>
      <div className={styles.todo}>
        {isEditing ? (
          <textarea
            ref={editInputRef}
            className={styles.editTodo}
            type="text"
            name="edit-todo"
            value={text}
            onChange={({ target }) => {
              setText(target.value);
            }}
            onBlur={() => editInputRef.current.focus()}
          />
        ) : (
          <p className={styles.title}>{text}</p>
        )}
      </div>
      <div className={styles.buttons}>
        {isEditing ? (
          <Button title={'Подтвердить'} onClick={() => onConfirmEditTodo(id, text)}>
            <MdDone size="20" fill="#00c700" />
          </Button>
        ) : (
          <Button title={'Редактировать'} onClick={onStartEditTodo}>
            <MdOutlineEdit size="20" fill="#6a75fd" />
          </Button>
        )}

        {isEditing ? (
          <Button title={'Отмена'} onClick={onCancelEdit}>
            <MdClose size="20" fill="#ff4e4e" />
          </Button>
        ) : (
          <Button title={'Удалить'} onClick={() => onDeleteTodo(id)}>
            <MdOutlineDelete size="20" fill="#ff4e4e" />
          </Button>
        )}
      </div>
    </div>
  );
};

TodoPage.propTypes = { id: PropTypes.number };
