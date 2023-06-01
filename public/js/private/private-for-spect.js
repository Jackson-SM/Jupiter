function privateForSpec() {
  if(getCookie('token').length < 1) {
    window.location.href = "/"
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  privateForSpec()
})