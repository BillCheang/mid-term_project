import { Router } from "express";
import { createOneMsg, deleteOneMsg, getAllMsg } from "./handlers.js";

const router = Router();
router.get(`/`, getAllMsg);
router.post(`/createOne`, createOneMsg);
router.get(`/deleteOne`, deleteOneMsg);
export default router;
