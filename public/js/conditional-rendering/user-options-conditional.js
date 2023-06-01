const user_options = document.querySelector('.user-options');

function execConditional() {
  if(getCookie('token').length > 0) {
    const button_user_options = document.createElement('button')
    button_user_options.classList.add("user_dropdown")

    button_user_options.innerHTML = `${user.firstName}<i class="gg-more-vertical-alt"></i>`

    return user_options.appendChild(button_user_options);
  }

  const button_login = document.createElement('a')
  button_login.classList.add("button")
  button_login.setAttribute("href", "login.html")
  button_login.textContent = "Entre"

  return user_options.appendChild(button_login);
}

execConditional()