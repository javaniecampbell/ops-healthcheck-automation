const { spawn, exec, execFile } = require('child_process');



const executeWithSpawn = (command, args = [], options = { cwd: process.cwd() }) => {

    return new Promise((resolve, reject) => {
        let result = '';
        const child = spawn(command, [...args], options);

        child.stdout.on('data', (data) => {
            result += data.toString();
        });

        child.stderr.on('data', (data) => {
            reject(data.toString());
        });

        child.on('close', (code, signal) => {
            if (code !== 0) {
                reject(`git status exited with code ${code}`);
            }
            if (signal) {
                reject(`git status was killed with signal ${signal}`);
            }
            resolve(result);
        });


    })
};

const executeWithExec = (command, options = { cwd: process.cwd() }) => {
    return new Promise((resolve, reject) => {
        exec(command, options, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            }
            if (stderr) {
                reject(stderr);
            }
            resolve(stdout);

        });
    })
};


const executeWithExecFile = (commandFileOrScriptFile, args = [], options = { cwd: process.cwd() }) => {
    return new Promise((resolve, reject) => {
        execFile(commandFileOrScriptFile, [...args], options, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            }
            if (stderr) {
                reject(stderr);
            }
            resolve(stdout);

        });
    })
};


module.exports = { executeWithSpawn, executeWithExec, executeWithExecFile };  