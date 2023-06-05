const get_groups_and_tasks = async (project_id) => {
  const response = await fetch(`${API_BASE_URL}/v1/projects/${project_id}/groups/`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token}`
    }  
  })

  let data = await response.json()

  await Promise.all(data.map(async (group, index) => {
    const response = await fetch(`${API_BASE_URL}/v1/groups/${group.id}/tasks/`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`
      }  
    })

    const tasks = await response.json()

    data[index] = {...group, tasks}
  }))

  switch(response.status){
    case 404:
      window.location.href = "/"
      break
    case 400:
      window.location.href = "/"
      break
    case 401:
      return logout()
  }

  if(data.statusCode === 401){
    return logout()
  }

  console.log(data)

  return data;
}