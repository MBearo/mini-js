/**
 *  application    引用层
 *  transport layer   传输层
 *  internet protocol   IP 协议
 *  network interface   网络 mac
 *  physical layer   物理层
 */

const net = require('node:net')
const stream = require('node:stream')

const client = net.createConnection({ port: 8080 }, () => {
    console.log('connected to server!')
    client.write('GET / HTTP/1.1\r\n')
    client.write('Host: 127.0.0.1\r\n')
    client.write('\r\n')
})
client.on('data', (data) => {
    console.log(data.toString())
    parse(data.toString())
    console.log(response)
    client.end()
})
client.on('end', () => {
    console.log('disconnected from server')
})

const response = {
    statusCode: '',
    statusText: '',
    headers: {},
    body: ''
}
let currentHeaderName = ''
let currentHeaderValue = ''

const EOF = Symbol('EOF')

function parse(str) {
    let state = start
    for (const char of str.split('')) {
        state = state(char)
    }
    return state === success
}
function start(char) {
    if (char === ' ') {
        return statusCode
    } else {
        return start
    }
}
function statusCode(char) {
    if (char === ' ') {
        return statusText
    } else {
        response.statusCode += char
        return statusCode
    }
}
function statusText(char) {
    if (char === '\r') {
        return httpLineBreak
    } else {
        response.statusText += char
        return statusText
    }
}
function httpLineBreak(char) {
    if (char === '\n') {
        return headerName
    } else {
        return httpLineBreak
    }
}
function headerName(char) {
    if (char === ':') {
        return headerNameAfter
    } else if (char === '\r') {
        return headerEndLineBreak
    } else {
        currentHeaderName += char
        return headerName
    }
}
function headerNameAfter(char) {
    if (char === ' ') {
        return headerNameAfter
    } else {
        return headerValue(char)
    }
}
function headerValue(char) {
    if (char === '\r') {
        response.headers[currentHeaderName] = currentHeaderValue
        currentHeaderName = ''
        currentHeaderValue = ''
        return headerLineBreak
    } else {
        currentHeaderValue += char
        return headerValue
    }
}
function headerLineBreak(char) {
    if (char === '\n') {
        return headerName
    } else {
        return headerLineBreak
    }
}
function headerEndLineBreak(char) {
    if (char === '\n') {
        response.body = new stream.Writable()
        return body
    } else {
        return headerEndLineBreak
    }
}
function body(char) {
    response.body.write(char)
    return body
}
function afterText(char) {
    return afterText
}
function success(char) {
    return success
}
