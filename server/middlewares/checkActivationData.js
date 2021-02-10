import validateEmail from "../helpers/validateEmail";

export default async function (req, res, next) {
  const { email, activationCode } = req.body;
  if (!email || !activationCode)
    return res.send({
      status: false,
      message: "Email and activation code required.",
    });
  if (!validateEmail(email))
    return res.send({ status: false, message: "Invalid email." });

  const code = Number.parseInt(activationCode);
  if (activationCode.length !== 6 || !Number.isInteger(code) ||  code < 100000)
    return res.send({ status: false, message: "Invalid activation code." });
  next();
}
