const btn_create_workspace = document.querySelector('.btn_create_workspace');

btn_create_workspace.addEventListener('click', (event) => {
  const form_container_workspace = document.querySelector('.form_container.workspace');
  form_container_workspace.classList.toggle('open');
})