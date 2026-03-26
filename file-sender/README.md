# File Sender — Make Integration

Aplicación SPA en React + Vite para enviar archivos a un webhook de Make.

## 🚀 Inicio rápido

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar el webhook de Make
Abre `src/App.jsx` y reemplaza la URL del webhook en la línea 5:

```js
const MAKE_WEBHOOK_URL = 'https://hook.eu1.make.com/TU_ID_UNICO_AQUI'
```

### 3. Ejecutar en desarrollo
```bash
npm run dev
```

### 4. Compilar para producción
```bash
npm run build
```

---

## 📁 Estructura del proyecto

```
file-sender/
├── index.html
├── vite.config.js
├── package.json
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx
    ├── App.jsx          ← Lógica principal + constante MAKE_WEBHOOK_URL
    └── css/
        └── App.css      ← Todos los estilos
```

## ✅ Funcionalidades

- Selección de archivo mediante botón o **drag & drop**
- Filtrado por tipo: imágenes (`image/*`) y PDF
- Validación: botón deshabilitado hasta seleccionar archivo
- Envío asíncrono con `fetch` + `FormData`
- Estados UI: enviando / éxito / error
- Reset para enviar otro archivo

## 🔧 Stack

- React 18
- Vite 5
- CSS3 (sin librerías de UI externas)
