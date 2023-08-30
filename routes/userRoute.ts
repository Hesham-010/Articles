import express  from "express";
const router = express.Router();
import { protect, allowTo } from "../Services/authServices";
import articleRoute from './articleRoute'
import {
  createUserValidation,
  updateUserValidation,
  changeMyPasswordValidation,
} from "../validators/userValidator";
import {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  createOne,
  getMyData,
  updateMyData,
  deleteMe,
  changeMyPassword,
  uploadUserImage,
  resizeUserImage,
} from "../Services/userServices";

router.use('/:userId/articles',articleRoute)

router.use(protect);

// Allow For Admin
router
  .route("/")
  .get(allowTo("admin"),getUsers)
  .post(allowTo("admin"),uploadUserImage, resizeUserImage, createUserValidation, createOne);
router
  .route("/:id")
  .get(allowTo("admin"),getUser)
  .put(allowTo("admin"),uploadUserImage, resizeUserImage, updateUserValidation, updateUser)
  .delete(allowTo("admin"),deleteUser);

  // Allow For Logged User
  
router.get("/getMe", getMyData);
router.put("/updateMe", updateUserValidation, updateMyData);
router.delete("/deleteMe", deleteMe);
router.put("/changeMyPassword", changeMyPasswordValidation, changeMyPassword);

export default router;
