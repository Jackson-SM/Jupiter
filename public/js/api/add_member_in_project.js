const formMember = document.querySelector(".form_member");

async function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formObject = Object.fromEntries(formData.entries()); // Transformando o FormData em Objeto
  console.log(formObject);

  const data = add_member({
    email: formObject.email,
    projectId: formObject.projectId,
  });
}

const add_member = async (data) => {
  const response = await fetch(API_BASE_URL + "/v1/projects/participants/", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (response.status) {
    switch (response.status) {
      case 404:
        return createNotification("Verifique os dados novamente.");
      case 401:
        return createNotification(
          "Você não possui permissão para adicionar um membro."
        );
      case 409:
        return createNotification("O Usuário específicado já está no projeto.");
      case 201:
        window.location.reload();
      default:
        return createNotification("Erro inesperado, tente novamente.");
    }
  }
};

formMember.addEventListener("submit", handleSubmit);
