import React, { useEffect, useRef, useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import Todo from '../todo/todo';

const Todos = memo(({ token, todoService }) => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
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
  }, [todoService]);

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

  console.log('todos.jsx');
  return (
    <>
      <form onSubmit={onSubmit}>
        <input ref={inputRef} type='text' />
        <button>추가</button>
      </form>
      <ul>
        {todos.map((item) => (
          <Todo
            key={item.id}
            content={item}
            todoService={todoService}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </>
  );
});

export default Todos;
