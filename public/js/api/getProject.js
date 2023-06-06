const token = getCookie("token");

const getProject = async (project_id) => {
  initLoading();
  const responseParticipants = await fetch(
    `${API_BASE_URL}/v1/projects/${project_id}/participants/`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const participants = await responseParticipants.json();

  const response = await fetch(`${API_BASE_URL}/v1/projects/${project_id}/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  let data = await response.json();

  switch (response.status) {
    case 404:
      window.location.href = "/";
      break;
    case 401:
      return logout();
  }

  if (data.statusCode === 401) {
    return logout();
  }

  if (participants.statusCode === 401) {
    return logout();
  }

  if (
    data.leadId !== user.id &&
    participants.includes((participant) => participant.userId !== user.id)
  ) {
    return (window.location.href = "/");
  }

  const projectAndParticipants = { ...data, participants };

  stopLoading();

  return projectAndParticipants;
};
