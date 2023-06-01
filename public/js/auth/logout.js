function logout() {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; path=/;';
  sessionStorage.removeItem('user');
  window.location.reload();
}