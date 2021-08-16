module.exports = {
    apps: [
        {
            name: 'app',
            script: 'npm',
            args: 'start',
            env: {
                NODE_ENV: 'production'
            }
        }
    ]
}