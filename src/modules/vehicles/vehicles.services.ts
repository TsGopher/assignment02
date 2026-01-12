import { pool } from "../../config/db";

const createVehicles = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  const result = await pool.query(
    `INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );

  return result;
};

const getVehicles = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`);
  return result;
};

const getVehicle = async (id: string) => {
  const result = pool.query(`SELECT * FROM vehicles WHERE id = $1`, [id]);
  return result;
};

const updateVehicle = async (id: string, payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  const result = await pool.query(
    `
  UPDATE vehicles
  SET
    vehicle_name = $1,
    type = $2,
    registration_number = $3,
    daily_rent_price = $4,
    availability_status = $5
  WHERE id = $6
  RETURNING *;
  `,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      id,
    ]
  );

  return result;
};

const deleteVehicle = async (id: string) => {
  const activeBookings = await pool.query(
    `SELECT 1 FROM bookings WHERE vehicle_id = $1 AND status = 'active' LIMIT 1`,
    [id]
  );

  if (activeBookings.rowCount) {
    const error = new Error("Vehicle has active bookings");
    error.name = "ActiveBookingError";
    throw error;
  }

  const result = await pool.query(`DELETE FROM vehicles WHERE id = $1`, [id]);
  return result;
};

export const vehiclesService = {
  createVehicles,
  getVehicles,
  getVehicle,
  updateVehicle,
  deleteVehicle,
};
