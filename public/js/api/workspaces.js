const token = getCookie('token')

const fetchWorkspaces = async () => {
  initLoading()
  const response = await fetch(`${API_BASE_URL}/v1/users/${user.id}/workspaces/`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token}`
    }  
  })

  let data = await response.json()

  if(data.statusCode === 401){
    return logout()
  }

  await Promise.all(data.map(async (workspace, index) => {
    const response = await fetch(`${API_BASE_URL}/v1/workspaces/${workspace.id}/projects/`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`
      }  
    })

    const projects = await response.json()

    if(projects.statusCode === 401) {
      return logout()
    }

    data[index] = {...workspace, projects}
  }))

  stopLoading()

  return data;
}