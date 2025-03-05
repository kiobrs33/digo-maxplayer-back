import dotenv from 'dotenv';

// Configuración de dotenv
dotenv.config({
  path: '', // Especifica la ruta del archivo .env (por defecto busca en la raíz del proyecto)
  // encoding: 'utf8', // Define la codificación del archivo (por defecto es 'utf8')
  // debug: true, // Muestra mensajes en la consola si hay errores en la carga del archivo .env
  // override: true, // Permite sobrescribir variables de entorno ya definidas en el sistema
});

export default dotenv;
