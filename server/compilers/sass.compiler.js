import sass from "node-sass";

export default (code) => {
  let result = { status: true, compiledCode: "", err: "" };
  try {
    result.compiledCode = sass
      .renderSync({
        data: code,
        indentedSyntax: true,
        indentedSyntax: true,
        outputStyle: "expanded",
      })
      .css.toString();
  } catch (e) {
    result.status = false;
    result.err = `Sass Compiler Error: Line ${e.line}, column ${e.column}, ${e.message}`;
  }

  return result;
};
