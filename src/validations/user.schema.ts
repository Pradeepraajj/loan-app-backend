// src/validations/user.schema.ts
import Joi from 'joi';

export const registerSchema = Joi.object({
  fullName: Joi.string().min(3).required(),
  dateOfBirth: Joi.date().iso().required(),
  gender: Joi.string().valid('Male', 'Female', 'Other').required(),
  contactNumber: Joi.string().pattern(/^[0-9]{10,15}$/).required(),
  address: Joi.object({
    city: Joi.string().required(),
    state: Joi.string().required(),
    pincode: Joi.string().required(),
  }).required(),
  nationalId: Joi.string().min(5).required(),
  organizationName: Joi.string().required(),
  roleCourse: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
  identifier: Joi.string().required(), // Can be email or contactNumber
  password: Joi.string().required(),
});