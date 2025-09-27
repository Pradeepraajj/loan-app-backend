// src/services/auth.service.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db';
import { RowDataPacket } from 'mysql2';

export const registerUser = async (userData: any) => {
  const { password, ...restOfUser } = userData;
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const connection = await pool.getConnection();
  try {
    const query = 'INSERT INTO users (full_name, date_of_birth, gender, contact_number, address, national_id, organization_name, role_course, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [
      restOfUser.fullName,
      restOfUser.dateOfBirth,
      restOfUser.gender,
      restOfUser.contactNumber,
      JSON.stringify(restOfUser.address),
      restOfUser.nationalId,
      restOfUser.organizationName,
      restOfUser.roleCourse,
      restOfUser.email,
      hashedPassword,
    ];
    
    await connection.execute(query, values);
    return { message: 'User registered successfully' };
  } catch (error: any) {
    // Handle duplicate entry errors
    if (error.code === 'ER_DUP_ENTRY') {
      throw new Error('Email, Contact Number, or National ID already exists.');
    }
    throw error;
  } finally {
    connection.release();
  }
};

export const loginUser = async (identifier: string, password: string) => {
  const connection = await pool.getConnection();
  try {
    const query = 'SELECT * FROM users WHERE email = ? OR contact_number = ?';
    const [rows] = await connection.execute<RowDataPacket[]>(query, [identifier, identifier]);
    
    if (rows.length === 0) {
      throw new Error('Invalid credentials');
    }
    
    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }
    
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: userPassword, ...userWithoutPassword } = user;
    
    return { user: userWithoutPassword, token };
  } finally {
    connection.release();
  }
};