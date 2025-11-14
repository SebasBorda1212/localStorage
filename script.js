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
    alert("Por favor ingrese un email válido.");
    return;
  }

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarios.push(usuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Datos guardados correctamente ✔");

  document.getElementById("formUsuario").reset();
  barraProgreso.style.width = "0%";
  mostrarDatos(); // Actualiza la vista si está abierta
});

// Mostrar / Ocultar datos
btnVerDatos.addEventListener("click", () => {
  let registros = JSON.parse(localStorage.getItem("usuarios")) || [];

  if (registros.length === 0) {
    alert("No hay datos para mostrar ❗");
    return;
  }

  if (datosMostrados.style.display === "block") {
    datosMostrados.style.display = "none";
    btnVerDatos.textContent = "Ver Datos";
    return;
  }

  mostrarDatos();
});

// Función que muestra los registros
function mostrarDatos() {
  let registros = JSON.parse(localStorage.getItem("usuarios")) || [];

  if (registros.length === 0) {
    datosMostrados.style.display = "none";
    btnVerDatos.textContent = "Ver Datos";
    return;
  }

  datosMostrados.innerHTML = "";
  datosMostrados.style.display = "block";
  btnVerDatos.textContent = "Ocultar Datos";

  registros.forEach((reg, index) => {
    let div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
      <p><strong>Nombre:</strong> ${reg.nombre}</p>
      <p><strong>Email:</strong> ${reg.email}</p>
      <p><strong>Edad:</strong> ${reg.edad}</p>

      <button class="eliminarIndividual" data-index="${index}">
        Eliminar este registro
      </button>
      <hr>
    `;

    datosMostrados.appendChild(div);
  });

  // Eventos de eliminar individual
  document.querySelectorAll(".eliminarIndividual").forEach(btn => {
    btn.addEventListener("click", (e) => {
      let i = e.target.getAttribute("data-index");

      let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      usuarios.splice(i, 1); // elimina 1 usuario en la posición i
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      alert("Registro eliminado ❌");

      mostrarDatos();
    });
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
  datosMostrados.style.display = "none";
  btnVerDatos.textContent = "Ver Datos";

  alert("Todos los datos fueron borrados ❌");
});

// Limpiar formulario
document.getElementById("limpiar").addEventListener("click", () => {
  barraProgreso.style.width = "0%";
});
