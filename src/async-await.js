const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000)
    })
}

const doWork = async () => {
    const sum = await add(2, 3)
    const res = await add(sum, 5)
    const res1 = await add(res, 4)
    return res1
}

doWork().then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})