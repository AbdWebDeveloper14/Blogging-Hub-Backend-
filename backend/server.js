import dns from "dns";
dns.setServers(['1.1.1.1', '8.8.8.8']);

import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import blogRoutes from './routes/blogRoutes.js'; 

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogRoutes); 

app.get('/', (req, res) => {
  res.send('Blogging Platform API is running successfully...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});


module.exports = app;