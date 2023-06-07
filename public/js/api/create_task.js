const formTask = document.querySelector(".form_task");

async function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formObject = Object.fromEntries(formData.entries()); // Transformando o FormData em Objeto

  const data = create_task({
    title: formObject.title,
    description: formObject.description,
    groupId: formObject.groupId,
  });
}

const create_task = async (data) => {
  const response = await fetch(API_BASE_URL + "/v1/tasks/", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  switch (response.status) {
    case 404:
      return createNotification("Verifique os dados novamente.");
    case 401:
      return logout();
    case 201:
      return window.location.reload();
    default:
      return createNotification("Erro inesperado, tente novamente.");
  }
};

formTask.addEventListener("submit", handleSubmit);
