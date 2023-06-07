const delete_workspace = async (workspaceId) => {
  initLoading();
  const response = await fetch(
    API_BASE_URL + `/v1/workspaces/${workspaceId}/`,
    {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  switch (response.status) {
    case 404:
      stopLoading();
      return createNotification("Verifique os dados novamente.");
    case 401:
      stopLoading();
      return logout();
    case 204:
      return window.location.reload();
    default:
      stopLoading();
      return createNotification("Erro inesperado, tente novamente.");
  }
};
