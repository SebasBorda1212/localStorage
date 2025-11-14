const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const edad = document.getElementById("edad");
const barraProgreso = document.getElementById("barraProgreso");
const datosMostrados = document.getElementById("datosMostrados");
const btnVerDatos = document.getElementById("verDatos");

// Validación email
function validarEmail(correo) {
  let expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return expresion.test(correo);
}

// Barra de progreso
function actualizarProgreso() {
  let campos = [nombre.value.trim(), email.value.trim(), edad.value.trim()];
  let llenos = campos.filter(c => c !== "").length;
  barraProgreso.style.width = (llenos / campos.length) * 100 + "%";
}

[nombre, email, edad].forEach(i => {
  i.addEventListener("input", actualizarProgreso);
});

// GUARDAR
document.getElementById("guardar").addEventListener("click", () => {

  // Reset errores
  document.getElementById("error-nombre").textContent = "";
  document.getElementById("error-email").textContent = "";
  document.getElementById("error-edad").textContent = "";

  let usuario = {
    nombre: nombre.value.trim(),
    email: email.value.trim(),
    edad: edad.value.trim()
  };

  let valido = true;

  // Validar nombre
  if (!usuario.nombre) {
    document.getElementById("error-nombre").textContent = "⚠ El nombre es obligatorio.";
    valido = false;
  }

  // Validar email vacío
  if (!usuario.email) {
    document.getElementById("error-email").textContent = "⚠ El email es obligatorio.";
    valido = false;
  }
  // Validar email formato
  else if (!validarEmail(usuario.email)) {
    document.getElementById("error-email").textContent = "⚠ Correo inválido.";
    valido = false;
  }

  // Validar edad
  if (!usuario.edad) {
    document.getElementById("error-edad").textContent = "⚠ La edad es obligatoria.";
    valido = false;
  }

  if (!valido) return;

  // Guardar en localStorage
  let lista = JSON.parse(localStorage.getItem("usuarios")) || [];
  lista.push(usuario);
  localStorage.setItem("usuarios", JSON.stringify(lista));

  alert("Datos guardados ✔");

  document.getElementById("formUsuario").reset();
  barraProgreso.style.width = "0%";

  if (datosMostrados.style.display === "block") mostrarDatos();
});

// MOSTRAR / OCULTAR DATOS
btnVerDatos.addEventListener("click", () => {
  if (datosMostrados.style.display === "block") {
    datosMostrados.style.display = "none";
    btnVerDatos.textContent = "Ver Datos";
  } else {
    mostrarDatos();
    btnVerDatos.textContent = "Ocultar Datos";
  }
});

// FUNCIÓN MOSTRAR DATOS
function mostrarDatos() {
  let registros = JSON.parse(localStorage.getItem("usuarios")) || [];

  if (registros.length === 0) {
    alert("No hay datos para mostrar.");
    return;
  }

  datosMostrados.style.display = "block";
  datosMostrados.innerHTML = "<h3>Usuarios Registrados</h3>";

  registros.forEach((reg, index) => {
    let div = document.createElement("div");
    div.classList.add("cardRegistro");

    div.innerHTML = `
      <p><strong>Nombre:</strong> ${reg.nombre}</p>
      <p><strong>Email:</strong> ${reg.email}</p>
      <p><strong>Edad:</strong> ${reg.edad}</p>
      <button class="btnEliminar" onclick="eliminar(${index})">Eliminar</button>
    `;

    datosMostrados.appendChild(div);
  });
}

// ELIMINAR INDIVIDUAL
function eliminar(i) {
  let registros = JSON.parse(localStorage.getItem("usuarios")) || [];
  registros.splice(i, 1);
  localStorage.setItem("usuarios", JSON.stringify(registros));
  mostrarDatos();
}

// BOTÓN BORRAR TODO
document.getElementById("borrar").addEventListener("click", () => {
  let datos = localStorage.getItem("usuarios");

  if (!datos) {
    alert("No hay datos que borrar.");
    return;
  }

  localStorage.removeItem("usuarios");
  datosMostrados.innerHTML = "";
  datosMostrados.style.display = "none";
  btnVerDatos.textContent = "Ver Datos";

  alert("Datos borrados ✔");
});

// LIMPIAR FORMULARIO
document.getElementById("limpiar").addEventListener("click", () => {
  barraProgreso.style.width = "0%";
});
