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
    console.log(data);
    return data;
  }
}

export default TodoService;
