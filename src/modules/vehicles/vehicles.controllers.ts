import { Request, Response } from "express";
import { vehiclesService } from "./vehicles.services";

const createVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesService.createVehicles(req.body);
    const vehicles = result.rows[0];
    delete vehicles.created_at;
    delete vehicles.updated_at;

    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: vehicles,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesService.getVehicles();

    if (!result.rows.length) {
      return res.status(200).json({
        success: true,
        message: "No vehicles found",
        data: [],
      });
    }

    const vehicles = result.rows.map(
      ({ created_at, updated_at, ...vehicle }) => vehicle
    );

    return res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: vehicles,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getVehicle = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const result = await vehiclesService.getVehicle(req.params.id);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicles Not Found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicles Retrived Successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateVehicle = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const result = await vehiclesService.updateVehicle(req.params.id, req.body);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle Not Found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle Updated Successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteVehicle = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const result = await vehiclesService.deleteVehicle(req.params.id);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle Not Found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle deleted successfully",
      });
    }
  } catch (error: any) {
    if (error?.name === "ActiveBookingError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const vehiclesController = {
  createVehicles,
  getVehicles,
  getVehicle,
  updateVehicle,
  deleteVehicle,
};
