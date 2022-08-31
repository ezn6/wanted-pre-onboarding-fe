import React, { useEffect, useRef, useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import Todo from '../todo/todo';
import styles from './todos.module.css';

const Todos = memo(({ token, todoService }) => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [flag, setFlag] = useState(true);
  const inputRef = useRef();

  // 토큰 없다면 /로 리다이렉트
  useEffect(() => {
    if (!token.getToken()) {
      navigate('/');
    }
  });

  // 첫 렌더시에 todo 항목들 가져오기
  useEffect(() => {
    todoService
      .getTodos() //
      .then((data) => {
        // console.log(data);
        setTodos(data);
      });
  }, [todoService, flag]);

  // 투두 리스트 추가하기
  const onSubmit = async (e) => {
    e.preventDefault();
    if (inputRef.current.value === '') return;
    console.log(inputRef.current.value);

    await todoService.createTodo(inputRef.current.value);
    await todoService.getTodos().then((data) => setTodos((prev) => data));
    inputRef.current.value = '';
  };

  const onDelete = async (id) => {
    await todoService.deleteTodo(id);
    await todoService.getTodos().then((data) => setTodos((prev) => data));
  };

  const onUpdate = async (text, completed, id) => {
    await todoService.updateTodo(text, completed, id);
    await todoService.getTodos().then((data) => setTodos((prev) => data));
  };

  console.log('todos.jsx');
  return (
    <div className={styles.container}>
      <section className={styles.todos}>
        <form className={styles.form} onSubmit={onSubmit}>
          <input className={styles.forminput} ref={inputRef} type='text' />
          <button className={styles.btn}>추가</button>
        </form>
        <ul className={styles.ul}>
          {todos.map((item) => (
            <Todo
              key={item.id}
              content={item}
              todoService={todoService}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </ul>
      </section>
    </div>
  );
});

export default Todos;
