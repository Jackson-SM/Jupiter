const task_info_container = document.querySelector(".task_info");
const content_task_info = document.querySelector(".content_task_info");
const description_edit_info = document.querySelector(
  ".content_task_info textarea"
);
const task_info = document.querySelector(".body_task_info");
const overlay_task = document.querySelector(".overlay");

task_title = document.querySelector(".body_task_info .container_title_task .title_task");
task_title_edit = document.querySelector(
  ".body_task_info .container_title_task .title_task_edit"
);

task_title.addEventListener("click", (event) => {
  event.stopPropagation();
  task_title_edit.classList.add("open");
  console.log(event.target)
});

content_task_info.addEventListener("click", (event) => {
  event.stopPropagation();
  content_task_info.classList.add("open");
  description_edit_info.classList.add("open");
  content_task_info.scrollTop = 0;
});

task_info.addEventListener("click", (event) => {
  if(event.target !== task_info) {
    return;
  }
  description_edit_info.classList.remove("open");
  content_task_info.classList.remove("open");
  task_title_edit.classList.remove("open");
  console.log(event.target)
});

overlay_task.addEventListener("click", (event) => {
  event.stopPropagation();
  task_info.classList.toggle("open");
});
