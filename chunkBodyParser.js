
function* generateBody(str) {
    let lengthStr = ''
    let length = 0
    let body = ''
    let state = readLength
    for (let char of str) {
        state = state(char)
        if (body.length > 0) {
            yield body
            body = ''
        }
    }
    // body 开头是一个数字，表示 body 的长度，16进制
    function readLength(char) {
        if (char === '\r') {
            return beforeLineBreak
        } else {
            lengthStr += char
            return readLength
        }
    }
    function success(char) {
        return success
    }
    function beforeLineBreak(char) {
        length = parseInt(lengthStr, 16)
        lengthStr = ''
        if (char === '\n') {
            return readChunkState
        }
    }
    function readChunkState(char) {
        length--
        body += char
        if (length >= 0) {
            return readChunkState
        } else {
            return readLength
        }
    }
}
const str = `e\r
<h1>hello</h1>\r
0\r\n`
let body = generateBody(str)
for (let char of body) {
    console.log(char)
}