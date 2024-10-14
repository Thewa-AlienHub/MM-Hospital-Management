import express from "express";
import {
  deleteUser,
  getCurrentUser,
  getUserDetails,
  getUsers,
  signout,
  test,
  updateUser,
  updateIsPatient,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";


const router = express.Router();

router.get("/test", test);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/signout", signout);
router.get("/getusers", verifyToken, getUsers);
router.get("/:id", verifyToken, getUserDetails);

router.get("/currentUser", verifyToken, getCurrentUser);

router.put("/updatePatient/:userId", verifyToken, updateIsPatient);



export default router;
