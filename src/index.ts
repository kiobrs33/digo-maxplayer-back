import './util/env.util';
import express from 'express';
import cors from 'cors';
import { AuthRoute } from './auth';
import { UserRoute } from './users';

const app = express();
const port = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', AuthRoute);
app.use('/api/user', UserRoute);

// Ruta principal `/api`
app.get('/api', (req, res) => {
  res.send('Bienvenido a la API principal de MAXPLAYER TV');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
