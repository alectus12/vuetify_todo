import db from "../config/database.js";

export const checkExistingUSer = (data, result) => {
  db.query(
    "SELECT * FROM users WHERE user_name = ? ",
    [data],
    (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

export const insertUser = (data, result) => {
  db.query("INSERT INTO users SET ?", [data], (err, results) => {
    if (err) {
      result(err, null);
    } else {
      result(null, results);
    }
  });
};
