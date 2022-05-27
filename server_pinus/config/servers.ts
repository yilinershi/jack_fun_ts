module.exports = {
    "development": {
        "connector": [
            { "id": "connector-server-1", "host": "127.0.0.1", "port": 3150, "clientHost": "127.0.0.1", "clientPort": 3010, "frontend": true, "args": " --inspect=10001" }
        ]
    },
    "production": {
        "connector": [
            { "id": "connector-server-1", "host": "127.0.0.1", "port": 3150, "clientHost": "127.0.0.1", "clientPort": 3010, "frontend": true, "args": " --inspect=10002" }
        ]
    }
}
