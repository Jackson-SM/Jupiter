const formLogin = document.querySelector(".form-login");

async function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formObject = Object.fromEntries(formData.entries()); // Transformando o FormData em Objeto

  const data = login({
    email: formObject.email,
    password: formObject.password,
  });
}

const login = async (data) => {
  const response = await fetch(API_BASE_URL + "/v1/login/", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (responseData.statusCode) {
    switch (responseData.statusCode) {
      case 404:
        return createNotification("O Usuário informado não existe.");
      case 401:
        return createNotification("Os dados do usuário estão incorretos.");
      default:
        return createNotification("Erro inesperado, tente novamente.");
    }
  }

  setCookie("token", responseData.token, 2);
  sessionStorage.setItem("user", JSON.stringify(responseData.user));
  window.location.href = "/";

  return responseData.user;
};

formLogin.addEventListener("submit", handleSubmit);
