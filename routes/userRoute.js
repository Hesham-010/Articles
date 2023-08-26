const express = require("express");
const router = express.Router();
const authServices = require("../Services/authServices");
const {
  createUserValidation,
  updateUserValidation,
  changeMyPasswordValidation,
} = require("../validators/userValidator");
const {
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
} = require("../Services/userServices");

router.use(authServices.protect);

// Allow For Logged User
router.get("/getMe", getMyData);
router.put("/updateMe", updateUserValidation, updateMyData);
router.delete("/deleteMe", deleteMe);
router.put("/changeMyPassword", changeMyPasswordValidation, changeMyPassword);

// Allow For Admin
router.use(authServices.allowTo("admin"));
router
  .route("/")
  .get(getUsers)
  .post(uploadUserImage, resizeUserImage, createUserValidation, createOne);
router
  .route("/:id")
  .get(getUser)
  .put(uploadUserImage, resizeUserImage, updateUserValidation, updateUser)
  .delete(deleteUser);

module.exports = router;
