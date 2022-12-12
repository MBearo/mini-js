// 整数 xxxx
const decimalReg = /^[-]{0,1}[1-9][0-9]{0,}$|^0$/
// 整数或只有点 xxxx.
const decimalReg2 = /^[-]{0,1}[1-9][0-9]{0,}\.$|^0\.$/
// 整数或小数 xxx.xxxx
const decimalReg3 = /^[-]{0,1}[1-9][0-9]{0,}\.[0-9]{1,}$|^0\.[0-9]{1,}$/
// 只有小数 .xxxx
const decimalReg4 = /^[-]{0,1}\.[0-9]{1,}$/
// reg1+reg2
const decimalReg5 = /^([-]{0,1}[1-9][0-9]{0,}|0)\.{0,1}$/
// reg2+reg3
// 整数或小数 xxx.xxxx
const decimalReg6 = /^[-]{0,1}[1-9][0-9]{0,}\.[0-9]{0,}$|^0\.[0-9{0,}]$/
// reg1+reg2+reg3
const decimalReg7 = /^[-]{0,1}[1-9][0-9]{0,}(\.[0-9]{0,}){0,1}$|^0(\.[0-9]{0,}){0,1}$/
// reg1+reg2+reg3+reg4
const decimalReg8 = /^[-]{0,1}[1-9][0-9]{0,}(\.[0-9]{0,}){0,1}$|^0(\.[0-9]{0,}){0,1}$|^[-]{0,1}\.[0-9]{1,}$/

const testCase = [
    '1',
    '.',
    '1.',
    '1.1',
    '.11',
    '1.1.1'
]
const list = []
testCase.forEach(v => {
    list.push([
        decimalReg.test(v),
        decimalReg2.test(v),
        decimalReg3.test(v),
        decimalReg4.test(v),
        decimalReg5.test(v),
        decimalReg6.test(v),
        decimalReg7.test(v),
        decimalReg8.test(v)
    ])
})
console.table(list)

const demo = 'abc'
const reg = /[a](?:[a-z]*)([c])/
// 不想要的出现在分组中，就在在分组中加上 ?: 
// match 之后的顺序以左括号出现的位置为准
console.log(demo.match(reg))

const reg2 = /[a]([a-z])([c])/g
const demo2 = 'abcabc'
console.log(demo2.replace(reg2, 'xyz'))
let i = 0
console.log(demo2.replace(reg2, (str, $1, $2) => {
    // 替换几次就会执行几次
    console.log(str, $1, $2)
    return $1 + i++
}))

const reg3 = /\d/g
const demo3 = '1234567'
let r
while (r = reg3.exec(demo3)) {
    console.log(r)
}