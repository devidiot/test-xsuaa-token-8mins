
let Timer = function() {
    this._seq = 0;
    this._timeouts = {};
    this._intervals = {};

    this.oWorker = new Worker("TimerWorker.js");
    this.oWorker.onmessage = (e) => {
        if (e.data.startsWith("timer")) {
            //TODO: Must be removed before production. 
            console.log('Worker timer:', e.data);
            const callback = this._timeouts[e.data];
            callback();
            delete this._timeouts[e.data];
        } else if (e.data.startsWith("interval")) {
            //TODO: Must be removed before production.
            console.log('Worker interval:', e.data);
            const callback = this._intervals[e.data];
            callback();
        }
    };
}

Timer.prototype = {

    setTimeout: function (callback, delay) {
        let iId = `timer${++this._seq}`;
        const sMsg = `${iId}-${delay}`;
        this._timeouts[iId] = callback;
        this.oWorker.postMessage(sMsg);
    },

    setInterval: function (callback, interval) {
        let iId = `interval${++this._seq}`;
        const sMsg = `${iId}-${interval}`;
        this._intervals[iId] = callback;
        this.oWorker.postMessage(sMsg);
        return iId;
    },

    clearInterval: function (id) {
        if (!!id) {
            this.oWorker.postMessage(`clear-${id}`);
            delete this._intervals[id];
        }
    }
}
