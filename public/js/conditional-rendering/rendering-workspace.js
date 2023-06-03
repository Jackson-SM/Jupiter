const section_workspaces = document.querySelector('.workspaces')

async function renderWorkspaces() {
  const data = await fetchWorkspaces()
  
  data.map((data) => {
    const workspace = document.createElement('div');
    workspace.classList.add('workspace');
    
    const title_workspace = document.createElement('h3');
    const top_workspace = document.createElement('div');
    top_workspace.classList.add("top_workspace");
    title_workspace.innerHTML = `${data.title}<i class="gg-arrow-down"></i>`;
    top_workspace.appendChild(title_workspace);
    workspace.appendChild(top_workspace) // Add In Workspace

    const projects_workspace = document.createElement('div');
    projects_workspace.classList.add("projects_workspace");
    workspace.appendChild(projects_workspace); // Add Collection Projects

    data.projects.map((project) => {
      const projectElement = document.createElement('a')
      projectElement.classList.add("project")
      projectElement.setAttribute("href", `project?id=${project.id}`)
      projects_workspace.appendChild(projectElement)

      // Content Project
      const content_project = document.createElement('div')
      content_project.classList.add("content_project")
      const title_project = document.createElement('span')
      title_project.classList.add("title")
      title_project.textContent = project.title
      
      content_project.appendChild(title_project)

      projectElement.appendChild(content_project)
    })

    const create_project = document.createElement('div')
    create_project.classList.add("project", "create_project")
    create_project.innerHTML = '<i class="gg-add-r"></i> Criar Projeto'
    projects_workspace.appendChild(create_project)

    section_workspaces.appendChild(workspace);
  })
}

renderWorkspaces()