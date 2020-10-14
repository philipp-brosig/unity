module.exports = class Session {

    sessionID;
    clients = [];

    constructor(host) {
        this.host = host;
    }

    addClient(client) {
        this.clients.push(client);
        console.log("I Joined");
    }



}
