const getProjectsParticipant = async () => {
  const response = await fetch(
    `${API_BASE_URL}/v1/users/${user.id}/projects/participant`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (data.statusCode === 401) {
    return logout();
  }

  if (data.statusCode === 401) {
    return logout();
  }

  return data;
};
