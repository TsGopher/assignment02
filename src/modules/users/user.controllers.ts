import { Request, Response } from "express";
import { userServices } from "./user.services";

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUsers();
    if (result.rows.length === 0) {
      return res.status(204).json({ success: true, message: "No Content" });
    } else {
      return res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        data: result.rows,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUser = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const result = await userServices.updateUser(req.params.id, req.body);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "User Updated Successfully",
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

const deleteUser = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const result = await userServices.deleteUser(req.params.id);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
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

export const userControllers = {
  getUsers,
  updateUser,
  deleteUser,
};
