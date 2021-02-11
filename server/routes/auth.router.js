import crypto from "crypto";
import express from "express";
import config from "../config";
import jwt from "jsonwebtoken";
import UserModel from "../models/User.model";
import CodeModel from "../models/Code.model";
import checkJWT from "../middlewares/checkJWT";
import checkLoginData from "../middlewares/checkLoginData";
import checkSignInData from "../middlewares/checkSignInData";
import checkActivationData from "../middlewares/checkActivationData";

const route = () => {
  const router = new express.Router();

  router.route("/").get(checkLoginData, (req, res) => {
    const { email, password } = req.query;
    UserModel.findOne(
      {
        email,
        password: crypto
          .createHmac("sha256", password)
          .update(config.hashSecret)
          .digest("base64"),
      },
      { apiKey: 1, status: 1 }
    )
      .then((userData) => {
        if (!userData)
          return res.send({
            status: false,
            message: "Invalid email or password",
          });
        else if (userData.status !== "A")
          return res.send({
            status: false,
            message: " Please activate your account first.",
          });
        else {
          return res.send({
            status: true,
            token: jwt.sign({ apiKey: userData.apiKey }, config.jwtSecret),
          });
        }
      })
      .catch((e) =>
        res.send({ status: false, message: "Server error occured." })
      );
  });

  router.route("/").post(checkSignInData, (req, res) => {
    const { email, fullName, password } = req.body;
    let user = new UserModel({
      email,
      fullName,
      password: crypto
        .createHmac("sha256", password)
        .update(config.hashSecret)
        .digest("base64"),
    });
    user
      .save()
      .then((userData) => {
        // Send activation link to email
        return res.send({
          status: true,
          message: `Registration successful. Please check ${userData.email} email address to activate your account.  http://localhost:3001/activation?email=${userData.email}&activationCode=${userData.activationCode}  `,
        });
      })
      .catch((err) => {
        if (err.code === 11000)
          return res.send({
            status: false,
            message: "This email already registered.",
          });
        return res.send({ status: false, message: "Server error occured." });
      });
  });

  router.route("/").put(checkActivationData, (req, res) => {
    const { email, activationCode } = req.body;
    UserModel.findOneAndUpdate(
      { email, activationCode },
      { activationCode: null, status: "A" },
      false
    )
      .then((response) => {
        if (!response)
          return res.send({
            status: false,
            message: "Invalid email or activation code.",
          });
        return res.send({ status: true, message: "Account activated." });
      })
      .catch((e) => {
        console.log(e);
      });
  });

  router.route("/getUser").get(checkJWT, (req, res) => {
    const { apiKey } = req.token;
    UserModel.findOne({ apiKey }, { fullName: 1, email: 1, _id: 1 })
      .then((user) => {
        if (!user)
          return res.send({ status: false, message: "Invalid api key." });


        CodeModel.find({userId: user._id, isDeleted:false},{title:1, id:1,lastModifiedDate:1})
        .then(codes => {
          delete user._doc._id
          return res.send({ status: true, user: {...user._doc, codes}});
        })

        
      })
      .catch(e => res.send({status: false, message:"Server Error."}))
  });

  return router;
};

export default {
  route,
  routerPrefix: `${config.version}/auth`,
};
