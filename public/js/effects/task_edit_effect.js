const task_info_container = document.querySelector(".task_info");
const content_task_info = document.querySelector(".content_task_info");
const description_edit_info = document.querySelector(
  ".content_task_info textarea"
);
const task_info = document.querySelector(".body_task_info");
const overlay_task = document.querySelector(".overlay");
const count_responsibles_task = document.querySelector(
  ".options_task .count_responsibles_task"
);
const dropdown_responsibles_task = document.querySelector(
  ".options_task .count_responsibles_task .dropdown_responsibles_task"
);

task_title = document.querySelector(
  ".body_task_info .container_title_task .title_task"
);
task_title_edit = document.querySelector(
  ".body_task_info .container_title_task .title_task_edit"
);

task_title.addEventListener("click", (event) => {
  event.stopPropagation();
  task_title_edit.classList.add("open");
});

content_task_info.addEventListener("click", (event) => {
  event.stopPropagation();
  content_task_info.classList.add("open");
  description_edit_info.classList.add("open");
  content_task_info.scrollTop = 0;
});

task_info.addEventListener("click", (event) => {
  event.stopPropagation();
  if (event.target === task_title_edit) {
    return;
  }
  description_edit_info.classList.remove("open");
  content_task_info.classList.remove("open");
  task_title_edit.classList.remove("open");
});

overlay_task.addEventListener("click", (event) => {
  event.stopPropagation();
  task_info.classList.toggle("open");
});

count_responsibles_task.addEventListener("click", (event) => {
  dropdown_responsibles_task.classList.toggle("open");
});
