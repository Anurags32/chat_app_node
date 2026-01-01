import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {getUsersForSidebar,getMessage, sentMessage } from "../controller/message.controller.js";

const routes = express.Router();

routes.get("/users",protectRoute,getUsersForSidebar);
routes.get("/:id",protectRoute,getMessage);
routes.post("/send/:id",protectRoute,sentMessage);

export default routes;
