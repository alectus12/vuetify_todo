import db from "../config/database.js";

export const getToDoList = (result) => {
  db.query(
    "SELECT * FROM to_do_lists WHERE status = 'ongoing' ",
    (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

export const getCompletedList = (result) => {
  db.query(
    "SELECT * FROM to_do_lists WHERE status = 'done' ",
    (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

export const getTodoById = (id, result) => {
  db.query("SELECT * FROM to_do_lists WHERE id = ?", [id], (err, results) => {
    if (err) {
      result(err, null);
    } else {
      result(null, results[0]);
    }
  });
};

export const inserToDo = (data, result) => {
  db.query("INSERT INTO to_do_lists SET ?", [data], (err, results) => {
    if (err) {
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const updateTodoById = (data, id, result) => {
  db.query(
    "UPDATE to_do_lists SET task_name = ?, details = ? WHERE id = ?",
    [data.task_name, data.details, data.id],
    (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

export const deleteToDoById = (id, result) => {
  db.query("DELETE FROM to_do_lists WHERE id = ?", [id], (err, results) => {
    if (err) {
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const completeTodoById = (data, id, result) => {
  db.query(
    "UPDATE to_do_lists SET status = ?, completed_date = ? WHERE id = ?",
    [data.status, data.completed_date, data.id],
    (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};
