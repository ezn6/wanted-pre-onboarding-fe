class TodoService {
  constructor(tokenStorage) {
    this.tokenStorage = tokenStorage;
    this.url = process.env.REACT_APP_BASE_URL;
  }

  async getTodos() {
    const token = this.tokenStorage.getToken();
    const res = await fetch(`${this.url}/todos`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (res.status > 299 || res.status < 200) {
      alert(`${data.message}`);
      throw new Error(`${data.message}`);
    }
    // console.log(data);
    return data;
  }

  async createTodo(todo) {
    const token = this.tokenStorage.getToken();
    const res = await fetch(`${this.url}/todos`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        todo,
      }),
    });
    const data = await res.json();
    if (res.status > 299 || res.status < 200) {
      alert(`${data.message}`);
      throw new Error(`${data.message}`);
    }
    console.log(data);
    return data;
  }

  async updateTodo(todo, isCompleted, id) {
    const token = this.tokenStorage.getToken();
    const res = await fetch(`${this.url}/todos/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        todo,
        isCompleted,
      }),
    });
    const data = await res.json();
    if (res.status > 299 || res.status < 200) {
      alert(`${data.message}`);
      throw new Error(`${data.message}`);
    }
    // console.log(data);
    return data;
  }

  async deleteTodo(id) {
    const token = this.tokenStorage.getToken();
    const res = await fetch(`${this.url}/todos/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // const data = await res.json();
    if (res.status > 299 || res.status < 200) {
      // alert(`${data.message}`);
      throw new Error(`${res}`);
    }
    // console.log(data);
    // return data;
  }
}

export default TodoService;
