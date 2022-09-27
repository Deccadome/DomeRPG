const chalk = require("chalk");

module.exports = {
    name: "connecting",
    execute() {
        console.log(chalk.cyan(`[Database Status]${(new Date(Date.now())).toString().substr(4,20)}: Connecting...`));
    }
}