# Class
ES6以前，生成实例对象的方法是通过构造函数。
```javascript
function Point(x,y){
    this.x = x
    this.y = y
}
Point.prototype.toString = function () {
    return '(' + this.x + ', ' + this.y + ')'
}
let p1 = new Point(1,1)
```

ES6中引入了 `Class`（类）这个概念，作为对象的模板。通过`class`关键字，可以定义类。

**ES6中的类很大程度上只是构造函数的语法糖**

```javascript
class Point{
    constructor(x,y){
        this.x = x
        this.y = y
    }
    toString(){
        return '(' + this.x + ', ' + this.y + ')';
    }
}
let p1 = new Point(1,1)
```
虽然`class Point`看起来很像`function Point()`，但是有一些重要的区别：
* 使用`class`创建实例对象必须通过`new`,构造函数可以通过`Point.call(...)`
* 虽然`function Point`会被“提升”，但是`class Point`不会；所以，在你创建类实例之前必须先声明它。

类中定义的所有方法都是在类的`prototype`上定义的

使用`class`时，可以将它作为一个用来自动填充`proptotype`对象的`宏`
```javascript
class Point {
  constructor() {
    // ...
  }

  toString() {
    // ...
  }

  toValue() {
    // ...
  }
}

// 等同于

Point.prototype = {
  constructor() {},
  toString() {},
  toValue() {},
};
```
其实一个ES6 `class`本身不是一个实体，而是一个元概念，它包裹在其他具体实体上，例如函数和属性，并将它们绑在一起。

## constructor
`constructor`是类的默认方法，使用`new`命令生成实例时会自动调用该方法。  

这个方法的明确的工作，就是初始化实例所需的所有信息（状态）。

通常在`constructor`中对实例对象的属性进行初始化。

`constructor`方法默认返回实例对象（即`this`）

## this指向
和构造函数创建实例一样，`this`指向实例对象

类的方法内部如果含有`this`，它默认指向类的实例。

## extends&super
Class 可以通过`extends`关键字实现继承

`extends`实质上也是一种语法糖，用于在两个函数原型之间建立`[[Prototype]]`委托链
```javascript
class Point {
}
class ColorPoint extends Point {
}
```
上面代码定义了一个`ColorPoint`类，该类通过`extends`关键字，继承了`Point`类的所有属性和方法。

或者说是`ColorPoint.prototype`的`[[prototype]]`（大多数浏览器通过`__proto__`访问）链接到`Point.prototype`

子类必须在`constructor`方法中调用`super`方法，否则新建实例时会报错。

这是因为子类自己的`this`对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。

如果不调用`super`方法，子类就得不到`this`对象。

ES5 :实质是先创造子类的实例对象`this`，然后再将父类的方法添加到`this`上面（`Parent.apply(this)`）。

ES6 :实质是先创造父类的实例对象`this`（所以必须先调用`super`方法），然后再用子类的构造函数修改`this`。

`super`这个关键字，既可以当作函数使用，也可以当作对象使用。
- super作为函数调用时，代表父类的构造函数。
    ```javascript
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
    new A() // A
    new B() // B
    ```
    上面代码中，`new.target`指向当前正在执行的函数。可以看到，在`super()`执行时，它指向的是子类`B`的构造函数，而不是父类`A`的构造函数。也就是说，`super()`内部的`this`指向的是`B`。

    作为函数时，`super()`只能用在子类的构造函数之中，用在其他地方就会报错。
-  super作为对象时，指向父类的原型对象
    ```javascript
    class A {
        p() {
            return 2;
        }
    }

    class B extends A {
        constructor() {
            super();
            console.log(super.p()); // 2
        }
    }

    let b = new B();
    ```
  上面的`super.p()`相当于`A.prototype.p()`



