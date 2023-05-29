import {
  getTodoById,
  getToDoList,
  inserToDo,
  updateTodoById,
  deleteToDoById,
  completeTodoById,
  getCompletedList,
} from "../models/ToDoModel.js";

export const showToDoList = (req, res) => {
  getToDoList((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const showCompletedList = (req, res) => {
  getCompletedList((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const showToDoById = (req, res) => {
  getTodoById(req.param.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const createToDo = (req, res) => {
  const data = req.body;
  inserToDo(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const updateToDo = (req, res) => {
  const data = req.body;
  const id = req.param.id;
  updateTodoById(data, id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const deleteToDo = (req, res) => {
  const id = req.body.id;
  deleteToDoById(id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const completeToDo = (req, res) => {
  const data = req.body;
  const id = req.param.id;
  completeTodoById(data, id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
