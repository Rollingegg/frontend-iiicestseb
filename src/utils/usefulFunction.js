function isEmpty(obj) {
    let hasOwnProperty = Object.prototype.hasOwnProperty;

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== 'object') return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

function fnDebounce(fn, delay) {
    let timer = null;
    return function () {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(fn, delay);
    }
}

function fnThrottle(method, delay) {
    // last为上一次触发回调的时间, timer是定时器
    let last = 0, timer = null
    // 将throttle处理结果当作函数返回

    return function () {
        // 保留调用时的this上下文
        let context = this
        // 保留调用时传入的参数
        let args = arguments
        // 记录本次触发回调的时间
        let now = +new Date()

        // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
        if (now - last < delay) {
            // 如果时间间隔小于我们设定的时间间隔阈值，则为本次触发操作设立一个新的定时器
            clearTimeout(timer)
            timer = setTimeout(function () {
                last = now
                method.apply(context, args)
            }, delay)
        } else {
            // 如果时间间隔超出了我们设定的时间间隔阈值，那就不等了，无论如何要反馈给用户一次响应
            last = now
            method.apply(context, args)
        }
    }
}

const usefulFunctions = {
    isEmpty,
    fnDebounce,
    fnThrottle
};

export default usefulFunctions;
