module.exports = class Client {

    constructor(socket, nickname) {
        this.socket = socket;
        this.nickname = nickname;
    }
}
