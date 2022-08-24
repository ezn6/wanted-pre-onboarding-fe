import React, { memo, useEffect, useState } from 'react';
import styles from './todo.module.css';

const Todo = memo(({ content, todoService }) => {
  const [update, setUpate] = useState(false);
  const [completed, setComopleted] = useState(content.isCompleted);
  const [text, setText] = useState(content.todo);

  const onClick = () => {
    setUpate((click) => !click);
  };

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onUpdate = () => {
    todoService.updateTodo(text, completed, content.id);
  };

  const onChecked = () => {
    setComopleted((click) => !click);
  };

  useEffect(() => {
    todoService.updateTodo(text, completed, content.id);
  }, [completed]);

  return (
    <li>
      <input type='checkbox' checked={completed} onChange={onChecked} />
      <span>{content.todo}</span>
      {update && (
        <div className={styles.section}>
          <form onSubmit={onUpdate}>
            <input onChange={onChange} type='text' value={text} />
            <button onClick={onUpdate}>제출</button>
          </form>
          <button onClick={onClick}>취소</button>
        </div>
      )}
      {!update && <button onClick={onClick}>수정</button>}
      {!update && <button>삭제</button>}
    </li>
  );
});

export default Todo;
