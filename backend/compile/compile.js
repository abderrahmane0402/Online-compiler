const { spawn } = require("child_process")
const fs = require("fs")

async function compile(code) {
  let result = null
  result = await new Promise((resolve, reject) => {
    fs.writeFile("./compile/program.c", code, (err) => {
      if (err) reject(err)
      let res = "",
        error = ""

      const gcc = spawn("gcc", [
        "./compile/program.c",
        "-o",
        "./compile/program",
      ])
      gcc.stderr.on("data", (data) => {
        error += data.toString()
      })

      gcc.on("close", () => {
        if (error != "") reject(error)
        console.log(123)
        const program = spawn("./compile/program")
        program.stdout.on("data", (data) => {
          console.log(data)
          res += data.toString()
        })

        program.on("close", () => {
          // console.log(res)
          resolve(res)
        })
      })
    })
  })
  return result
}
module.exports = {
  compile,
}
