function privateForUsers() {
  if (getCookie("token").length > 0) {
    window.location.href = "/";
  }
}

privateForUsers();
