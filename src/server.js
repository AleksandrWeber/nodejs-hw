// src/server.js
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import 'dotenv/config';
import helmet from 'helmet';


// import fs from "node:fs/promises";
// import path from "node:path";

const logger = pino({
 level: 'info',
 transport: {
    target: 'pino-pretty'
 }
});

const app = express();
const PORT = process.env.PORT ?? 3000;

const notes = [
  { id: '1', note: 'Home' },
  { id: '2', note: 'Work' },
  { id: '3', note: 'Sports' },
];

app.use(express.json());
app.use(logger);
app.use(cors());
app.use(helmet());

// // Логування часу
// app.use((req, res, next) => {
//  logger.info({ message: `Time: ${new Date().toLocaleString()}` });
//  next();
// });



// Маршрути
app.get('/', (req, res) => {
 res.status(200).json({ message: 'Hello, World!' });
});

app.get('/notes', (req, res) => {
 res.status(200).json({ message: 'Retrieved all notes' });
});

app.get('/notes/:noteId', (req, res) => {
 console.log(req.params.noteId);
 const note = notes.find((n) => n.id === req.params.noteId);
 if (!note) {
   return res.status(404).json({ message: 'Note not found' });
 }
 res.status(200).json({ message: `Retrieved note with ID: ${req.params.noteId}` });
});

// Маршрут для тестування middleware помилки
app.get('/test-error', (req, res) => {
 // Штучна помилка для прикладу
 throw new Error('Simulated server error');
});

// Middleware 404 (після всіх маршрутів)
app.use((req, res) => {
 res.status(404).json({ message: 'Route not found' });
});

// Middleware для обробки помилок
app.use((err, req, res, next) => {
  console.error(err);

  const isProd = process.env.NODE_ENV === "production";

  res.status(500).json({
    message: isProd
      ? "Something went wrong. Please try again later."
      : err.message,
 });
});

app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});


