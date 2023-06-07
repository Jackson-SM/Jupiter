const formRegister = document.querySelector(".form-register");

async function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formObject = Object.fromEntries(formData.entries()); // Transformando o FormData em Objeto

  const data = register({
    firstName: formObject.firstName,
    lastName: formObject.lastName,
    email: formObject.email,
    password: formObject.password,
  });
}

const register = async (data) => {
  const response = await fetch(API_BASE_URL + "/v1/users/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (responseData.statusCode) {
    switch (responseData.statusCode) {
      case 409:
        return createNotification("O usuário já está cadastrado.");
      case 404:
        return createNotification("Os dados passados estão incorretos.");
      default:
        return createNotification("Erro inesperado, tente novamente.");
    }
  }

  setCookie("token", responseData.token, 2);
  sessionStorage.setItem("user", JSON.stringify(responseData.user));
  window.location.href = "/";

  return responseData.user;
};

formRegister.addEventListener("submit", handleSubmit);
