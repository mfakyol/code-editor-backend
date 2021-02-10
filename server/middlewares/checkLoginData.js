import validateEmail from "../helpers/validateEmail";

export default async function (req, res, next) {
  const { email, password } = req.query;
  if (!email  || !password)
    return res.send({
      status: false,
      message: "Email and password required.",
    });
  if (!validateEmail(email))
    return res.send({ status: false, message: "Invalid email." });
  next();
}
