const currentUrl = window.location.href;
const urlId = new URL(currentUrl);
const idParam = urlId.searchParams.get("id");
let currentTask;

async function renderInfoProject() {
  if (!idParam) {
    return (window.location.href = "/");
  }

  const project = await getProject(idParam);
  const groups = await get_groups_and_tasks(idParam);

  document.title = project.title;

  const top_bar_project = document.querySelector(".top_bar_project");

  if (project.leadId === user.id) {
    const btn_add_member = document.createElement("button");
    btn_add_member.classList.add("button", "btn_add_members");
    btn_add_member.addEventListener("click", (event) => {
      const form_member = document.querySelector(
        ".form_container.member_container_form"
      );
      form_member.classList.toggle("open");
    });
    btn_add_member.innerHTML = `<i class="gg-user-add"></i> Membro`;
    const count_members = document.querySelector(".count_members");

    top_bar_project.insertBefore(btn_add_member, count_members);
  } else {
    const form_container_member = document.querySelector(
      ".form_container.member_container_form"
    );
    form_container_member.remove();
  }

  const button_count_members = document.querySelector(".count_members");
  const count_members = document.createTextNode(project.participants.length);
  button_count_members.appendChild(count_members);
  const dropdown_members = document.querySelector(".dropdown_members");
  button_count_members.addEventListener("click", (event) => {
    if (project.participants.length > 0) {
      dropdown_members.classList.toggle("open");
    }
  });

  const members = document.querySelector(".members");
  project.participants.map((participant) => {
    const nameMember = document.createTextNode(participant.firstName);
    const member = document.createElement("li");
    const memberButton = document.createElement("button");
    const member_options = document.createElement("button");
    member_options.classList.add("member_options");

    memberButton.innerHTML = '<i class="gg-user"></i>';
    member_options.innerHTML = '<i class="gg-close"></i>';

    member_options.addEventListener("click", async (event) => {
      event.preventDefault();
      await delete_member_project({
        userId: participant.id,
        projectId: project.id,
      });
    });

    memberButton.classList.add("member");
    memberButton.appendChild(nameMember);
    if (project.leadId === user.id) {
      memberButton.appendChild(member_options);
    }

    member.appendChild(memberButton);

    members.appendChild(member);

    const dropdown_participants = document.querySelector(
      ".dropdown_participants"
    );
    const button_participant = document.createElement("button");
    button_participant.classList.add(
      "btn_add_participant",
      "button_options_task"
    );
    button_participant.textContent = participant.firstName;

    dropdown_participants.appendChild(button_participant);

    button_participant.addEventListener("click", (event) => {
      add_responsibles_task({ taskId: currentTask, userId: participant.id });
    });
  });

  const insert_projectid_in_input =
    document.querySelectorAll(".input_projectid");
  insert_projectid_in_input.forEach((input) => {
    input.setAttribute("value", project.id);
  });

  const btn_add_group = document.querySelector(".btn_add_group");
  btn_add_group.addEventListener("click", (event) => {
    const form_group = document.querySelector(".form_container.group");
    form_group.classList.toggle("open");
  });

  // Group

  const groupsElement = document.querySelector(".groups");

  groups.map((group, index) => {
    const groupCard = document.createElement("div");
    groupCard.classList.add("group_card");
    const top_group = document.createElement("div");
    top_group.classList.add("top_group");
    const title_group = document.createElement("span");
    title_group.classList.add("title_group");
    const title_group_text = document.createTextNode(group.name);

    const btn_dropdown_group = document.createElement("button");
    btn_dropdown_group.classList.add("btn_dropdown_group");
    btn_dropdown_group.innerHTML = '<i class="gg-more-vertical-alt"></i>';

    const dropdown_group_element = document.createElement("div");
    dropdown_group_element.classList.add("dropdown_group");
    const list_options_group = document.createElement("ul");
    const item_options_group = document.createElement("li");
    const edit_button_options = document.createElement("button");
    edit_button_options.classList.add("edit_name_group", "group_option");
    edit_button_options.textContent = "Editar Nome";
    const delete_button_options = document.createElement("button");
    delete_button_options.classList.add("delete_name_group", "group_option");
    delete_button_options.textContent = "Deletar Grupo";

    item_options_group.appendChild(edit_button_options);
    item_options_group.appendChild(delete_button_options);
    list_options_group.appendChild(item_options_group);
    dropdown_group_element.appendChild(list_options_group);

    btn_dropdown_group.appendChild(dropdown_group_element);

    const add_task = document.createElement("button");
    add_task.classList.add("btn_add_task");
    add_task.textContent = "Adicionar Task";

    add_task.addEventListener("click", (event) => {
      const form_task = document.querySelector(".form_container.task");
      const input_groupid_task = document.querySelector(".input_groupId");
      input_groupid_task.setAttribute("value", group.id);

      form_task.classList.toggle("open");
    });

    delete_button_options.addEventListener("click", (event) => {
      delete_group(group.id);
    });

    edit_button_options.addEventListener("click", (event) => {
      const form_edit = document.querySelector(
        ".form_container.edit_title_group"
      );
      const input = document.querySelector(".input_groupid");
      input.setAttribute("value", group.id);
      form_edit.classList.toggle("open");
    });

    btn_dropdown_group.addEventListener("click", (event) => {
      const dropdown_group = document.querySelectorAll(".dropdown_group");
      // const input_edit_group = document.querySelector('.input_groupid');
      // input_edit_group.setAttribute('value', group.id)

      //edit_title_group.classList.toggle('open');

      dropdown_group[index].classList.toggle("open");
    });

    title_group.appendChild(title_group_text);
    top_group.appendChild(title_group);
    top_group.appendChild(btn_dropdown_group);
    groupCard.appendChild(top_group);

    const taskElement = document.createElement("div");
    taskElement.classList.add("tasks");

    groupsElement.appendChild(groupCard);
    groupCard.appendChild(taskElement);

    const groups_move_to = document.querySelector(".groups_move_to");

    const button_group_move = document.createElement("button");
    button_group_move.classList.add("button_group_move");
    button_group_move.textContent = group.name;

    groups_move_to.appendChild(button_group_move);

    button_group_move.addEventListener("click", (event) => {
      move_task({ groupId: group.id }, currentTask);
    });

    group.tasks.map((task) => {
      const taskCard = document.createElement("button");
      taskCard.classList.add("task_card");

      const title_task_card = document.createElement("span");
      title_task_card.classList.add("title");
      title_task_card.textContent = task.title;

      const container_title_task = document.querySelector(
        ".container_title_task"
      );
      const title_task = document.querySelector(
        ".container_title_task .title_task"
      );
      const input_task = document.querySelector(".container_title_task input");
      const description_task = document.querySelector(".description_task");
      const textarea_task = document.querySelector(
        ".content_task_info textarea"
      );
      const description_task_textarea = document.querySelector(
        ".content_task_info textarea"
      );
      const button_delete_task = document.querySelector(".delete_task");

      const save_task = document.querySelector(".save_task");
      input_task.addEventListener("input", (event) => {
        title_task.textContent = event.target.value;
        if (
          event.target.value !== task.title ||
          textarea_task.value !== task.description
        ) {
          save_task.removeAttribute("disabled");
        } else {
          save_task.setAttribute("disabled", true);
        }
      });
      textarea_task.addEventListener("input", (event) => {
        description_task.textContent = event.target.value;
        if (
          event.target.value !== task.description ||
          input_task.value !== task.title
        ) {
          save_task.removeAttribute("disabled");
        } else {
          save_task.setAttribute("disabled", true);
        }
      });

      button_delete_task.addEventListener("click", (event) => {
        delete_task(task.id);
      });

      const isDone = document.createElement("div");
      isDone.classList.add("is_done");
      const button_done_task = document.querySelector(".done_task");

      button_done_task.addEventListener("click", (event) => {
        done_task(task.id);
      });

      if (task.doneDate !== null) {
        taskCard.append(isDone);
        button_done_task.setAttribute("disabled", true);
      }

      taskCard.addEventListener("click", async (event) => {
        if (task.doneDate !== null) {
          button_done_task.setAttribute("disabled", true);
        } else {
          button_done_task.removeAttribute("disabled");
        }

        const content_comments = document.querySelector(".content_comments");
        content_comments.innerHTML = "";
        const responsibles = document.querySelector(".responsibles");
        responsibles.innerHTML = "";

        const task_info = document.querySelector(".task_info");
        task_info.classList.add("open");

        currentTask = task.id;

        title_task.textContent = task.title;
        container_title_task.appendChild(input_task);
        input_task.setAttribute("value", task.title);
        description_task.textContent = task.description;
        description_task_textarea.textContent = task.description;

        const data = await find_all_responsibles(task.id);

        const count_responsibles_task = document.querySelector(
          ".options_task .count_responsibles_task"
        );
        const dropdown_responsibles_task = document.querySelector(
          ".options_task .count_responsibles_task .dropdown_responsibles_task"
        );
        const responsiblesElement = document.querySelector(
          ".options_task .count_responsibles_task .responsibles"
        );
        const item_member = document.createElement("li");
        const count_participants = document.querySelector(
          ".count_responsibles_task .count_span"
        );
        count_participants.textContent = data.length;

        data.map((responsible) => {
          const button_member = document.createElement("button");
          button_member.classList.add("member");
          button_member.innerHTML = `<i class="gg-user"></i>${responsible.firstName}`;

          const delete_responsible_element = document.createElement("button");
          delete_responsible_element.classList.add("delete_responsible");
          delete_responsible_element.textContent = "X";

          delete_responsible_element.addEventListener("click", (event) => {
            delete_responsible({ userId: responsible.id }, task.id);
          });

          button_member.appendChild(delete_responsible_element);
          item_member.appendChild(button_member);
          responsiblesElement.appendChild(item_member);
        });

        const commentsData = await find_all_comments(task.id);

        commentsData.map(async (commentsInfo) => {
          const user = await find_user_by_id(commentsInfo.userId);

          const comments = document.querySelector(".comments");
          const comment = document.createElement("div");
          comment.classList.add("comment");
          const top_comment = document.createElement("div");
          top_comment.classList.add("top_comment");
          const content_comment = document.createElement("div");
          content_comment.classList.add("content_comment");
          const username = document.createElement("span");

          const date_post_format = new Date(commentsInfo.createdAt);
          const day = date_post_format.getDate() + 1;
          const month = date_post_format.getMonth() + 1;
          const year = date_post_format.getFullYear();
          const date_post = document.createElement("div");

          date_post.classList.add("date_post");
          date_post.textContent = `Criado em: ${day < 10 ? "0" + day : day}/${
            month < 10 ? "0" + month : month
          }/${year}`;

          username.classList.add("user_name");
          username.innerHTML = `<i class="gg-user"></i>${user.firstName}`;
          const usermessage = document.createElement("p");
          usermessage.classList.add("user_message");
          usermessage.textContent = commentsInfo.content;

          top_comment.appendChild(username);
          top_comment.appendChild(date_post);
          content_comment.appendChild(usermessage);

          comment.appendChild(top_comment);
          comment.appendChild(content_comment);

          content_comments.appendChild(comment);
        });

        const input_comment = document.querySelector(".input_comment");
        const post_comment = document.querySelector(".post_comment");

        input_comment.addEventListener("input", (event) => {
          if (event.target.value.length < 1) {
            post_comment.setAttribute("disabled", false);
          } else {
            post_comment.removeAttribute("disabled");
          }
        });

        post_comment.addEventListener("click", async (event) => {
          const data = {
            content: input_comment.value,
            userId: user.id,
            taskId: task.id,
          };
          await create_comment(data);
        });
      });

      taskCard.append(title_task_card);
      taskElement.appendChild(taskCard);

      save_task.addEventListener("click", (event) => {
        const data = {
          title: input_task.value,
          description: textarea_task.value,
        };
        edit_task(data, task.id);
      });
    });

    const footer_group = document.createElement("div");
    footer_group.classList.add("footer_group");
    footer_group.appendChild(add_task);
    groupCard.appendChild(footer_group);
  });
}

renderInfoProject();

const overlays = document.querySelectorAll(".overlay");

overlays.forEach((overlay) => {
  overlay.addEventListener("click", (event) => {
    const form_container_open = document.querySelector(".form_container.open");
    const task_info = document.querySelector(".task_info.open");
    form_container_open && form_container_open.classList.toggle("open");
    task_info && task_info.classList.toggle("open");
  });
});
