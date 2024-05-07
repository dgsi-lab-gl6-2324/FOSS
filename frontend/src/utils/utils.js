export default function Validation(values) {
    const errors = {};
  
    // Validación del nombre
    if (!values.nombre) {
      errors.nombre = 'El nombre es requerido';
    } else if (values.nombre.length < 2) {
      errors.nombre = 'El nombre debe tener al menos dos letra';
    } else if (values.nombre.length > 30) {
      errors.nombre = 'El nombre no puede tener más de 30 letras';
    }
    
    // Validacion de apellido1
    if (!values.apellido1) {
      errors.apellido1 = 'El primer apellido es requerido';
    } else if (values.apellido1.length < 2) {
      errors.apellido1 = 'El apellido debe tener al menos dos letra';
    } else if (values.apellido1.length > 30) {
      errors.apellido1 = 'El apellido no puede tener más de 30 letras';
    }


    // Validación del email
    if (!values.email) {
      errors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'El email es inválido';
    }
    
    // Validacion de edad
    if (!values.edad) {
      errors.edad = 'La edad es requerida';
    } else if (values.edad < 5) {
      errors.edad = 'La edad mínima es 3 años';
    } else if (values.edad > 100) {
      errors.edad = 'La edad máxima es 120 años';
    }

    // Validacion de número de telefono
    if (!values.telefono) {
      errors.telefono = 'El teléfono es requerido';
    } else if (values.telefono.length < 9) {
      errors.telefono = 'El teléfono debe tener al menos 9 dígitos';
    } else if (values.telefono.length > 15) {
      errors.telefono = 'El teléfono no puede tener más de 15 dígitos';
    }

    // Validacion de direccion
    if (!values.direccion) {
      errors.direccion = 'La dirección es requerida';
    } else if (values.direccion.length < 5) {
      errors.direccion = 'La dirección debe tener al menos 5 caracteres';
    } else if (values.direccion.length > 50) {
      errors.direccion = 'La dirección no puede tener más de 50 caracteres';
    }

    // Validacion de ciudad
    if (!values.ciudad) {
      errors.ciudad = 'La ciudad es requerida';
    } else if (values.ciudad.length < 3) {
      errors.ciudad = 'La ciudad debe tener al menos 3 caracteres';
    } else if (values.ciudad.length > 30) {
      errors.ciudad = 'La ciudad no puede tener más de 30 caracteres';
    }

    // Validacion de provincia
    if (!values.provincia) {
      errors.provincia = 'La provincia es requerida';
    } else if (values.provincia.length < 3) {
      errors.provincia = 'La provincia debe tener al menos 3 caracteres';
    } else if (values.provincia.length > 30) {
      errors.provincia = 'La provincia no puede tener más de 30 caracteres';
    }

    // Validacion de equipo
    if (!values.equipo) {
      errors.equipo = 'El equipo es requerido';
    }

    console.log(errors);
    return errors;
}

export const categorias = {
  prebenjamin: "Prebenjamín (5-8 años)",
  benjamin: "Benjamín (9-10 años)",
  alevin: "Alevín (11-12 años)",
  infantil: "Infantil (13-14 años)",
  cadete: "Cadete (15-16 años)",
  juvenil: "Juvenil (17-19 años)",
  absoluta: "Absoluta (20+ años)"
}

export const tiposStaff = {
  entrenador: "Entrenador",
  entrenador2: "Segundo entrenador",
  entrenadorPorteros: "Entrenador de porteros",
  fisioterapeuta: "Fisioterapeuta",
  preparadorFisico: "Preparador físico",
  delegado: "Delegado"
}