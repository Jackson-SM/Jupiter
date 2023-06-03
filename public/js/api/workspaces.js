const token = getCookie('token')

const fetchWorkspaces = async () => {
  const response = await fetch(`${API_BASE_URL}/v1/users/${user.id}/workspaces/`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token}`
    }  
  })

  let data = await response.json()

  await Promise.all(data.map(async (workspace, index) => {
    const response = await fetch(`${API_BASE_URL}/v1/workspaces/${workspace.id}/projects/`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`
      }  
    })

    const projects = await response.json()

    data[index] = {...workspace, projects}
  }))

  return data;
}