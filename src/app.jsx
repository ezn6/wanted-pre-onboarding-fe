import './app.css';
import Login from './components/login/login';
import { Route, Routes } from 'react-router-dom';
import Todos from './components/todos/todos';

function App({ auth, token, todoService }) {
  console.log('app.jsx');

  return (
    <Routes>
      <Route path='/' element={<Login auth={auth} token={token} />} />
      <Route
        path='/todo'
        element={<Todos token={token} todoService={todoService} />}
      />
      <Route path='*' element={<h3>PAGE NOT FOUND😥</h3>} />
    </Routes>
  );
}

export default App;
