import mongoose from "mongoose";

mongoose.set('useFindAndModify', false);

const dbConnectionString = "mongodb+srv://dbadmin:NKSyjEKbSLL8KgKB@cluster0.h4oyj.mongodb.net/database?retryWrites=true&w=majority";

export default {
  version: "/api/v1",
  jwtSecret: "jwt-secret",
  hashSecret: "hash-secret"
};

export function connectDb() {
  mongoose
    .connect(dbConnectionString, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log("Connected db"))
    .catch((err) => console.log(err.message));
}
