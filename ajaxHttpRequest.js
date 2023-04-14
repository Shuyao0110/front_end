const btn = document.querySelector('button')
//封装工具时，先看哪些是变化的参数，哪些语句是固定不变的
//用算法替换掉变化的部分
//hyajax的形参是一个对象
//正常应该用键值对赋值，但是现在是在设置默认值，所以用等号
//解构赋值+默认值{}={}
function hyajax({
    url,
    method = 'post',
    data = {},
    timeout = 10000,
    header = {},//有的里面放token
} = {}) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status <= 300) {
                resolve(xhr.response)
                //仅当第一个操作数的计算结果为 true（非零）时，才会计算第二个操作数。 
                //当逻辑“与”表达式为 false 时，这种计算方式可消除不必要的对第二个操作数的计算
                //先判断success是不是true，然后再执行可以不报错，也可以用三元
            } else {
                reject({ status: xhr.status, message: xhr.statusText })
            }
        }
        xhr.responseType = 'json';
        xhr.timeout = timeout
        if (method.toUpperCase() === 'GET') {
            const queryString = []
            for (const key in data) {
                queryString.push(`${key}=${data[key]}`)
            }
            url = url + '?' + queryString.join('&');
            xhr.open(method, url)
            xhr.send()
        } else {
            xhr.open(method, url)
            xhr.setRequestHeader('Content-type', 'application/json')
            xhr.send(JSON.stringify(data))
        }
        btn.onclick = function () {
            xhr.abort()
        }
        xhr.ontimeout = function () {
            console.log('请求过期');
        }

    })


}

hyajax({
    url: 'http://123.207.32.32:1888/01_basic/timeout',
    method: 'get',
    data: {
        name: 'why',
        age: 18
    }
}).then(res => {
    console.log("res:", res)
}).catch(err => {
    consol.log('err:', err)
})