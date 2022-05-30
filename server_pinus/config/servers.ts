module.exports = {
    "development": {
        "connector": [
            {
                "id": "connector-server-1",
                "host": "127.0.0.1",
                "port": 3201,
                "clientHost": "127.0.0.1",
                "clientPort": 3200,
                "frontend": true,
                "args": " --inspect=10001"
            },
            {
                "id": "connector-server-2",
                "host": "127.0.0.1",
                "port": 3301,
                "clientHost": "127.0.0.1",
                "clientPort": 3300,
                "frontend": true,
                "args": " --inspect=10002"
            }
        ],
        "gate": [
            {
                "id": "gate-server-1",
                "host": "127.0.0.1",
                "clientPort": 3500,
                "frontend": true,
                "args": " --inspect=10005"
            }
        ],
    },
    "production": {

    }
}
