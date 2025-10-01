import { Request, Response } from 'express';
import * as DashboardService from '../services/dashboard.service';

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const dashboardData = await DashboardService.fetchDashboardData(userId);
    res.status(200).json(dashboardData);
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch dashboard data', details: error.message });
  }
};