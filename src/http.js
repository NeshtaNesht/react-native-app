export class Http {
  static HEADERS = {
    "Content-Type": "application/json"
  };
  // Rest:
  // GET запрос
  static async get(url) {
    try {
      return await request(url, "GET");
    } catch (e) {
      console.log(e);
    }
  }
  // POST запрос
  static async post(url, data = {}) {
    try {
      return await request(url, "POST", data);
    } catch (e) {
      console.log(e);
    }
  }
  // DELETE запрос
  static async delete(url) {
    try {
      return await request(url, "DELETE");
    } catch (e) {
      console.log(e);
    }
  }
  // PATCH запрос
  static async patch(url, data = {}) {
    try {
      return await request(url, "PATCH", data);
    } catch (e) {
      console.log(e);
    }
  }
}

async function request(url, method = "GET", data) {
  const config = {
    method,
    headers: Http.HEADERS
  };
  // Если это отправка на сервер, то преобразуем данные в JSON
  if (method === "POST" || method === "PATCH") {
    config.body = JSON.stringify(data);
  }
  const response = await fetch(url, config);
  return await response.json(); // Отправляем запрос и ждем пока он выполнится
}
