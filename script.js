const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const edad = document.getElementById("edad");
const barraProgreso = document.getElementById("barraProgreso");
const datosMostrados = document.getElementById("datosMostrados");

// Actualizar barra de progreso
function actualizarProgreso() {
  let campos = [nombre.value.trim(), email.value.trim(), edad.value.trim()];
  let llenos = campos.filter(c => c !== "").length;
  let porcentaje = (llenos / campos.length) * 100;
  barraProgreso.style.width = porcentaje + "%";
}

// Eventos para progreso
[nombre, email, edad].forEach(input => {
  input.addEventListener("input", actualizarProgreso);
});

// Validar email real
function validarEmail(correo) {
  const expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return expresion.test(correo);
}

// Guardar información
document.getElementById("guardar").addEventListener("click", () => {
  let usuario = {
    nombre: nombre.value.trim(),
    email: email.value.trim(),
    edad: edad.value.trim()
  };

  if (!usuario.nombre || !usuario.email || !usuario.edad) {
    alert("Por favor complete todos los campos.");
    return;
  }

  if (!validarEmail(usuario.email)) {
    alert("Por favor escriba un email válido.");
    return;
  }

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarios.push(usuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Datos guardados correctamente ✔");

  document.getElementById("formUsuario").reset();
  barraProgreso.style.width = "0%";
});

// Mostrar datos
document.getElementById("verDatos").addEventListener("click", mostrarDatos);

function mostrarDatos() {
  let registros = JSON.parse(localStorage.getItem("usuarios")) || [];

  if (registros.length === 0) {
    alert("No hay datos para mostrar ❗");
    return;
  }

  datosMostrados.innerHTML = "";
  datosMostrados.style.display = "block";

  registros.forEach(reg => {
    let div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
      <p><strong>Nombre:</strong> ${reg.nombre}</p>
      <p><strong>Email:</strong> ${reg.email}</p>
      <p><strong>Edad:</strong> ${reg.edad}</p>
      <hr>
    `;

    datosMostrados.appendChild(div);
  });
}

// Borrar todo
document.getElementById("borrar").addEventListener("click", () => {
  let registros = JSON.parse(localStorage.getItem("usuarios")) || [];

  if (registros.length === 0) {
    alert("No hay datos para borrar ❗");
    return;
  }

  localStorage.removeItem("usuarios");
  datosMostrados.innerHTML = "";
  alert("Todos los datos han sido borrados ❌");
});

// Limpiar formulario
document.getElementById("limpiar").addEventListener("click", () => {
  barraProgreso.style.width = "0%";
});
