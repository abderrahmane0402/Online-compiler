const fs = require("fs");

async function compile(code) {
  let result = null;
  result = await new Promise((resolve, reject) => {
    fs.writeFile("program.c", code, (err) => {
      if (err) reject(err);

      const gcc = spawn("gcc", ["program.c", "-o", "program"]);
      gcc.stderr.on("data", (data) => {
        console.error(data.toString());
        reject(data.toString());
      });

      gcc.on("close", () => {
        const program = spawn("./program");
        let finalData = "";
        program.stdout.on("data", (data) => {
          finalData += data.toString();
          resolve(finalData);
        });
      });
    });
  });
  return result;
}
module.exports = {
  compile,
};
