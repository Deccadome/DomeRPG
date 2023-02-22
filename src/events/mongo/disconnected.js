const chalk = require("chalk");

module.exports = {
    name: "disconnected",
    execute() {
        console.log(chalk.red(`[Database Status]${(new Date(Date.now())).toString().substr(4,20)}: Disconnected.`));
    }
}