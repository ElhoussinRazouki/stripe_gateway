import express from 'express';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import { router } from './routes/app.route';
import { webHookRouter } from './routes/webhook.route';

dotenv.config();

// server setup
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

//middlewares
app.use(cors({origin: '*'}));
app.use('/webhook', webHookRouter)
app.use(express.json());
app.use('/api/', router);

// default route
app.get('/', function (req, res) {
  res.redirect('/api/');
});





server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});