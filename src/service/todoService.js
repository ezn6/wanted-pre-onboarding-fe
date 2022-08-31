class TodoService {
  constructor(tokenStorage, fetchClient) {
    this.tokenStorage = tokenStorage;
    this.fetchClient = fetchClient;
  }

  getHeaders() {
    const token = this.tokenStorage.getToken();
    return `Bearer ${token}`;
  }

  async getTodos() {
    const data = this.fetchClient.fetch('/todos', {
      method: 'GET',
      headers: {
        Authorization: this.getHeaders(),
      },
    });
    return data;
  }

  async createTodo(todo) {
    const data = this.fetchClient.fetch('/todos', {
      method: 'POST',
      headers: {
        Authorization: this.getHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        todo,
      }),
    });
    return data;
  }

  async updateTodo(todo, isCompleted, id) {
    const data = this.fetchClient.fetch(`/todos/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: this.getHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        todo,
        isCompleted,
      }),
    });
    return data;
  }

  async deleteTodo(id) {
    // 바로 return, 또는 위 함수들 처럼 하려면 await처리
    return this.fetchClient.fetch(`/todos/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: this.getHeaders(),
      },
    });
  }
}

export default TodoService;
