const { exec } = require('child_process');

const args2 = process.argv[2]; // stop or start
const args3 = process.argv[3];

exec(`pm2 ${args2} ${args3}`, (error, _, stderr) => {
    if (error) {
        console.log(JSON.stringify({
            status: false,
            message: error.message,
            data: []
        }))
        return;
    }
    if (stderr) {
        console.log(JSON.stringify({
            status: false,
            message: stderr,
            data: []
        }))
        return;
    }

    exec('node status.js', (error, stdout, stderr) => {
        if (error) {
            console.log(JSON.stringify({
                status: false,
                message: error.message,
                data: []
            }))
            return;
        }
        if (stderr) {
            console.log(JSON.stringify({
                status: false,
                message: stderr,
                data: []
            }))
            return;
        }

        console.log(stdout.split("\n").join(""))
    });
});
