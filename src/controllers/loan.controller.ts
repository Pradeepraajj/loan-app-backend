import { Request, Response } from 'express';
import * as LoanService from '../services/loan.service';
import { loanApplicationSchema } from '../validations/loan.schema';

export const applyForLoan = async (req: Request, res: Response) => {
  try {
    const { error, value } = loanApplicationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const userId = req.user.id;
    const loanApplication = await LoanService.createLoanApplication(userId, value);
    
    res.status(201).json({ 
        message: 'Loan application submitted successfully', 
        loanId: loanApplication.insertId 
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', details: error.message });
  }
};
