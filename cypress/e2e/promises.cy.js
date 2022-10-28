it('Sem teste ainda', () => {

})

// Utilizando callback
const getSomething_c = (callback) => {

    setTimeout(() => {
        console.log('Respondendo......')
        callback(12);
    }, 1000)

}

const system_c = () => {
    console.log('init')
    getSomething_c(some => {
        console.log("Something is " + some)
        console.log('end')
    })
}

system_c();

// Utilizando Promisse

const getSomething = () => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(200);
        }, 1000)
    })
}

const system = () => {
    console.log('init promisse')
    getSomething().then(some => {
        console.log("Something promisse is " + some)
        console.log('end promisse')
    })
}

system();

