import express from "express";

const router = express.Router();

router.post("/signup", (req, res) => {
  res.json({ message: "Signup endpoint" });
});
router.post("/login", (req, res) => {
  res.json({ message: "Login endpoint" });
});
router.post("/logout", (req, res) => {
  res.json({ message: "Logout endpoint" });
});
router.put("/updateProfile", (req, res) => {
  res.json({ message: "Update profile endpoint" });
});

export default router;