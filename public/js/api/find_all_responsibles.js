const find_all_responsibles = async (taskId) => {
  const response = await fetch(API_BASE_URL + `/v1/tasks/${taskId}/responsibles/`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  switch (response.status) {
    case 404:
      return createNotification("Verifique os dados novamente.");
    case 401:
      return logout();
    case 200:
      return await response.json()
    default:
      return createNotification("Erro inesperado, tente novamente.");
  }
};
