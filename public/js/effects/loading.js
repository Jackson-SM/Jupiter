async function initLoading() {
  const loading = document.createElement("div");
  loading.classList.add("loading");
  const img = document.createElement("img");
  img.setAttribute("src", "/public/assets/jupiter_logo.png");
  loading.appendChild(img);
  document.body.appendChild(loading);
}

async function stopLoading() {
  const loading = document.querySelector(".loading");
  loading.remove();
}
