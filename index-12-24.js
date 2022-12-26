//a pa gu gu
//b gu gu gu pa
//c pa

//abc a+|b+|a+b+|a*cb*
// 现在abc有4个分支

const reg = /(pa|gu)/g
let r
const str = 'pagugupa'
let words = []
while (r = reg.exec(str)) {
    words.push({ type: r[0] })
}
words.push({
    type: 'EOF'
})
// blist(words)
abc(words)
console.log(JSON.stringify(words, null, 2))
function a(words) {
    if (
        words[0].type === 'pa'
        && words[1].type === 'gu'
        && words[2].type === 'gu'
    ) {
        const noTerminalSymbol = {
            type: 'a',
            // children: words.slice(0, 4)
        }
        noTerminalSymbol.children = words.splice(0, 3, noTerminalSymbol)
    }
}
function b(words) {
    if (
        words[0].type === 'gu'
        && words[1].type === 'gu'
        && words[2].type === 'gu'
        && words[3].type === 'pa'
    ) {
        const noTerminalSymbol = {
            type: 'b',
            // children: words.slice(0, 4)
        }
        noTerminalSymbol.children = words.splice(0, 4, noTerminalSymbol)
    }
}

function c(words) {
    if (words[0].type === 'pa') {
        const noTerminalSymbol = {
            type: 'c',
            // children: words.slice(0, 4)
        }
        noTerminalSymbol.children = words.splice(0, 1, noTerminalSymbol)
    }
}
function blist(words) {
    if (words[0].type === 'gu') {
        b(words)
        blist(words)
    } else if (words[0].type === 'b') {
        if (words[1].type === 'EOF') {
            const symbol = {
                type: 'blist',
            }
            symbol.children = words.splice(0, 1, symbol)
        } else if (words[1].type === 'gu') {
            const word = words.shift()
            blist(words)
            const symbol = {
                type: 'blist'
            }
            // words.splice(0, 1)是把后面的这项从words删了，取到children里
            symbol.children = [word, ...words.splice(0, 1)]
            words.unshift(symbol)
        }
    }
}
//TODO a*cb* 暂时没实现，只到了a*c
function abc(words) {
    if (words[0].type === 'gu') {
        blist(words)
    } else if (words[0].type === 'pa') {
        // LL(4) 看4个符号决定如何合并（reduce）
        //c EOF
        if (words[1].type === 'EOF') {
            const symbol = {
                type: 'clist',
                children: []
            }
            c(words)
            symbol.children.push(words.shift())
            words.unshift(symbol)
            // ac
        } else if (words[1].type === 'gu' && words[2].type === 'gu' && words[3].type === 'pa') {
            const symbol = {
                type: 'abc',
                children: []
            }
            alist(words)
            symbol.children.push(words.shift())
            c(words)
            symbol.children.push(words.shift())
            words.unshift(symbol)
            //cb
        } else if (words[1].type === 'gu' && words[2].type === 'gu' && words[3].type === 'gu') {
            const symbol = {
                type: 'abc',
                children: []
            }
            c(words)
            symbol.children.push(words.shift())
            blist(words)
            symbol.children.push(words.shift())
            words.unshift(symbol)
        }
    }
}
function alist(words) {
    if (words[0].type === 'pa') {
        a(words)
        alist(words)
    } else if (words[0].type === 'a') {
        //因为a之后不一定结尾，有可能有一个c
        if (words[1].type === 'EOF' || (words[1].type === 'pa' && words[2].type === 'EOF')) {
            const symbol = {
                type: 'alist',
            }
            symbol.children = words.splice(0, 1, symbol)
        } else if (words[1].type === 'pa') {
            const word = words.shift()
            alist(words)
            const symbol = {
                type: 'alist'
            }
            // words.splice(0, 1)是把后面的这项从words删了，取到children里
            symbol.children = [word, ...words.splice(0, 1)]
            words.unshift(symbol)
        }
    }
}
function lao(words, type) {
    const symbol = {
        type,
        children: []
    }
    symbol.children.push(words.shift())
    words.unshift(symbol)
}