function privateForUsers(){
  if(getCookie('token').length > 0) {
    window.location.href = "/"
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  privateForUsers()
})