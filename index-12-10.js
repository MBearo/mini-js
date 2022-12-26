const code = `
const demo3 = '1234567';
let r
while (r = reg3.exec(demo3)) {
    console.log(r)
}
`;

const keywordsReg = /(const|let|var|while)|(\n|[ ]|\t)|([a-zA-Z$_][a-zA-Z$_0-9]*)|(\(|\)|\{|\}|\.|=|;)|("[^"]*"|'[^']*')/g;

// console.log('abc'.match(/a(b)(c)/));

let r
let lastIndex = 0
while (r = keywordsReg.exec(code)) {
    const {
        0: str,
        1: keywords,
        2: whitespace,
        3: identifier,
        4: punctuator,
        5: stringLiteral,
        index
    } = r
    // console.log('str:', r)
    if (keywords) {
        console.log('keywords     :', r[1])
    } else if (r[2]) {
        console.log('whitespace   :', JSON.stringify(r[2]))
    } else if (r[3]) {
        console.log('identifier   :', r[3])
    } else if (r[4]) {
        console.log('punctuator   :', r[4])
    } else {
        console.log('stringLiteral:', r[5])
    }
    // if (lastIndex === index) {
    //     // console.log('不跳格')
    // } else {
    //     // console.log('跳格')
    // }
    // lastIndex = index + str.length
}
// console.log(keywords, whitespace, identifier, punctuator, string)