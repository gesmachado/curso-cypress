/// <reference types="cypress" />

it('Equality', ()=>{
    
    const a = 1;
    expect(a).equal(1);
    expect(a, 'Deveria ser 1').equal(1);

    expect(a).to.be.equal(1);
    expect('a').to.be.equal('a');
})

it('Bolleanos', ()=>{
    const a = true
    const b = false
    const c = null
    let d

    expect(a).to.be.true
    expect(b).to.be.false
    expect(c).to.be.null
    expect(d).to.be.undefined
    expect(b).to.be.not.null
})

it('Object equality', ()=> {

    const obj = {
        a: 1,
        b: 2
    }

    const obj_2 = {
        a: 2,
        b: 2
    }

    expect(obj).equal(obj)
    expect(obj).equals(obj)
    expect(obj).eq(obj)
    expect(obj).to.be.equal(obj)

    expect(obj).to.be.not.equal(obj_2)
    expect(obj).to.be.deep.equal({a:1,b:2})
    expect(obj).to.be.eql({a:1,b:2})

    expect(obj).include({a:1})
    expect(obj).not.include({c:1})

    expect(obj).to.have.property('a',1)
    expect(obj).to.have.property('b')
    expect(obj).to.not.have.property('c')

    expect(obj).to.not.be.empty
})

it('Arrays', ()=>{
    const arr = [1,2,3]

    expect(arr).to.have.members([1,2,3])
    expect(arr).to.include.members([1,3])
    expect(arr).to.not.be.empty
    expect([]).to.be.empty
})

it('Types', function(){
    const num = 1
    const str = 'String'

    expect(num).to.be.a('number')
    expect(str).to.be.a('string')
    expect({}).to.be.a('object')
    expect([]).to.be.a('array')
})

it('Strings', ()=>{
    const str = 'String de teste'

    expect(str).to.be.equal('String de teste')
    expect(str).to.have.length('15')
    expect(str).to.contains('de')

    expect(str).to.match(/de/) // Tem em algum lugar lá dentro

    expect(str).to.match(/String/) // Tem em algum lugar lá dentro
    expect(str).to.match(/^String/) // Deve começar com...

    expect(str).to.match(/teste$/) // Deve terminar com ...

    expect(str).to.match(/.{15}/) // Dever ter esse tamanho

    expect(str).to.match(/\w+/) // Apenas letras
    expect(str).to.match(/\D+/) // Sem números
})

it('Numbers', ()=>{
    const number = 4
    const floatnumber = 5.2123

    expect(number).to.be.equal(4)
    expect(number).to.be.greaterThan(3)
    expect(number).to.be.lessThan(5)

    expect(floatnumber).to.be.equal(5.2123)
    expect(floatnumber).to.be.closeTo(5.2, 0.1) // Aproximadamente igual ao número, erro permitido de aproximação
    expect(floatnumber).to.be.above(5)
})