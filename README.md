# 记录

## 12-31

先有产生式
小括号的作用，分组和捕获，group按照括号分组，并且可以捕获括号内的内容

## 12-24

非终结符由终结符组成

左递归，把递归的部分写在右边
\<blist>::=\<b> | \<b>\<blist>


## 12-10

symbol

- terminalSymbol(终结符，不是表示结束，而是不能再跟别人组成了) "pa" "go"
- nonTerminalSymbol （非终结符）\<world>
- \<world> ::= "pa" | "gu"
- \<alien> ::= \<world> \<alien> | \<world>
- \* 表示0到正无穷
- \+ 表示1到正无穷
- \<alien> ::= \<world> +
- gu 只会两个或者三个同时出现
- \<world> = "pa" | "gu" "gu" | "gu" "gu" "gu"
- 新加有两种规则 1. pa gu gu 2. gu gu gu pa
- 并且 pa 不能连续出现
- \<a> ::= "pa" "gu" "gu"
- \<b> ::= "gu" "gu" "gu" "pa"

a
b
ab
aa
bb
x ba

- \<alien> ::= \<a>+ | \<b>+ | \<a>+ \<b>+
- 单独一个 pa
- \<c> ::= "pa"

x cc
x bc
x ba
x ca

- \<alien> = \<a>+ | \<b>+ | \<a>+ \<b>+ | \<a>*\<c> \<b>*
- \<a> 和 \<b> 数量必须相等
- \<group> ::= \<a> [\<group>] \<b> | \<c>
- \<alien> ::= \<group> +
- ()[]{} 匹配括号
- \<group> ::= \<parentheses> | \<square> | \<curly>
- \<parentheses> :== "(" [\<group>*] ")"
- \<square> :== "[" [\<group>*] "]"
- \<curly> :== "{" [\<group>*] "}"
- \<language> :== \<group> +
- ABNF 不用写尖括号 EBNF 新语法
- 加黑加粗的是terminal symbol
- 产生式是换行，就是在下一行
- 一型，无限制文法，"a" "b" "c" :== "d" 完全自由
- 二型，上下文相关文法，"a" \<world> \<b> = "a" "pa" "gu" \<b> 就是world定义必须有a和b的上下文
- 三型，上下文无关文法，一般会带一个词法 //syntactical grammar, syntax, parser
- 四型，正则文法，比三形简单 //lexical grammar, lex, lexer
- js 大部分在三型，有小部分到了一型

```
// 一型文法，不确定是除法也不确定是不是正则
c
/a[b]/g
```
```
// c++里面，需要判断 A 是变量还是类
A*b
```

## 12-3

正则
1到正无穷 +
0到正无穷 *
^不取啥

// // 起到匹配作用
// console.log[code.match(/^[a]([a-z]*](c)$/))

// // 只起到分组作用需要加 ?:
// reg = /[a][?:[a-z]](c)/
// console.log(code.match(reg))

// const random2 = 'abcadc'
// reg = /[a](?:[a-z])([c])/g

// 使用match + 正则表达式的分组功能
// console.log('abc'.match(/a(b)(c)/))

## 11-26

unicode 记录字符对应编码

utf-8 编码实现存储的方式

正则^定义开头，$定义结尾，得成对出现

js里的数字情况

- xxxx
- xxxx.
- xxxx.xxxx
- .xxxx

match 单次匹配
exec 多次匹配
