CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(255) NOT NULL,
  `date_of_birth` DATE NOT NULL,
  `gender` ENUM('Male', 'Female', 'Other') NOT NULL,
  `contact_number` VARCHAR(20) NOT NULL UNIQUE,
  `address` JSON NOT NULL,
  `national_id` VARCHAR(50) NOT NULL UNIQUE,
  `organization_name` VARCHAR(255) NOT NULL,
  `role_course` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE loans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    amountRequested DECIMAL(12, 2) NOT NULL,
    loanType VARCHAR(100) NOT NULL,
    tenure INT NOT NULL, -- Storing tenure in months
    purpose TEXT NOT NULL,
    guardianName VARCHAR(255),
    guardianOccupation VARCHAR(255),
    guardianAnnualIncome DECIMAL(15, 2),
    collateral TEXT,
    status ENUM('pending', 'approved', 'rejected', 'disbursed') NOT NULL DEFAULT 'pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);