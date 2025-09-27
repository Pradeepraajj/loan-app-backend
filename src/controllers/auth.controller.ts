// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import * as AuthService from '../services/auth.service';
import { registerSchema, loginSchema } from '../validations/user.schema';

export const register = async (req: Request, res: Response) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const result = await AuthService.registerUser(value);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(409).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { identifier, password } = value;
    const result = await AuthService.loginUser(identifier, password);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};