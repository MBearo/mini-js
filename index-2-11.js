//如果不重复，貌似可以重复
function find(source, pattern) {
    const result = -1
    const sourceArr = source.split('')
    const patternArr = pattern.split('')
    for (let i = 0; i < sourceArr.length; i++) {
        for (let j = 0; j < patternArr.length; j++) {
            if (patternArr[i + j] !== sourceArr[j]) {
                break // 结束循环是结束的子串的遍历，让主串往下走一个
            } else {
                return i
            }
        }
    }
    return result
}
// console.log(find('hello world cccc', 'world'))

function find2(source, pattern) {
    const sourceArr = source.split('')
    const patternArr = pattern.split('')
    let i = 0
    let j = 0
    while (i < sourceArr.length && j < patternArr.length) {
        if (sourceArr[i] === patternArr[j]) {
            i++
            j++
        } else {
            i = i - j + 1 // 不能 i++ ，因为可能已经匹配一部分，需要从头开始
            j = 0
        }
    }
    if (j === patternArr.length) {
        return i - j
    } else {
        return -1
    }
}
/**
 * 
 * source  abababc
 * pattern ababc
 * next    00012     回退到的索引位置
 */
function find3(source, pattern) {
    let i = 0
    let j = 0
    const next = [0, 0, 0, 1, 2]
    while (i < source.length && j < pattern.length) {
        if (source[i] === pattern[j]) {
            i++
            j++
        } else {
            if (j === 0) {
                i++
            } else {
                j = next[j]
            }
        }
    }
    if (j === pattern.length) {
        return i - j
    } else {
        return -1
    }
}

console.log(find3('abababc', 'ababc'))
// ababcababab
//          ababcababab
// 001201234 为啥最后是34不是12 -> 3是aba，4是abab，还是在找最长公共前后缀的长度
// next 是pattern和pattern比
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

const demo = 'aabcde'
const EOF = Symbol('EOF')

function check(str) {
    // 状态机，每个状态都是一个机器，每个机器都包含输入输出以及转移关系
    let state = start
    for (const char of str.split('').concat(EOF)) {
        console.log(state, char)
        state = state(char)
    }
    if (state === success) {
        return true
    }
    return false
}

const pattern = 'abcde'
const states = [start]
const next = getNext(pattern)
for (let i = 0; i < 5; i++) {
    states.push(stateFunc(pattern[i], i + 1, next[i]))
}

console.log(check(demo))

// 写死了找abcde
function start(char) {
    if (char === EOF) {
        return success
    }
    if (char === pattern[0]) {
        return states[1]
    } else {
        return start
    }
}
function stateFunc(nextChar, stateIndex, redirectIndex) {
    return (char) => {
        // if (char === EOF) {
        //     return fail
        // }
        if (char === nextChar) {
            return states[stateIndex]
        } else {
            return states[redirectIndex](char)
        }
    }
}
// function startA(char) {
//     if (char === EOF) {
//         return fail
//     }
//     if (char === 'a') {
//         return startB
//     } else {
//         return start
//     }
// }
// function startB(char) {
//     if (char === EOF) {
//         return fail
//     }
//     if (char === 'b') {
//         return startC
//     } else {
//         return start
//     }
// }
// function startC(char) {
//     if (char === EOF) {
//         return fail
//     }
//     if (char === 'c') {
//         return startD
//     } else {
//         return start
//     }
// }
// function startD(char) {
//     if (char === EOF) {
//         return fail
//     }
//     if (char === 'd') {
//         return startE
//     } else {
//         return start
//     }
// }
// function startE(char) {
//     if (char === EOF) {
//         return fail
//     }
//     if (char === 'e') {
//         return success
//     } else {
//         return start
//     }
// }
function fail() {
    throw new Error('fail')
}
function success() {
    throw new Error('success')
}