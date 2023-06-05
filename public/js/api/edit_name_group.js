const formEdit = document.querySelector('.form_edit')


async function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formObject = Object.fromEntries(formData.entries()); // Transformando o FormData em Objeto
  console.log(formObject);

  edit_name_group({name: formObject.name, groupId: formObject.groupId});
}

const edit_name_group = async (data) => {
    const response = await fetch(API_BASE_URL + `/v1/groups/${data.groupId}/`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });

    switch(response.status){
      case 404:
        return createNotification("Verifique os dados novamente.");
      case 401:
        return logout()
      case 204:
        return window.location.reload()
      default:
        return createNotification("Erro inesperado, tente novamente.");
    }
}

formEdit.addEventListener('submit', handleSubmit);