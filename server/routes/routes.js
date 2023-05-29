import express from "express";

import {
  showToDoList,
  showToDoById,
  createToDo,
  updateToDo,
  deleteToDo,
  completeToDo,
  showCompletedList,
} from "../controllers/todo.js";

const router = express.Router();

router.get("/to_do_list", showToDoList);

router.get("/completed_list", showCompletedList);

router.get("/to_do_list/:id", showToDoById);

router.post("/to_do_list", createToDo);

router.put("/to_do_list/:id", updateToDo);

router.put("/to_do_list/complete/:id", completeToDo);

router.post("/to_do_list/delete", deleteToDo);

export default router;
