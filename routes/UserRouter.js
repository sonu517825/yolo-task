const express           = require("express");
const router            = express.Router();
const UserController    = require("../controllers/UserController");
const Middleware        = require('../middleware/Authenticate')

router.post("/signup", UserController.Signup);
router.post("/login", UserController.Login);
router.get("/logout", Middleware.Authenticate, UserController.Logout);

router.get("/profile", Middleware.Authenticate, UserController.Profile);
router.put("/update", Middleware.Authenticate, UserController.Update);
router.patch("/reset/username", Middleware.Authenticate, UserController.ResetUsername);
router.delete("/delete", Middleware.Authenticate, UserController.Delete);

module.exports = router;
