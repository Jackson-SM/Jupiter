function privateForSpec() {
  if (getCookie("token").length < 1 || !sessionStorage.getItem("user")) {
    window.location.href = "/login.html";
  }
}

privateForSpec();
