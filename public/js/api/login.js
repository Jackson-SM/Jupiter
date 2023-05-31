const formLogin = document.querySelector('.form-login')

async function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formObject = Object.fromEntries(formData.entries());
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

  localStorage.setItem('token', JSON.stringify(responseData.token))
  localStorage.setItem('user', JSON.stringify(responseData.user))

  return responseData.user;
}

formLogin.addEventListener('submit', handleSubmit);