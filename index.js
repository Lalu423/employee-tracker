const inquirer = require('inquirer');
const { table } = require('table');

const menu = function () {
    console.log("do stuff!")
}

const config = {
    border: {
        topBody: `─`,
        topJoin: `┬`,
        topLeft: `┌`,
        topRight: `┐`,

        bottomBody: `─`,
        bottomJoin: `┴`,
        bottomLeft: `└`,
        bottomRight: `┘`,

        bodyLeft: `│`,
        bodyRight: `│`,
        bodyJoin: `│`,

        joinBody: `─`,
        joinLeft: `├`,
        joinRight: `┤`,
        joinJoin: `┼`
    }
};

async function showTable(data) {
    let tableData = [];
    tableData = [Object.keys(data[0]), ...data.map(val => Object.values(val))];


    const answers = await inquirer.prompt([
        {
            message: "/n" + table(tableData, config),
            type: 'input',
            name: 'name'
        }
    ]);



}

const dbData = [
    { id: 1, name: "Jonathan" },
    { id: 2, name: "Andrew" },
    { id: 3, name: "Pete" },
    { id: 4, name: "Nick" }
]


const init = async function () {

    await showTable(dbData)
    menu();

}

init();