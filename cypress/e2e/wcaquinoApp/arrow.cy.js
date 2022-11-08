
it('Nada agora', function() {})

// 1
function soma_1(a, b){
    return a + b;

}
console.log(soma_1(1,4))

// 2
const soma_2 = function (a, b){
    return a + b;

}
console.log(soma_2(2,4))

// 3
const soma_3 = (a, b)  => {
    return a + b
}
console.log(soma_3(3,4))

// 4
const soma_4 = (a,b) => a + b
console.log(soma_3(4,4))

// 5
const soma_5 = (a) => a+a
console.log(soma_5(5,4)) // pegou só o primeiro valor 5 + 5 = 10

// 6
const soma_6 = a => a+a
console.log(soma_6(6,4)) // pegou só o primeiro valor 6 + 6 = 12

// 7
const soma_7 = () => 7+7
console.log(soma_7(100,100)) // Desconsiderou os parametros

it('A function test...', function(){
    console.log('Function', this)
})

it('An arrow test...', () => {
    console.log('Arrow', this)
})