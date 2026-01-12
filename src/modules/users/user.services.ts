import { pool } from "../../config/db";

const getUsers = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

const updateUser = async (id: string, payload: Record<string, unknown>) => {
  const { name, email, phone, role } = payload;
  const result = await pool.query(
    `UPDATE users SET name=$1, email=$2, phone=$3, role=$4 WHERE id=$5 RETURNING *`,
    [name, email, phone, role, id]
  );
  return result;
};

const deleteUser = async (id: string) => {
  const activeBookings = await pool.query(
    `SELECT 1 FROM bookings WHERE customer_id = $1 AND status = 'active' LIMIT 1`,
    [id]
  );

  if (activeBookings.rowCount) {
    const error = new Error("User has active bookings");
    error.name = "ActiveBookingError";
    throw error;
  }

  const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
  return result;
};

export const userServices = {
  getUsers,
  updateUser,
  deleteUser,
};
