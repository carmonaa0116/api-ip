const express = require("express");
const os = require("os");

const app = express();
const port = process.env.PORT || 3000;

// Función para obtener la IP privada
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (let iface of Object.values(interfaces)) {
    for (let config of iface) {
      if (config.family === "IPv4" && !config.internal) {
        return config.address;
      }
    }
  }
  return "No se encontró IP privada";
}

// Ruta para obtener la IP privada
app.get("/get-ip", (req, res) => {
  res.json({ ip: getLocalIP() });
});

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor Node.js funcionando correctamente");
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
