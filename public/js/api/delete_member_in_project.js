const delete_member_project = async (data) => {
    const response = await fetch(API_BASE_URL + "/v1/projects/participants/", {
    method: 'DELETE',
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
      return createNotification("Você não possui permissão para remover um membro.");
    case 204:
      createNotification("Usuário removido do projeto com sucesso.");
    break
    default:
      return createNotification("Erro inesperado, tente novamente.");
  }
}
