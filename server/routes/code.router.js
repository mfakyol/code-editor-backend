import express from "express";
import config from "../config";
import checkJWT from "../middlewares/checkJWT";
import UserModel from "../models/User.model";
import CodeModel from "../models/Code.model";
const route = () => {
  const router = new express.Router();

  router.route("/").get(checkJWT, (req, res) => {
    const { codeId } = req.query;
    if (!codeId)
      return res.send({ status: false, message: "codeId required." });
    CodeModel.findOne({ _id: codeId })
      .then((code) => {
        if (!code)
          return res.send({ status: false, message: "Invalid codeId." });
        return res.send({ status: true, code });
      })
      .catch((e) => {
        res.send({ status: false, message: "Server error." });
      });
  });

  router.route("/").post(checkJWT, (req, res) => {
    const { apiKey } = req.token;
    UserModel.findOne({ apiKey })
      .then((userData) => {
        if (!userData)
          return res.send({ status: false, message: "Invalid user." });
        let code = new CodeModel(req.body);
        code.userId = userData._id;
        code.save().then((code) => {
          res.send({ status: true, code });
        });
      })
      .catch((e) => {
        res.send({ status: false, message: "Server Error." });
      });
  });

  router.route("/").put(checkJWT, (req, res) => {
    CodeModel.findOneAndUpdate({ _id: req.body.id }, { ...req.body })
      .then((code) => {
        if (!code)
          return res.send({ status: false, message: "Invalid codeId." });
        res.send({ status: true });
      })
      .catch((e) => res.send({ status: false, message: "Server error." }));
  });


  router.route("/codes").get(checkJWT, (req, res) => {
    const { apiKey } = req.token;
    UserModel.findOne({ apiKey })
      .then((user) => {
        if (!user) return res.send({ status: false, message: "Invalid user." });
        CodeModel.find({ userId: user._id, isDeleted: false}).then((codes) => {
          if (!codes)
            return res.send({ status: false, message: "Invalid codeId." });
          return res.send({ status: true, codes });
        });
      })
      .catch((e) => {
        res.send({ status: false, message: "Server error." });
      });
  });

  return router;
};

export default {
  route,
  routerPrefix: `${config.version}/code`,
};
