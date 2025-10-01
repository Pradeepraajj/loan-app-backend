// src/services/loan.service.ts
import  pool  from '../config/database';

export const createLoanApplication = async (userId: number, details: any) => {
  // Destructure all possible fields from the details object
  const {
    amountRequested,
    loanType,
    tenure,
    purpose,
    guardianName,
    guardianOccupation,
    guardianAnnualIncome,
    collateral,
  } = details;

  const query = `
    INSERT INTO loans (user_id, amountRequested, loanType, tenure, purpose, guardianName, guardianOccupation, guardianAnnualIncome, collateral)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  // Pass the values to the query. For any optional field, if it's undefined,
  // use null instead. The '|| null' handles this perfectly.
  const [result]: any = await pool.execute(query, [
    userId,
    amountRequested,
    loanType,
    tenure,
    purpose,
    guardianName || null,
    guardianOccupation || null,
    guardianAnnualIncome || null,
    collateral || null,
  ]);
  
  return result;
};