const express = require("express");
const os = require("os");

const app = express();
const port = process.env.PORT || 10000;

// Función para obtener la IP privada que comienza con 192.168
function getIpPrivada() {
    const networkInterfaces = os.networkInterfaces();
    for (const iface in networkInterfaces) {
        for (const ifaceDetails of networkInterfaces[iface]) {
            if (ifaceDetails.family === 'IPv4' && !ifaceDetails.internal) {
                if (ifaceDetails.address.startsWith('192.168')) {
                    return ifaceDetails.address; // Devuelve la IP que comienza con 192.168
                }
            }
        }
    }
    return 'No se encontró una IP privada en el rango 192.168.x.x';
}

// Ruta para obtener la IP privada
app.get("/get-ip", (req, res) => {
  res.json({ ip: getIpPrivada() });
});

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor Node.js funcionando correctamente");
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
