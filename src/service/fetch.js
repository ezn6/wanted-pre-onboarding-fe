class FetchClient {
  constructor(baseURL) {
    // this.url = process.env.REACT_APP_BASE_URL;
    this.baseURL = baseURL;
  }

  async fetch(url, options) {
    const res = await fetch(`${this.baseURL}${url}`, {
      ...options,
    });

    let data;
    try {
      data = await res.json();
    } catch (error) {
      console.error(error);
    }

    if (res.status > 299 || res.status < 200) {
      alert(`${data.message}`);
      throw new Error(`${data.message}`);
    }
    return data;
  }
}

export default FetchClient;
