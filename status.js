const { exec } = require('child_process');

exec('pm2 jlist', (error, stdout, stderr) => {
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

    // Parsing output JSON dan menampilkan informasi yang diinginkan
    const processes = JSON.parse(stdout);
    const filteredProcesses = processes.map(item => {
        return {
            id: item.pm_id,
            name: item.name,
            memory: item.monit.memory,
            cpu: item.monit.cpu,
            status: item.pm2_env.status,
            datetime: item.pm2_env.created_at,
        };
    });

    console.log(JSON.stringify({
        status: false,
        message: "success",
        data: filteredProcesses
    }))
});