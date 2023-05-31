const btn_remove_notification = document.querySelector('.btn_close_notification')

function removeNotification(event) {
  const parent_element = event.target.parentNode;
  parent_element.remove()
}

function createNotification(message){
  const div_notification = document.createElement('div')
  div_notification.classList.add("notification");
  const words = document.createElement('p')
  const icon_close_button = document.createElement('i')
  icon_close_button.classList.add("gg-close")
  const close_notification = document.createElement('button')
  close_notification.classList.add("btn_close_notification")

  close_notification.appendChild(icon_close_button)
  div_notification.appendChild(words);
  div_notification.appendChild(close_notification)
  words.textContent = message;

  close_notification.addEventListener('click', removeNotification)

  document.body.appendChild(div_notification);
}