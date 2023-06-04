const formGroup = document.querySelector('.form_group')


async function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formObject = Object.fromEntries(formData.entries()); // Transformando o FormData em Objeto
  console.log(formObject);

  const data = create_group({name: formObject.name, projectId: formObject.projectId});
}

const create_group = async (data) => {
    const response = await fetch(API_BASE_URL + "/v1/groups/", {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json()
  console.log(responseData)

  if(responseData.statusCode){
    switch(responseData.statusCode){
      case 404:
        return createNotification("Verifique os dados novamente.");
      case 401:
        return logout()
      default:
        return createNotification("Erro inesperado, tente novamente.");
    }
  }


  window.location.reload()
  return responseData;
}

formGroup.addEventListener('submit', handleSubmit);