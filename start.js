const { exec } = require('child_process');

exec('pm2 start ~/monitoring-ore-mining/ecosystem.config.js --time', (error, _, stderr) => {
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

    exec('node ~/monitoring-ore-mining/status.js', (error, stdout, stderr) => {
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
