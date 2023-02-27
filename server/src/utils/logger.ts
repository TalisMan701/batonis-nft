export class Logger {
    constructor(private logSource: string) {}

    log(msg: any) {
        try {
            let msgToLog = (typeof(msg) === 'object' ? JSON.stringify(msg) : msg);
            if (msgToLog) {
                msgToLog = msgToLog.replace(/(\r\n|\n|\r)/gm, "");
            }
            this.logMessage(console.log, 'INFO', msgToLog);
        } catch (err) {
            this.error('Error while logging');
            this.error(err);
            this.logMessage(console.log, 'INFO', msg);
        }
    };

    errorWithMsg(msg: any, err: any) {
        let errMsg = err;

        if (typeof err === 'object' && (err.stack || err.message)) {
            errMsg = 'Error occured with message ' + err.message + ' and stack ' + err.stack;
        }

        let finalMsg = typeof(errMsg) === 'string' 
            ? (msg + ' ||| ' + errMsg).replace(/(\r\n|\n|\r)/gm, "")
            : errMsg;

        this.logMessage(console.log, 'ERROR', finalMsg);
    };

    error(err: any) {
        let errMsg = err;

        if (typeof err === 'object' && (err.stack || err.message)) {
            errMsg = 'Error occured with message ' + err.message + ' and stack ' + err.stack;
        }

        let finalMsg = typeof(errMsg) === 'string' && !!errMsg
            ? errMsg.replace(/(\r\n|\n|\r)/gm, "")
            : errMsg;

        this.logMessage(console.log, 'ERROR', finalMsg);
    };

    logMessage(method: any, logLevel: any, message: any) {
       method(new Date().toISOString() 
            + ' | ' + logLevel 
            + ' | scheduler'
            + (this.logSource ? ' | ' + this.logSource : '')
            + ' | ' + message);
    }
}
