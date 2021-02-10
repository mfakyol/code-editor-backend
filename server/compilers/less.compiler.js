import less from "less";

export default (code) => {
  let result = { status: true, compiledCode: "", err: "" };

  less.render(code, {}, (err, data) => {
    if (err) {
      result.err = `Less Compiler Error: line ${err.line}, index ${err.index} ${err.message}`;
      return
    }
    result.compiledCode = data.css;
  });
  return result
};
