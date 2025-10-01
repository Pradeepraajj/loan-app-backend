import Joi from 'joi';

export const loanApplicationSchema = Joi.object({
  amountRequested: Joi.number().positive().required(),
  loanType: Joi.string().valid('Education', 'Laptop', 'Hostel', 'Personal').required(),
  tenure: Joi.number().integer().positive().required(), // In months
  purpose: Joi.string().min(20).required(),
  guardianName: Joi.string().optional(),
  guardianOccupation: Joi.string().optional(),
  guardianAnnualIncome: Joi.number().positive().optional(),
  collateral: Joi.string().optional(),
});