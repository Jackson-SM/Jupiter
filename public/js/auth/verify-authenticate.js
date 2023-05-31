const token = localStorage.getItem('token')

console.log(token)

document.addEventListener("DOMContentLoaded", function() {
  if(token) {
   return window.location.href = "http://localhost:3001/"
  }
});