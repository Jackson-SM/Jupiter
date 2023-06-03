const section_workspaces = document.querySelector('.workspaces')

async function renderWorkspaces() {
  const data = await fetchWorkspaces()
  
  data.map((data) => {
    const workspace = document.createElement('div');
    workspace.classList.add('workspace');
    
    const top_workspace = document.createElement('div');
    top_workspace.classList.add("top_workspace");
    const title_workspace = document.createElement('h3');
    title_workspace.textContent = data.title;

    const projects_workspace = document.createElement('div')
    projects_workspace.classList.add("projects_workspace")
    top_workspace.appendChild(projects_workspace)

    data.projects.map((project) => {
      const projectElement = document.createElement('a')
      projectElement.classList.add("project")
      projectElement.setAttribute("href", `project?id=${project.id}`)
      projects_workspace.appendChild(projectElement)
    })

    console.log(data)

    section_workspaces.appendChild(workspace);
  })
}

renderWorkspaces()