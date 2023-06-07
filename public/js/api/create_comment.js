const create_comment = async (data) => {
  const response = await fetch(API_BASE_URL + `/v1/comments/`, {
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
