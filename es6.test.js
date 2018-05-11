// class Parent{     constructor(){         this.foo()     }     toString(){
// console.log('string')     } } class Child extends Parent{     foo(){
// console.log('child')     } }
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y);
        this.color = color;
    }
}

class A {
    constructor() {
        console.log(new.target.name);
    }
}
class B extends A {
    constructor() {
        super();
    }
}

let cp = new ColorPoint();
describe('class', () => {
    it('prototype', () => {
        console.log(ColorPoint.__proto__==Point)
        
        console.log(ColorPoint.prototype.__proto__ === Point.prototype)
        let cp = new ColorPoint
    })

    it.skip('super', () => {
        let cp = new ColorPoint2()
    })

    it.skip('"this" in super', () => {
        new A() // A
        new B() // B
    })

})
