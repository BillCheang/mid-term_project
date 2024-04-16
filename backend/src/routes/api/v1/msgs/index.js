import { Router } from "express";
import { createOneMsg, deleteOneMsg, getAllMsg } from "./handlers.js";
import auth from "../users/auth.js"
const router = Router();
router.get(`/`, getAllMsg);
router.post(`/create`, auth,createOneMsg);
router.post(`/delete`,auth, deleteOneMsg);
export default router;
