import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Todo from '../todo/todo';

const Todos = ({ token, todoService }) => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);

  // 토큰 없다면 /로 리다이렉트
  useEffect(() => {
    if (!token.getToken()) {
      navigate('/');
    }
  });

  // todo 항목들 가져오기
  useEffect(() => {
    todoService
      .getTodos() //
      .then((data) => {
        setTodos(data);
      });
  }, [todoService, todos]);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  // const onCompleted = (e) => {
  //   const check = e.target.checked;
  //   setCompleted(check);
  // };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type='text' />
        <button>추가</button>
      </form>
      <ul>
        {todos.map((item) => (
          <Todo key={item.id} content={item} />
        ))}
      </ul>
    </>
  );
};

export default Todos;
