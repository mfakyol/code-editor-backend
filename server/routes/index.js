import ExampleRouter from "./example.router";
import CompileRouter from "./compile.router";
import AuthRouter from "./auth.router";
import CodeRouter from "./code.router";

const AppRoutes = (app) => {
  app.use(ExampleRouter.routerPrefix, ExampleRouter.route());
  app.use(CompileRouter.routerPrefix, CompileRouter.route());
  app.use(AuthRouter.routerPrefix, AuthRouter.route());
  app.use(CodeRouter.routerPrefix, CodeRouter.route());
};

export default AppRoutes;
