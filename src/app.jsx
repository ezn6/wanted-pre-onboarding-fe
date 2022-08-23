import './app.css';
import Login from './components/login/login';

function App({ auth }) {
  return (
    <>
      <Login auth={auth} />
    </>
  );
}

export default App;
