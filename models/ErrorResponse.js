class ErrorResponse {
    constructor(status,msg){
        this.status = status;
        this.msg = msg;
    }
}

module.exports = ErrorResponse