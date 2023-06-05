const delete_group = async (groupId) => {
    const response = await fetch(API_BASE_URL + `/v1/groups/${groupId}/`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
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