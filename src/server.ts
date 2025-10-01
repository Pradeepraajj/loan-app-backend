// src/server.ts
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import loanRoutes from './routes/loan.routes';
import dashboardRoutes from './routes/dashboard.routes'; // 1. Import

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/loan', loanRoutes);
app.use('/api/dashboard', dashboardRoutes); // 2. Use the routes

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});