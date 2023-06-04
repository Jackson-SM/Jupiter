const currentUrl = window.location.href
const urlId = new URL(currentUrl)
const idParam = urlId.searchParams.get('id');

async function renderInfoProject() {
  if(!idParam){
    return window.location.href = "/home"
  }

  const project = await getProject(idParam);

  console.log(project)

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
}

renderInfoProject()

const overlays = document.querySelectorAll('.overlay')

overlays.forEach((overlay) => {
  overlay.addEventListener('click', (event) => {
    const form_container_open = document.querySelector('.form_container.open');
    form_container_open.classList.toggle('open');
  })
})

