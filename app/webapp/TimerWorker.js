const _intervals = {};
this.onmessage = (e) => {
    let s = e.data;
    if (s.startsWith("timer")) {
        //setTimeout (timer0/1000)
        let delay = parseInt(s.substring(s.indexOf("/")+1), 10);
        let id = s.substring(0, s.indexOf("/"));
        setTimeout(() => {
            this.postMessage(id);
        }, delay);
    } else if (s.startsWith("interval")) {
        // setInterval (interval0/1000)
        let interval = parseInt(s.substring(s.indexOf("/")+1), 10);
        let id = s.substring(0, s.indexOf("/"));
        let callback = setInterval(() => {
            this.postMessage(id);
        }, interval);
        _intervals[id] = callback;
    } else if (s.startsWith("clear-interval")) {
        // clearInterval (clear-interval0)
        let id = s.substring(6);
        let callback = _intervals[id];
        clearInterval(callback);
        delete _intervals[id];
    }
};