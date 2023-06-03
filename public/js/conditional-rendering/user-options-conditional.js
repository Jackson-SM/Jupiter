const user_options = document.querySelector('.user-options');
console.log(user_options)

function execConditional() {
  if(getCookie('token').length > 0) {
    const button_user_options = document.createElement('button')
    button_user_options.classList.add("user_dropdown")
    button_user_options.innerHTML = `${user.firstName}<i class="gg-more-vertical-alt"></i>`

    console.log(button_user_options)

    return user_options.appendChild(button_user_options);
  }

  return logout()
}

execConditional()