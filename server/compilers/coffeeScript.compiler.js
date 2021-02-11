import coffeeScript from "coffee-script";
export default (code) => {
  let result = { status: true, compiledCode: "", err: "" };
  try {
    result.compiledCode = coffeeScript.compile(code);
  } catch (e) {
    result.status = false;
    result.err = `CoffeeScript Compiler Error: line ${
      e.location.first_line + 1
    }, index ${e.location.first_column + 1}`;
  }

  return result;
};
