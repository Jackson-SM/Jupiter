const formProject = document.querySelector(".form_project");

async function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formObject = Object.fromEntries(formData.entries()); // Transformando o FormData em Objeto

  const data = create_project({
    title: formObject.title,
    description: formObject.description,
    workspaceId: formObject.workspaceId,
    leadId: user.id,
  });
}

const create_project = async (data) => {
  const response = await fetch(API_BASE_URL + "/v1/projects/", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (responseData.statusCode) {
    switch (responseData.statusCode) {
      case 404:
        return createNotification("Verifique os dados novamente.");
      case 401:
        return logout();
      default:
        return createNotification("Erro inesperado, tente novamente.");
    }
  }

  window.location.reload();
  return responseData.user;
};

formProject.addEventListener("submit", handleSubmit);
