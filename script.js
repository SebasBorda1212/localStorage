const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const edad = document.getElementById("edad");
const barraProgreso = document.getElementById("barraProgreso");
const datosMostrados = document.getElementById("datosMostrados");
const btnVerDatos = document.getElementById("verDatos");

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

// Mostrar / Ocultar datos
btnVerDatos.addEventListener("click", () => {
  let registros = JSON.parse(localStorage.getItem("usuarios")) || [];

  if (registros.length === 0) {
    alert("No hay datos para mostrar ❗");
    return;
  }

  // Si ya están visibles → ocultarlos
  if (datosMostrados.style.display === "block") {
    datosMostrados.style.display = "none";
    btnVerDatos.textContent = "Ver Datos";
    return;
  }

  // Mostrar datos
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

  btnVerDatos.textContent = "Ocultar Datos";
});

// Borrar todo
document.getElementById("borrar").addEventListener("click", () => {
  let registros = JSON.parse(localStorage.getItem("usuarios")) || [];

  if (registros.length === 0) {
    alert("No hay datos para borrar ❗");
    return;
  }

  localStorage.removeItem("usuarios");
  datosMostrados.innerHTML = "";
  datosMostrados.style.display = "none";
  btnVerDatos.textContent = "Ver Datos";

  alert("Todos los datos han sido borrados ❌");
});


// Limpiar formulario
document.getElementById("limpiar").addEventListener("click", () => {
  barraProgreso.style.width = "0%";
});


