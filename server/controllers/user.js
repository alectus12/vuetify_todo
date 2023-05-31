import { checkExistingUSer, insertUser } from "../models/UserModel.js";
import md5 from "md5";

export const createUser = (req, res) => {
  const data = req.body;

  checkExistingUSer(data.user_name, (err, results) => {
    if (err) {
      res.json({
        success: false,
        message: "There was a problem encountered. Please Try Again",
      });
    } else {
      if (results.length > 0) {
        res.json({
          success: false,
          message: "User Already Exist",
        });
      } else {
        data.password = md5(data.password);
        insertUser(data, (err, results) => {
          if (err) {
            res.json({
              success: false,
              message: "There was a problem encountered. Please Try Again",
            });
          } else {
            res.json({
              success: true,
              message: "Success Saving User!",
            });
          }
        });
      }
    }
  });
};

export const loginUser = (req, res) => {
  const data = req.body;

  checkExistingUSer(data.user_name, (err, results) => {
    if (err) {
      res.json({
        success: false,
        message: "There was a problem encountered. Please Try Again",
      });
    } else {
      if (results.length > 0) {
        if (results[0].password == md5(data.password)) {
          res.json({
            success: true,
            message: "Login Success!",
            authenticate: "true",
          });
        } else {
          res.json({
            success: false,
            message: "Username / Password does not match",
          });
        }
      } else {
        res.json({
          success: false,
          message: "User Do Not exist!",
        });
      }
    }
  });
};
