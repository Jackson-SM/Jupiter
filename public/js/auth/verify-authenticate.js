if (getCookie("token").length < 1 || !sessionStorage.getItem("user")) {
  logout();
}
