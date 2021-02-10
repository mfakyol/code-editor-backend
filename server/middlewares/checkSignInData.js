import validateEmail from "../helpers/validateEmail";

export default async function (req, res, next) {
  const { email, fullName, password } = req.body;
  if (!email || !fullName || !password)
    return res.send({
      status: false,
      message: "Email, full name and password required.",
    });
  if (!validateEmail(email))
    return res.send({ status: false, message: "Invalid email." });
  next();
}
