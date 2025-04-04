const express = require("express");
const os = require("os");

const app = express();
const port = process.env.PORT || 3000;

// Función para obtener la IP privada
function getIpPrivada() {
    const networkInterfaces = os.networkInterfaces();
    for (const iface in networkInterfaces) {
        for (const ifaceDetails of networkInterfaces[iface]) {
            if (ifaceDetails.family === 'IPv4' && !ifaceDetails.internal) {
                return ifaceDetails.address;
            }
        }
    }
    return 'IP privada no encontrada';
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
