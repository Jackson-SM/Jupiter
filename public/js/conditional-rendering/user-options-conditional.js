const user_options = document.querySelector(".user-options");
const dropdown_user = document.querySelector(".dropdown_user");
const name_user = document.querySelector(".dropdown_user .user");

function execConditional() {
  if (getCookie("token").length > 0) {
    const button_user_options = document.createElement("button");
    button_user_options.classList.add("user_dropdown");
    button_user_options.innerHTML = `<i class="gg-user-list"></i>${user.firstName}`;

    name_user.textContent = user.firstName + " " + user.lastName;

    button_user_options.addEventListener("click", () => {
      dropdown_user.classList.toggle("open");
    });

    return user_options.appendChild(button_user_options);
  }

  return logout();
}

execConditional();
