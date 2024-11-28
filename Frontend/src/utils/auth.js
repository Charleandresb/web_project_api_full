const BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";

export async function register(email, password) {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  if (!response.ok) {
    throw new Error("Error al registrar");
  }

  const data = await response.json();
  return data;
}

export async function login(email, password) {
  const response = await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  if (!response.ok) {
    throw new Error("no se ha proporcionado uno o más campos");
  }

  const data = await response.json();
  localStorage.setItem("jwt", data.token);
  return data;
}

export async function checkToken(token) {
  const response = await fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    return { error: "token inválido" };
  }

  const data = response.json();
  return data;
}
