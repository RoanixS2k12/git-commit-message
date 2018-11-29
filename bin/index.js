#!/usr/bin/env node

const program = require('commander');

const { prompt } = require('inquirer');

function formatMessage(message) {
    return `${message.charAt(0).toUpperCase()}${message.slice(1).toLowerCase()}`
}

function formatCommit({type, message, jira}) {
    return new Promise((resolve, reject) => {
        let commit = type;
        if(jira) {
            commit = `${commit}(EMC2-${jira})`
        }

        commit = `${commit}: ${formatMessage(message)}`
        resolve(commit);      
    })
}

program
    .version('0.0.1')
    .description('Git commit message - EMC² Version');


const questions = [
    {
        type: 'list',
        name: 'type',
        choices: [
            'feat',
            'tech',
            'fix',
            'refacto',
            'perf',
            'config',
            'tests',
            'gate',
            'glrd',
            'egg',
            'doc'
        ],
        message: 'What type is this commit'
    },
    { 
        type: 'input',
        name: 'jira',
        message: 'Enter the JIRA number',
        validate: (input) => { 
            // console.log(!Number.isNaN(parseInt(input)));
            return !Number.isNaN(Number(input))
        }
    },
    {
        type: 'input',
        name: 'message',
        message: 'Enter the commit message'
    }
];


// program
//     .command('commit-message <type> <message> [jira]')
//     .alias('cm')
//     .description('Commit with specified parameters')
//     .action((type, message, jira) => {

//     })

program
    .command('commit-message')
    .alias('cm')
    .description('Commit with specified parameters')
    .action(() => {
        prompt(questions)
            .then(answers => {
                formatCommit(answers)
                    .then(commit => console.log(`Commit message is : ${commit}`))
            })
    })


program
    .parse(process.argv);