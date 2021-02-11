import * as babel from "@babel/core";

export default (code) => {
  let result = { status: true, compiledCode: "", err: "" };
  try {
    result.compiledCode = babel.transform(code, {
      plugins: ["@babel/plugin-transform-typescript"],
    }).code;
  } catch (e) {
    result.status = false;
    result.err = `Typescript Compiler Error: line: ${e.loc.line} column: ${e.loc.column}`;
  }

  return result;
};
