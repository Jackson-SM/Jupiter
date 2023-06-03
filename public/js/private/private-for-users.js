function privateForUsers(){
  if(getCookie('token').length > 0) {
    window.location.href = "/home"
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  privateForUsers()
})