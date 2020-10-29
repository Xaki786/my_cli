const chalk = require("chalk");
const figlet = require("figlet");

module.exports = {
  title: () => {
    console.log(
      chalk.yellow(
        figlet.textSync("Zak_Cli", {
          horizontalLayout: "full",
        })
      ),
      "\n"
    );
  },
};
