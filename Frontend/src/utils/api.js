class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  makeFetch(url, method = "GET", body = {}) {
    let request;
    if (method === "GET" || method === "PUT" || method === "DELETE") {
      request = fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}` || "",
        },
      });
    } else {
      request = fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}` || "",
        },
        body: JSON.stringify(body),
      });
    }
    return request
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getInitialCards() {
    return this.makeFetch(`${this.baseUrl}/cards`);
  }

  editProfile(data) {
    return this.makeFetch(`${this.baseUrl}/users/me`, "PATCH", {
      name: data.name,
      about: data.about,
    });
  }

  editAvatar(data) {
    return this.makeFetch(`${this.baseUrl}/users/me/avatar`, "PATCH", {
      avatar: data.avatar,
    });
  }

  addCard(data) {
    return this.makeFetch(`${this.baseUrl}/cards`, "POST", {
      name: data.name,
      link: data.link,
    });
  }

  removeCard(cardId) {
    return this.makeFetch(`${this.baseUrl}/cards/${cardId}`, "DELETE");
  }

  addLike(cardId) {
    return this.makeFetch(`${this.baseUrl}/cards/likes/${cardId}`, "PUT");
  }

  removeLike(cardId) {
    return this.makeFetch(`${this.baseUrl}/cards/likes/${cardId}`, "DELETE");
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.removeLike(cardId);
    } else {
      return this.addLike(cardId);
    }
  }
}

const api = new Api({
  baseUrl: process.env.REACT_APP_API_BASE_URL,
  headers: {
    authorization: localStorage.getItem("jwt"),
    "Content-Type": "application/json",
  },
});

export default api;
