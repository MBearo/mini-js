/**
    <multiplicativeExpression> ::= <number> | <multiplicativeExpression> "*" <number> | <multiplicativeExpression> "/" <number>
    <additiveExpression> ::= <multiplicativeExpression> | <additiveExpression> "+" <multiplicativeExpression> | <additiveExpression> "-" <multiplicativeExpression>
    <expression> ::= <additiveExpression>
 */

/**
    // 正负
    <unaryExpression> ::= <primaryExpression> | "-" <primaryExpression> | "+" <primaryExpression>

    <multiplicativeExpression> ::= <unaryExpression> | <primaryExpression> "*" <unaryExpression> | <primaryExpression> "/" <unaryExpression>
    <additiveExpression> ::= <multiplicativeExpression> | <additiveExpression> "+" <multiplicativeExpression> | <additiveExpression> "-" <multiplicativeExpression>
    <primaryExpression> ::= <increaseExpression> | "(" <additiveExpression> ")"
    // 自增
    <increaseExpression> ::= <number> "++" | "++" <number>
    // && || , 优先级比加减乘除低，但是比  && || 高
    <logicAdd> ::= <additiveExpression> | <logicAdd> "&&" <unaryExpression>
    <logicOr> ::= <logicAdd> | <logicOr> "||" <logicAdd>

    // 等号。一般的都是左结合，但是赋值是右结合
    // a = b = 1 相当于是 a = (b = 1)
    // 等号虽然是右结合，但是计算顺序仍然是从左到右
    // o = {} o.a = o = {x:1}
    // 等号左边必须是左手表达式，下面用logicOr 是为了简化点
    // ** 也是右结合
    <assignmentExpression> ::= <logicOr> | <assignmentExpression> "=" <logicOr> | <assignmentExpression> "**" <logicOr>

    // , 最低
    <expressionGroup> ::= <logicOr> | <expressionGroup> "," <logicOr>
    // if
    <ifStatement> ::= <expressionGroup> | "if" "(" <expressionGroup> ")" <expressionGroup> "else" <expressionGroup>
    // ;
    <split> ::= <expressionGroup> | <split> ";" <expressionGroup>
    
 */

/**

(1+2)*3
    *
  +   3
1  2

 */
/**

primaryExpression
    number
    additiveExpression
        multiplicativeExpression
            primaryExpression

 */

// 括号优先级最高，其他的应该是由括号组成的

// closure 包含集
/**
<multiplicativeExpression> ::= <number> | <multiplicativeExpression> * <number> | <multiplicativeExpression> / <number>
<additiveExpression> ::= 
    <multiplicativeExpression> |
    <additiveExpression> + <multiplicativeExpression> |
    <additiveExpression> - <multiplicativeExpression> |
    <number> |
    <multiplicativeExpression> * <primaryExpression> |
    <multiplicativeExpression> / <primaryExpression> |
    "(" <additiveExpression> ")" |
    <number>
<expression> ::= <additiveExpression>

 */