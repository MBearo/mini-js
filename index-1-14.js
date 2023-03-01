// 下面的是 mealy 型状态机，return 下一个状态和输入的值有关系
// 还有 moore 状态机，可以在里面处理，但是return只能有一个

const demo = '0123.9'
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
    if (char === EOF) {
        return fail
    }
    if (char === '-') {
        return afterMinus
    } else if (char === '0') {
        return afterZero
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
    if (char === EOF) {
        return fail
    }
    // 判断是不是0开头的数，012不合法，0.1可以
    if (char === '0') {
        return afterZero
    } else if (isNumber(char)) {
        return afterNumber
    } else if (char === '.') {
        return afterDot
    } else {
        return fail
    }
}
function afterNumber(char) {
    if (char === EOF) {
        return success
    }
    if (isNumber(char)) {
        return afterNumber
    } else if (char === '.') {
        return afterDot
    } else {
        return fail
    }
}
function afterDot(char) {
    if (char === EOF) {
        return success
    }
    if (isNumber(char)) {
        return afterDot
    } else {
        return fail
    }
}
function afterZero(char) {
    if (char === EOF) {
        return success
    }
    if (char === '.') {
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

function find(source, pattern) {
    const sourceArr = source.split('')
    const patternArr = pattern.split('')
    let result = -1
    for (let i = 0; i < sourceArr.length; i++) {
        for (let j = 0; j < patternArr.length; j++) {
            if (sourceArr[i + j] !== patternArr[j]) {
                break
            } else {
                result = i
            }
        }
    }
    return result
}
console.log(find('hello world cccc', 'world'))
// 如果 pattern 中的元素不会重复，那么可以用 kmp 算法
// 1. 求出 pattern 的 next 数组
// 2. 用 next 数组来匹配
function getNext(pattern) {
    const next = [0]
    let j = 0
    for (let i = 1; i < pattern.length; i++) {
        while (j > 0 && pattern[i] !== pattern[j]) {
            j = next[j - 1]
        }
        if (pattern[i] === pattern[j]) {
            j++
        }
        next[i] = j
    }
    return next
}
function kmp(source, pattern) {
    const next = getNext(pattern)
    let j = 0
    for (let i = 0; i < source.length; i++) {
        while (j > 0 && source[i] !== pattern[j]) {
            j = next[j - 1]
        }
        if (source[i] === pattern[j]) {
            j++
        }
        if (j === pattern.length) {
            return i - j + 1
        }
    }
    return -1
}
