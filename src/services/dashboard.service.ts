// src/services/dashboard.service.ts

import  pool  from '../config/database';

export const fetchDashboardData = async (userId: number) => {
  // 1. The query now selects the correct column names from your database:
  // 'organization_name' and 'role_course'.
  const userQuery = 'SELECT id, full_name, email, contact_number, organization_name, role_course FROM users WHERE id = ?';
  const [userRows]: any = await pool.execute(userQuery, [userId]);

  if (userRows.length === 0) {
    throw new Error('User not found');
  }

  const userFromDb = userRows[0];

  // This query for loans is already correct.
  const loansQuery = 'SELECT id, amountRequested, loanType, status, createdAt FROM loans WHERE user_id = ? ORDER BY createdAt DESC';
  const [loanRows]: any = await pool.execute(loansQuery, [userId]);

  // 2. The mapping now correctly reads from the database results (e.g., userFromDb.organization_name)
  // and assigns them to the desired camelCase names for the JSON response.
  const dashboardData = {
    userDetails: {
      id: userFromDb.id,
      fullName: userFromDb.full_name,
      email: userFromDb.email,
      contactNumber: userFromDb.contact_number,
      institutionName: userFromDb.organization_name, // Correctly reads from organization_name
      course: userFromDb.role_course,               // Correctly reads from role_course
    },
    loanApplications: loanRows,
  };

  return dashboardData;
};