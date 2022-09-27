const chalk = require("chalk");

module.exports = {
    name: "connected",
    execute() {
        console.log(chalk.green(`[Database Status]${(new Date(Date.now())).toString().substr(4,20)}: Connected.`));
    }
}