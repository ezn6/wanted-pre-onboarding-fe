class FetchClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async fetch(url, options) {
    const res = await fetch(`${this.baseURL}${url}`, {
      ...options,
    });

    if (res.status == 204) {
      return;
    }

    let data;
    try {
      data = await res.json();
    } catch (error) {
      console.error(error);
      console.log(res.status);
    }

    if (res.status > 299 || res.status < 200) {
      alert(`${data.message}`);
      throw new Error(`${data.message}`);
    }
    return data;
  }
}

export default FetchClient;
