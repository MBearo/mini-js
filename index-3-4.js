//LR 处理四则运算

let reg = /([1-9][0-9]{0,}|0\.[0-9]{0,})|(\+)|(\-)|(\*)|(\/)|([(])|([)])/g

let str = '(((1+2)*3)/4)'
/**
    <multiplicativeExpression> ::= <number> | <multiplicativeExpression> * <number> | <multiplicativeExpression> / <number>
    <additiveExpression> ::= <multiplicativeExpression> | <additiveExpression> + <multiplicativeExpression> | <additiveExpression> - <multiplicativeExpression>
    <expression> ::= <additiveExpression>
 */
function parseExpression(str) {
    let r
    const list = []
    while (r = reg.exec(str)) {
        list.push({
            type: r[1] ? 'number' : r[0],
            value: r[1] ?? r[0]
        })
    }
    list.push({
        type: 'EOF',
        value: 'eof'
    })
    console.log(list)
    const stack = []
    for (let i = 0; i < list.length; i++) {
        const char = list[i]
        let children = []
        if (char.type === ')') {
            let child
            while ((child = stack.pop()).value !== '(') {
                children.push(child)
            }
            const symbol = {
                type: 'expression',
                children
            }
            stack.push(symbol)
        } else {
            stack.push(char)
        }
    }
    console.log(JSON.stringify(stack, null, 2))
}
parseExpression(str)
