const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// 4. Endpoint: Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'El API está funcionando correctamente' });
});

// 5. Endpoint: Información de los Integrantes
app.get('/api/info', (req, res) => {
  res.json({
    integrantes: [
      {
        carnet: '00064825',
        ciudad: 'San Salvador',
        carrera: 'Ingeniería Informática',
        proyectosRealizados: 6
      },
      {
        carnet: '00063925',
        ciudad: 'Santa Tecla',
        carrera: 'Ingeniería Informática',
        proyectosRealizados: 7
      }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});