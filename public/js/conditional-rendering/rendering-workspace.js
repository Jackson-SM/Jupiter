const section_workspaces = document.querySelector(".workspaces");

async function renderWorkspaces() {
  const data = await fetchWorkspaces();
  const dataParticipanting = await getProjectsParticipant();


  data.map((data) => {
    const workspace = document.createElement("div");
    workspace.classList.add("workspace");

    const title_workspace = document.createElement("h3");
    const top_workspace = document.createElement("div");
    top_workspace.classList.add("top_workspace");
    title_workspace.innerHTML = `${data.title}<i class="gg-arrow-down"></i>`;
    top_workspace.appendChild(title_workspace);
    workspace.appendChild(top_workspace); // Add In Workspace

    const projects_workspace = document.createElement("div");
    projects_workspace.classList.add("projects_workspace");
    workspace.appendChild(projects_workspace); // Add Collection Projects

    data.projects.map((project) => {
      const projectElement = document.createElement("a");
      projectElement.classList.add("project");
      projectElement.setAttribute("href", `project/?id=${project.id}`);
      projects_workspace.appendChild(projectElement);

      // Content Project
      const content_project = document.createElement("div");
      content_project.classList.add("content_project");
      const title_project = document.createElement("span");
      title_project.classList.add("title");
      title_project.textContent = project.title;
      const btn_delete_workspace = document.createElement("button");
      btn_delete_workspace.classList.add("btn_delete_workspace");
      btn_delete_workspace.innerHTML = '<i class="gg-trash"></i>';

      btn_delete_workspace.addEventListener("click", (event) => {
        event.preventDefault();
        delete_workspace(data.id);
      });

      content_project.appendChild(btn_delete_workspace);
      content_project.appendChild(title_project);

      projectElement.appendChild(content_project);
    });

    const create_project = document.createElement("div");
    create_project.classList.add("project", "create_project");
    create_project.innerHTML = '<i class="gg-add-r"></i> Criar Projeto';

    create_project.addEventListener("click", (event) => {
      const input_workspaceid = document.querySelector(".input_workspaceid");
      input_workspaceid.setAttribute("value", data.id);
      document
        .querySelector(".form_container.project")
        .classList.toggle("open");
    });

    projects_workspace.appendChild(create_project);

    section_workspaces.appendChild(workspace);
  });

  if (data.length < 1) {
    const workspaces = document.querySelector(".workspaces");

    const textNotWorkspace = document.createElement("h3");
    textNotWorkspace.classList.add("not_workspaces");
    textNotWorkspace.textContent = "Você não possui Workspaces";

    workspaces.appendChild(textNotWorkspace);
  }

  if (dataParticipanting.length < 1) {
    const inviteWorkspaces = document.querySelector(".invite_workspaces");

    const textNotProjectParticipanting = document.createElement("h3");
    textNotProjectParticipanting.classList.add("not_workspaces");
    textNotProjectParticipanting.textContent =
      "Você não participa de nenhum projeto";

    inviteWorkspaces.appendChild(textNotProjectParticipanting);
  }

  dataParticipanting.map((project) => {
    const inviteWorkspaces = document.querySelector(
      ".projects_workspace_invite"
    );

    const projectElement = document.createElement("a");
    projectElement.classList.add("project");
    projectElement.setAttribute("href", `project/?id=${project.id}`);

    // Content Project
    const content_project = document.createElement("div");
    content_project.classList.add("content_project");
    const title_project = document.createElement("span");
    title_project.classList.add("title");
    title_project.textContent = project.title;

    content_project.appendChild(title_project);

    projectElement.appendChild(content_project);

    inviteWorkspaces.appendChild(projectElement);
  });
}

renderWorkspaces();

const overlays = document.querySelectorAll(".overlay");

overlays.forEach((overlay) => {
  overlay.addEventListener("click", (event) => {
    const form_container_open = document.querySelector(".form_container.open");
    form_container_open.classList.toggle("open");
  });
});
