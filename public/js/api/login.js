const formLogin = document.querySelector('.form-login')

function setCookie(name, value, days) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; Secure; path=/';
}

function getCookie(name) {
  const cookieName = name + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return '';
}

async function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formObject = Object.fromEntries(formData.entries()); // Transformando o FormData em Objeto
  console.log(formObject);

  if(formObject.password !== formObject.confirmPassword) {
    return createNotification("A senha de Confirmação deve ser igual ao campo de Senha!")
  }

  const data = login({email: formObject.email, password: formObject.password})

  return console.log(data);
}

const login = async (data) => {
    const response = await fetch("http://localhost:3000/v1/login/", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json()

  if(responseData.statusCode) {
    return createNotification("Conta não encontrada.")
  }

  setCookie('token', responseData.token, 2);

  sessionStorage.setItem('user', JSON.stringify(responseData.user))

  return responseData.user;
}

formLogin.addEventListener('submit', handleSubmit);