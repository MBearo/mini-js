
let reg = /(\+|\-|\*|\/)|(?:[1-9][0-9]{0,}(?:\.[0-9]+){0,1}|0\.[0-9]{1,}|0)/g
let str = '1+2*3'

let words = []
while (r = reg.exec(str)) {
    if (r[1]) {
        words.push({
            value: r[0],
            type: r[1]
        })
    } else {
        words.push({
            value: r[0],
            type: 'number'
        })
    }
}
words.push({
    type: 'EOF'
})
// LL 处理四则运算
/**
    <multiplicativeExpression> ::= <number> | <multiplicativeExpression> * <number> | <multiplicativeExpression> / <number>
    <additiveExpression> ::= <multiplicativeExpression> | <additiveExpression> + <multiplicativeExpression> | <additiveExpression> - <multiplicativeExpression>
    <expression> ::= <additiveExpression>
 */
// 1+2 先要把1转成一个multiplicativeExpression
function multiplicativeExpression(words) {
    // 如果是number了，只能是number
    if (words[0].type === 'number') {
        const symbol = {
            type: 'multiplicativeExpression',
        }
        symbol.children = words.splice(0, 1, symbol)
        // 把自己包成一个multiplicativeExpression，然后就可以递归了
        multiplicativeExpression(words)
    }
    if (words[0].type === 'multiplicativeExpression') {
        if (['+', '-', 'EOF'].includes(words[1].type)) {
            return
        }
        const symbol = {
            type: 'multiplicativeExpression',
        }
        symbol.children = words.splice(0, 3, symbol)
    }
}
function additiveExpression(words) {
    if (words[0].type === 'number') {
        multiplicativeExpression(words)
        additiveExpression(words)
    } else if (words[0].type === 'multiplicativeExpression') {
        const symbol = {
            type: 'additiveExpression',
        }
        symbol.children = words.splice(0, 1, symbol);
        additiveExpression(words);
    } else if (words[0].type === 'additiveExpression') {
        // 这里为啥能是EOF呢？
        if (words[1].type === 'EOF') {
            return
        } else {
            // 拿出来前两个
            let children = words.splice(0, 2)
            multiplicativeExpression(words)
            children.push(words.shift())
            const symbol = {
                type: 'additiveExpression',
                children
            }
            words.unshift(symbol)
            additiveExpression(words)
        }
    }
}
function expression(source) {
    return additiveExpression(source)
}
expression(words)
console.log(JSON.stringify(words, null, 2))