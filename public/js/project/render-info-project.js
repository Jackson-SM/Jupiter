const currentUrl = window.location.href
const urlId = new URL(currentUrl)
const idParam = urlId.searchParams.get('id');

async function renderInfoProject() {
  if(!idParam){
    return window.location.href = "/home"
  }

  const project = await getProject(idParam);
  const groups = await get_groups_and_tasks(idParam);

  document.title = project.title;

  const top_bar_project = document.querySelector('.top_bar_project');

  if(project.leadId === user.id) {
    const btn_add_member = document.createElement('button');
    btn_add_member.classList.add("button", "btn_add_members");
    btn_add_member.addEventListener('click', (event) => {
      const form_member = document.querySelector('.form_container.member_container_form');
      form_member.classList.toggle('open');
    })
    btn_add_member.innerHTML = `<i class="gg-user-add"></i> Membro`
    const count_members = document.querySelector('.count_members');

    top_bar_project.insertBefore(btn_add_member, count_members);
  } else {
    const form_container_member = document.querySelector('.form_container.member_container_form');
    form_container_member.remove()
  }

  const button_count_members = document.querySelector('.count_members');
  const count_members = document.createTextNode(project.participants.length)
  button_count_members.appendChild(count_members);
  const dropdown_members = document.querySelector('.dropdown_members');
  button_count_members.addEventListener('click', (event) => {
    if(project.participants.length > 0) {
      dropdown_members.classList.toggle('open')
    }
  })
  
  const members = document.querySelector('.members');
  project.participants.map((participant) => {
    const nameMember = document.createTextNode(participant.firstName);
    const member = document.createElement('li')
    const memberButton = document.createElement('button')
    const member_options = document.createElement('button')
    member_options.classList.add('member_options');

    memberButton.innerHTML = '<i class="gg-user"></i>'
    member_options.innerHTML = '<i class="gg-close"></i>'

    member_options.addEventListener('click', async (event) => {
      event.preventDefault()
      await delete_member_project({userId: participant.id, projectId: project.id});
    })
    
    memberButton.classList.add('member')
    memberButton.appendChild(nameMember)
    if(project.leadId === user.id) {
      memberButton.appendChild(member_options);
    }

    member.appendChild(memberButton);

    members.appendChild(member)
  })
  

  const insert_projectid_in_input = document.querySelectorAll('.input_projectid');
  insert_projectid_in_input.forEach(input => {
    input.setAttribute('value', project.id);
  })

  const btn_add_group = document.querySelector('.btn_add_group');
  btn_add_group.addEventListener('click', (event) => {
    const form_group = document.querySelector('.form_container.group');
    form_group.classList.toggle('open');
  })

  // Group

  const groupsElement = document.querySelector('.groups')
  
  groups.map((group, index) => {
    const groupCard = document.createElement('div')
    groupCard.classList.add("group_card")
    const top_group = document.createElement('div')
    top_group.classList.add("top_group")
    const title_group = document.createElement('span')
    title_group.classList.add("title_group")
    const title_group_text = document.createTextNode(group.name)

    const btn_dropdown_group = document.createElement('button')
    btn_dropdown_group.classList.add("btn_dropdown_group")
    btn_dropdown_group.innerHTML = '<i class="gg-more-vertical-alt"></i>'

    const dropdown_group_element = document.createElement('div')
    dropdown_group_element.classList.add('dropdown_group');
    const list_options_group = document.createElement('ul')
    const item_options_group = document.createElement('li')
    const edit_button_options = document.createElement('button')
    edit_button_options.classList.add("edit_name_group", "group_option")
    edit_button_options.textContent = "Editar Nome"
    const delete_button_options = document.createElement('button')
    delete_button_options.classList.add("delete_name_group", "group_option")
    delete_button_options.textContent = "Deletar Grupo"

    item_options_group.appendChild(edit_button_options)
    item_options_group.appendChild(delete_button_options)
    list_options_group.appendChild(item_options_group)
    dropdown_group_element.appendChild(list_options_group)


    btn_dropdown_group.appendChild(dropdown_group_element)

    delete_button_options.addEventListener('click', (event) => {
      delete_group(group.id)
    })

    edit_button_options.addEventListener('click', (event) => {
      const form_edit = document.querySelector('.form_container.edit_title_group')
      const input = document.querySelector('.input_groupid')
      input.setAttribute('value', group.id)
      form_edit.classList.toggle('open')
    })

    btn_dropdown_group.addEventListener('click', (event) => {
      const dropdown_group = document.querySelectorAll('.dropdown_group')
      console.log(group.id)
      // const input_edit_group = document.querySelector('.input_groupid');
      // input_edit_group.setAttribute('value', group.id)

      //edit_title_group.classList.toggle('open');

      dropdown_group[index].classList.toggle('open');
    })

    title_group.appendChild(title_group_text);
    top_group.appendChild(title_group);
    top_group.appendChild(btn_dropdown_group);
    groupCard.appendChild(top_group);

    const taskElement = document.createElement('div')
    taskElement.classList.add("tasks")

    groupsElement.appendChild(groupCard)
    groupCard.appendChild(taskElement)

    group.tasks.map(task => {
      const taskCard = document.createElement("button")
      taskCard.classList.add("task_card")

      const title_task_card = document.createElement('span')
      title_task_card.classList.add("title")
      title_task_card.textContent = task.title;

      taskCard.append(title_task_card)

      taskElement.appendChild(taskCard)
    })

    const footer_group = document.createElement('div')
    footer_group.classList.add("footer_group");
    const add_task = document.createElement('button')
    add_task.classList.add("btn_add_task");
    add_task.textContent = "Adicionar Task"
    footer_group.appendChild(add_task);
    groupCard.appendChild(footer_group)
  })
}

renderInfoProject()

const overlays = document.querySelectorAll('.overlay')

overlays.forEach((overlay) => {
  overlay.addEventListener('click', (event) => {
    const form_container_open = document.querySelector('.form_container.open');
    form_container_open.classList.toggle('open');
  })
})

