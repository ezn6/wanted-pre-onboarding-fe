import React, { memo } from 'react';

const Todo = memo(({ content }) => {
  //함수,state상위컴포넌트로 옮기기

  const onClick = () => {
    console.log('hi');
  };

  // console.log('todo!.jsx');
  return (
    <li>
      <input type='checkbox' />
      <span>{content.todo}</span>
      <button onClick={onClick}>수정</button>
      <button>삭제</button>
    </li>
  );
});

export default Todo;
