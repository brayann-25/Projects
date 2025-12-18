import React, { StrictMode } from "react"; // Importamos React y StrictMode para ayudar a detectar problemas en la aplicación

import { createRoot } from "react-dom/client"; // Creamos el root de la aplicación

import { App } from "./App.jsx"; // Importamos nuestro componente App

import "./index.css"; // Importamos los estilos globales de la aplicación

import "./xFollowCard.jsx"; // Importamos el componente xFollowCard

/* 
  * PascalCase -> para los componentes de React
  * camelCase -> variables y funciones
  * kebab-case -> archivos y carpetas
  * snake_case -> bases de datos
*/

const root = createRoot(document.getElementById("root")); // Seleccionamos el elemento root del HTML donde montaremos nuestra aplicación

root.render(<App />);
