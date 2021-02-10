import "pug-filters";
import pug from "pug";

export default (template) => {
  let result = { status: true, compiledCode: "", err: "" };
  try {
    result.compiledCode = pug.render(template);
  } catch (e) {
    result.status = false;
    result.err = `Pug Compiler Error: Line ${e.line}, column ${e.column} ${e.msg}`;
  }
  return result;
};
