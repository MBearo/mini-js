/**
    1+2*3+4
    1+(2*3)+4
    遇到右括号要归约，术语是reduce
    LR是从左向右移入，从右向左归约
    
    从左向右找，找到一个状态，当前的stack无法和产生式匹配，那么就要归约

    <multiplicativeExpression> ::= <primaryExpression> | <multiplicativeExpression> * <primaryExpression> | <multiplicativeExpression> / <primaryExpression>
    <additiveExpression> ::= <multiplicativeExpression> | <additiveExpression> + <multiplicativeExpression> | <additiveExpression> - <multiplicativeExpression>
    <expression> ::= <additiveExpression>
    <primaryExpression> ::= <number> | ( <expression> )

    1 后面是 +，那么就要归约
    1 是一个 <primaryExpression>，可以归约成 <multiplicativeExpression>，然后归约成 <additiveExpression>，后面就可以 + 了。如果归约到最后还没有，那么就是不符合这个产生式了
    每一个状态都要判断接受那些字符串

    求 <expression> 的 closure
    <expression>                ::= <additiveExpression>
    <additiveExpression>        ::= <multiplicativeExpression> |
                                    <additiveExpression> + <multiplicativeExpression> | 
                                    <additiveExpression> - <multiplicativeExpression>
    <multiplicativeExpression>  ::= <primaryExpression> | 
                                    <multiplicativeExpression> * <primaryExpression> | 
                                    <multiplicativeExpression> / <primaryExpression>
    <primaryExpression>         ::= <number> | 
                                    ( <expression> )
    terminal symbol 终结符，不能展开的，只能在右面
    non-terminal symbol 非终结符，可以展开的，只能在左面
 */

const primaryExpression = [
    ['number'],
    ['(', 'expression', ')']
]
const multiplicativeExpression = [
    ['primaryExpression'],
    ['multiplicativeExpression', '*', 'primaryExpression'],
    ['multiplicativeExpression', '/', 'primaryExpression']
]
const additiveExpression = [
    ['multiplicativeExpression'],
    ['additiveExpression', '+', 'multiplicativeExpression'],
    ['additiveExpression', '-', 'multiplicativeExpression']
]
const expression = [
    ['additiveExpression']
]
const generative = {
    primaryExpression,
    multiplicativeExpression,
    additiveExpression,
    expression
}
function expressionClosure() {
    return [...new Set(Object.keys(generative).reduce((acc, cur) => {
        acc = acc.concat(generative[cur].reduce((acc2, cur2) => {
            acc2 = acc2.concat(cur2[0])
            return acc2
        }, []))
        return acc
    }, []))]
}
// console.log(expressionClosure())

// 根据表达式，生成状态机，类似kmp的getNext
function generateState(symbols) {
    const states = []
    symbols.forEach((symbol, index) => {
        states.push(realSymbol => {
            if (realSymbol.type === symbol) {
                return states[index + 1]
            }
        })
    });
    return states[0]
}
function closure(symbol) {
    const rules = []
    const dictionary = new Set()
    const pool = [symbol]
    while (pool.length !== 0) {
        const current = pool.pop() // 深度优先
        if (!generative[current]) {
            continue
        }
        generative[current].forEach(newRule => {
            rules.push(newRule)
            const firstSymbol = newRule[0]
            if (!dictionary.has(firstSymbol)) {
                dictionary.add(firstSymbol)
                pool.push(firstSymbol)
            }
        })
    }
    return rules
}
console.log(closure('expression'))