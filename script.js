const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const edad = document.getElementById("edad");
const barraProgreso = document.getElementById("barraProgreso");
const datosMostrados = document.getElementById("datosMostrados");
const verDatosBtn = document.getElementById("verDatos");

// Validación de email
function validarEmail(correo) {
  return /\S+@\S+\.\S+/.test(correo);
}

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

// Guardar información
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

  // Validación nombre
  if (!usuario.nombre) {
    document.getElementById("error-nombre").textContent = "⚠ El nombre es obligatorio.";
    valido = false;
  }

  // Validación email vacío
  if (!usuario.email) {
    document.getElementById("error-email").textContent = "⚠ El email es obligatorio.";
    valido = false;
  } 
  // Validación email incorrecto
  else if (!validarEmail(usuario.email)) {
    document.getElementById("error-email").textContent = "⚠ Correo inválido.";
    valido = false;
  }

  // Validación edad
  if (!usuario.edad) {
    document.getElementById("error-edad").textContent = "⚠ La edad es obligatoria.";
    valido = false;
  }

  // Si falla validación → cancelar
  if (!valido) return;

  // Guardar
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarios.push(usuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("✔ Usuario guardado correctamente.");

  document.getElementById("formUsuario").reset();
  barraProgreso.style.width = "0%";

  mostrarDatos();
});

// Mostrar y ocultar datos
verDatosBtn.addEventListener("click", () => {
  if (datosMostrados.style.display === "block") {
    datosMostrados.style.display = "none";
    verDatosBtn.textContent = "Ver Datos";
  } else {
    mostrarDatos();
    verDatosBtn.textContent = "Ocultar Datos";
  }
});

// Mostrar datos en pantalla
function mostrarDatos() {
  let registros = JSON.parse(localStorage.getItem("usuarios")) || [];

  if (registros.length === 0) {
    alert("⚠ No hay datos para mostrar.");
    datosMostrados.style.display = "none";
    verDatosBtn.textContent = "Ver Datos";
    return;
  }

  datosMostrados.innerHTML = "";
  datosMostrados.style.display = "block";

  registros.forEach((reg, index) => {
    let div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
      <p><strong>#${index + 1}</strong></p>
      <p><strong>Nombre:</strong> ${reg.nombre}</p>
      <p><strong>Email:</strong> ${reg.email}</p>
      <p><strong>Edad:</strong> ${reg.edad}</p>

      <button class="eliminarIndividual" onclick="eliminarRegistro(${index})">
        🗑 Eliminar
      </button>
      <hr>
    `;

    datosMostrados.appendChild(div);
  });
}

// Eliminar un registro individual
function eliminarRegistro(i) {
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarios.splice(i, 1);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("🗑 Registro eliminado.");
  mostrarDatos();
}

// Borrar todos los datos
document.getElementById("borrar").addEventListener("click", () => {
  let registros = JSON.parse(localStorage.getItem("usuarios")) || [];

  if (registros.length === 0) {
    alert("⚠ No hay datos que borrar.");
    return;
  }

  localStorage.removeItem("usuarios");
  datosMostrados.innerHTML = "";
  datosMostrados.style.display = "none";
  verDatosBtn.textContent = "Ver Datos";

  alert("🗑 Todos los datos fueron eliminados.");
});

// Limpiar formulario
document.getElementById("limpiar").addEventListener("click", () => {
  barraProgreso.style.width = "0%";

  // borrar mensajes de error
  document.getElementById("error-nombre").textContent = "";
  document.getElementById("error-email").textContent = "";
  document.getElementById("error-edad").textContent = "";
});
