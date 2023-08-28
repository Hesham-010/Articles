import express  from "express";
const router = express.Router();
import {protect,allowTo} from "../Services/authServices";
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

router.use(protect);

// Allow For Logged User
router.get("/getMe", getMyData);
router.put("/updateMe", updateUserValidation, updateMyData);
router.delete("/deleteMe", deleteMe);
router.put("/changeMyPassword", changeMyPasswordValidation, changeMyPassword);

// Allow For Admin
router.use(allowTo("admin"));
router
  .route("/")
  .get(getUsers)
  .post(uploadUserImage, resizeUserImage, createUserValidation, createOne);
router
  .route("/:id")
  .get(getUser)
  .put(uploadUserImage, resizeUserImage, updateUserValidation, updateUser)
  .delete(deleteUser);

export default router;
