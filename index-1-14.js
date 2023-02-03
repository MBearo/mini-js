const demo = '123.9'
const EOF = Symbol('EOF')
console.log(check(demo))
function check(str) {
    // 状态机，每个状态都是一个机器，每个机器都包含输入输出以及转移关系
    let state = start
    for (const char of str.split('').concat(EOF)) {
        console.log(state.name, char)
        state = state(char)
    }
    if (state === success) {
        return true
    }
    return false
}

function start(char) {
    if (char === '-') {
        return afterMinus
    } else if (isNumber(char)) {
        return afterNumber
    } else if (char === '.') {
        return afterDot
    } else {
        return fail
    }
}
// 0-9或者点
function afterMinus(char) {
    if (isNumber(char)) {
        return afterNumber
    } else if (char === '.') {
        return afterDot
    } else {
        return fail
    }
}
function afterNumber(char) {
    if (isNumber(char)) {
        return afterNumber
    } else if (char === '.') {
        return afterDot
    } else {
        return fail
    }
}
function afterDot(char) {
    // 为啥EOF在这里写
    if (char === EOF) {
        return success
    } else if (isNumber(char)) {
        return afterDot
    } else {
        return fail
    }
}

function fail(char) {
    return fail
}
function success(char) {
    throw new Error('success')
}
function isNumber(char) {
    return 48 <= char.charCodeAt(0) && char.charCodeAt(0) <= 57
}