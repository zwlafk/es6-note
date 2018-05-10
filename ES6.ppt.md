--
# 变量

JavaScript 的类型分为两种：原始数据类型（Primitive data types）和对象类型（Object types）。  

原始数据类型:按值传递  
对象类型：按引用传递  
变量则是他们的载体  
--
在 ES6 以前，  
声明一个变量只有两种方式 —— `var` 和 `function`  

`let`，`const`命令的用法类似于`var`，但是所声明的变量，只在声明所在的块级作用域内有效。
```javascript
{
  let a = 1
  const b = 2
  var c = 3
}
a // ReferenceError: a is not defined.
b // ReferenceError: b is not defined.
c // 3
```
--
在ES6以前，由于存在变量提升，`var`定义的变量可以在声明之前就调用而不报错，而`let`，`const`必须先声明后使用

`const`一旦声明，就必须立即初始化，值就不能改变。
```javascript
let a = 1
let a = 2
// Uncaught SyntaxError: Identifier 'a' has already been declared
const YEAR = 2017
YEAR = 2018
// TypeError: Assignment to constant variable.
```
`const`实际上保证的，并不是变量的值不得改动，而`是变量指向的那个内存地址不得改动`。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。
--
# 变量的解构赋值
--
## 数组的解构赋值
```javascript
let a = 1;
let b = 2;
let c = 3;
```
等同于ES6:
```javascript
let [a,b,c]=[1,2,3]
```
--
## 对象的解构赋值

对象的解构与数组有一个重要的不同。  
数组的元素是按次序排列的，`变量的取值由它的位置决定`；  
而对象的属性没有次序，`变量必须与属性同名，才能取到正确的值`。  

```javascript
let { bar, foo } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: "aaa", bar: "bbb" };
baz // undefined

let {a,...other}={a:1,b:2,c:3}

```
--
如果变量名与属性名不一致，必须写成下面这样。

```javascript
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'
```
这实际上说明，对象的解构赋值是下面形式的简写
```javascript
let { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };
```
真正被赋值的是后者，而不是前者。

# 字符串
--
## padStart()，padEnd()

`padStart`和`padEnd`一共接受两个参数，第一个参数用来指定字符串的最小长度，第二个参数是用来补全的字符串。
如果原字符串的长度，等于或大于指定的最小长度，则返回原字符串。  
如果用来补全的字符串与原字符串，两者的长度之和超过了指定的最小长度，则会截去超出位数的补全字符串。

```javascript
'xxx'.padStart(2, 'ab') // 'xxx'
'xxx'.padEnd(2, 'ab') // 'xxx'
'abc'.padStart(10, '0123456789')
// '0123456abc'
```
padStart的常见用途是为数值补全指定位数。下面代码生成 10 位的数值字符串。
```javascript
'1'.padStart(10, '0') // "0000000001"
'12'.padStart(10, '0') // "0000000012"
'123456'.padStart(10, '0') // "0000123456"
```
--
## 模板字符串
模板字符串（template string）是增强版的字符串，用反引号（\`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

```javascript
// 普通字符串
`In JavaScript '\n' is a line-feed.`

// 多行字符串
`In JavaScript this is
 not legal.`

console.log(`string text line 1
string text line 2`);

// 字符串中嵌入变量
let name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`
```
--
# 数值的扩展
--
## Math.trunc()
Math.trunc方法用于去除一个数的小数部分，返回整数部分。
```javascript
Math.trunc(4.1) // 4
Math.trunc(4.9) // 4
Math.trunc(-4.1) // -4
Math.trunc(-4.9) // -4
Math.trunc(-0.1234) // -0
```

## isNaN()
在ES6以前，我们使用isNaN这个全局方法判断一个值或者变量是否是NaN

在ES6中，Number对象上也添加了isNaN方法,并且与以前的isNaN有重要的区别

```javascript
isNaN("NaN")//true
Number.isNaN("NaN")//false
```
显然，以前的`isNaN`方法在判断之前，先对不是number类型的"NaN"做了隐式转换，变成了NaN，而Number.isNaN不会转换

可以简单的理解成 == 和 === 的区别
--
## 指数运算符
ES6 新增了一个指数运算符（`**`）。
```javascript
let a = 1.5;
a **= 2;
// 等同于 a = a * a;
let b = 4;
b **= 3;
// 等同于 b = b * b * b;
```
--
# 数组
--
## 扩展运算符
扩展运算符写作三个点（`...`），可以把一个可遍历的对象解开，转为用逗号分隔的序列

```javascript
console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5

[...document.querySelectorAll('div')]
// [<div>, <div>, <div>]

[...'abc']
// ["a", "b", "c"]
```
--
### 扩展运算符的应用
* 复制数组  
在ES6以前
```javascript
//使用slice方法
const a1 = [1,2,3]
const a2 = [].slice.call(a1)
//使用concat方法
const a1 = [1,2,3]
const a2 = a1.concat()
```
在ES6中
```javascript
const a1 = [1,2,3]
const a2 = [...a1]
```
--
* 合并数组  

```javascript
// ES5
[1, 2].concat(more)
// ES6
[1, 2, ...more]

var arr1 = ['a', 'b'];
var arr2 = ['c'];
var arr3 = ['d', 'e'];

// ES5的合并数组
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]

// ES6的合并数组
[...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]
```
--
* 与解构赋值结合  
```javascript
// ES5
a = list[0], rest = list.slice(1)
// ES6
[a, ...rest] = list
```
list是一个数组，给变量a赋值为数组的第一个元素，变量rest为数组剩下的元素组成的数组。  
如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。  

```javascript
const [...butLast, last] = [1, 2, 3, 4, 5];
// 报错

const [first, ...middle, last] = [1, 2, 3, 4, 5];
// 报错
```
--
## Array.from()
`Array.from`方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。  

下面是一个类似数组的对象，Array.from将它转为真正的数组。
```javascript
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```
--
## Array.of()
`Array.of`方法用于将一组值，转换为数组。  

这个方法的主要目的，是弥补数组构造函数`Array()`的不足。因为参数个数的不同，会导致`Array()`的行为有差异。
```javascript
Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]
```
上面代码中，`Array`方法没有参数、一个参数、三个参数时，返回结果都不一样。只有当参数个数不少于 2 个时，`Array()`才会返回由参数组成的新数组。参数个数只有一个时，实际上是指定数组的长度。  

`Array.of`基本上可以用来替代`Array()`或`new Array()`，并且不存在由于参数不同而导致的重载。它的行为非常统一。
--
```javascript
Array.of() // []
Array.of(undefined) // [undefined]
Array.of(1) // [1]
Array.of(1, 2) // [1, 2]
```
`Array.of`总是返回参数值组成的数组。如果没有参数，就返回一个空数组。
--
## 数组实例的 find() 和 findIndex()
数组实例的`find`方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为`true`的成员，然后返回该成员。如果没有符合条件的成员，则返回`undefined`。
```javascript
[1, 4, -5, 10].find((n) => n < 0)
// -5
```
`find`方法的回调函数可以接受三个参数，依次为当前的值、当前的位置、原数组。
```javascript
[1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
}) // 10
// -5
```

数组实例的`findIndex`方法的用法与`find`方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。  
```javascript
[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2
```
## 数组实例的 fill()
`fill`方法使用给定值，填充一个数组。

```javascript
['a', 'b', 'c'].fill(7)
// [7, 7, 7]

new Array(3).fill(7)
// [7, 7, 7]
```
上面代码表明，fill方法用于空数组的初始化非常方便。数组中已有的元素，会被全部抹去。  

`fill`方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。
```javascript
['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']
```
上面代码表示，`fill`方法从 1 号位开始，向原数组填充 7，到 2 号位之前结束。
--
## 数组实例的 includes()
`Array.prototype.includes`方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。
```javascript
[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
[1, 2, NaN].includes(NaN) // true
```

没有该方法之前，我们通常使用数组的`indexOf`方法，检查是否包含某个值。
```javascript
if (arr.indexOf(el) !== -1) {
  // ...
}
```
--

# 函数
--
## 箭头函数
ES6 允许使用“箭头”（`=>`）定义函数。
```javascript
var f = v => v
```
箭头左侧是参数，右侧是函数要执行的代码  

如果要执行的代码只有一条语句，这条语句的运行结果就是函数的返回值，上面的例子相当于：
```javascript
var f = function(v) {
  return v
}
```
如果箭头函数的代码块部分多于一条语句，就必须使用大括号将它们括起来，并使用`return`语句返回。

如果箭头函数的参数不是一个（没有参数或大于一个），需要使用一个圆括号包裹参数
```javascript
(num1, num2) => {
  let num3 = 3
  return num1 + num2 + num3
}
```
--
需要注意的是，箭头函数没有`arguments`对象  

并且箭头函数内部的`this`被绑定为它定义时所在的对象，而不是随着调用方式不同而改变  

箭头函数中取消了`arguments`对象，是因为ES6中有了更好的替代方式：扩展运算符

之前我们在数组一节提到过扩展运算符，用来展开一个可遍历的对象  

如果扩展运算符写在函数的参数中，则称作`rest`参数，是扩展运算符的逆运算
--
## rest 参数
ES6 引入 `rest` 参数（形式为`...变量名`），用于获取函数的多余参数，这样就不需要使用`arguments`对象了。

```javascript
function foo(...rest){
    console.log(rest)//[1,2,3,4,5,6]
    console.log(Array.isArray(rest))//true
}
foo(1,2,3,4,5,6)
```
显然我们输入的参数是逗号分隔的序列，被`...`操作符合成了一个数组，以此可以替代`arguments`对象

注意，只有`...`操作符写在函数的参数中，才是合并的效果，写在其他地方都是展开的效果
--
## 函数参数的默认值
在ES6中，我们可以直接给函数参数设置默认值
```javascript
let log = (x, y = 'World') => console.log(x, y)

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello
```

注意这种默认值的声明方式与`let`类似，函数代码块中不能用`let`或`const`再次声明同一个参数
```javascript
let foo = (x = 5) => {
    let x = 1  // error
    const x = 2  // error
}
```
--
# 对象
--
## 属性的简洁表示法
```javascript
let foo = 'bar'

let baz = {foo}
// 等同于
let baz = {foo: foo}
let obj = {
  method () {}
}
// 等同于
let obj = {
  method: () => {}
}
```
上面例子表明，在对象中，可以直接写变量，属性名就是变量名, 属性值就是变量的值，方法也同理

ES6中，对象的属性名可以使用表达式
```javascript
let obj = {
    ['a' + 'bc']: 123,
    ['h' + 'ello']() {
        return 'hello world!';
    }
}
console.log(obj.abc)
// 123
console.log(obj.hello())
// hello world!
```
很好理解，js解析器会先执行属性名表达式，得到的结果作为真正的属性名，这个表达式`[]`必须用方括号包裹
--
## Object.assign() 
`Object.assign`方法用于对象的合并，接收的参数是任意个对象，会依次把第2，3，4...n个对象合并到第一个对象上，如果有重复的属性名，后来的会覆盖先前的。
```javascript
let obj = {
    a:1
}
Object.assign(obj,{b:2},{c:3},{a:4})
obj //{a:4,b:2,c:3}
```
--
## Object.is()
`Object.is` 方法用于判断两个值是否相等
以前我们判断两个值相等可以用`==`和`===`

不过`==`会发生隐式转换，`===`无法判断NaN

Object.is与`===`不同之处只有两个：一是`+0`不等于`-0`，二是`NaN`等于自身。
```javascript
+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```

## getter&setter
```javascript
let obj = {
    a:2
}
obj.a  //执行了一次[[Get]]操作
let myObject = {
	// 为`a`定义一个getter
	get a() {
		return 2;
	}
};
Object.defineProperty(
	myObject,	// 目标对象
	"b",		// 属性名
	{			// 描述符
		// 为`b`定义getter
		get: function(){ return this.a * 2 },

		// 确保`b`作为对象属性出现
		enumerable: true
	}
);
myObject.a; // 2

myObject.b; // 4
```
# 集合与映射（Set&Map）
多数主流编程语言都提供了若干种复杂数据结构，而在ES6以前，js只有数组和对象两种

ES6为了弥补这一方面的不足，引入了四种新的数据结构

它们分别是：映射(`Map`)、集合(`Set`)、弱集合(`WeakSet`)和弱映射(`WeakMap`)
--
## Set
Set类似数组，但是成员的值都是唯一的，没有重复的值
```javascript
let set = new Set([1, 2, 3, 3])
console.log(set)
// Set(3) {1, 2, 3}
[...set]
// [1, 2, 3]
```
我们可以通过给`Set`构造函数传入一个数组来创建一个`set`，数组中的重复值被自动删除
--
`set`常用的方法不多，常见的有以下几种

* `add(value)`：添加某个值，返回Set结构本身
* `delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功
* `has(value)`：返回一个布尔值，表示该值是否为Set的成员
* `clear()`：清除所有成员，没有返回值
另外，`set`通过`size`属性拿到内部成员的个数，而不是数组的`length`
--
## Map
常见的`Map`用法是接受一个数组作为参数，该数组的成员是一个个表示键值对的数组。  
```javascript
let map = new Map([
  ['a', '1'],
  ['b', '2']
])
console.log(map)
// Map(2) {"a" => "1", "b" => "2"}
```
--
与`Set`相同，`Map`也用`size`属性表示内部有多少个键值对

但是从`Map`中新增，获取值使用`set`，`get`方法，其他的`has`，`delete`方法与`Set`相同
```javascript
let m = new Map()
let o = {p: 'Hello World'}

m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false
```
对比js对象（`Object`）的优势是，`Map`可以使用任意值作为键值，包括对象（上面代码中的`o`）
--

# Class
ES6以前，生成实例对象的方法是通过构造函数。
ES6中引入了 `Class`（类）这个概念，作为对象的模板。通过`class`关键字，可以定义类。
--
```javascript
function Point(x,y){
    this.x = x
    this.y = y
}
Point.prototype.toString = function () {
    return '(' + this.x + ', ' + this.y + ')'
}
let p1 = new Point(1,1)
//等同于
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
ES6 明确规定，`Class` 内部只有静态方法，没有静态属性。
--
## constructor
`constructor`是类的默认方法，使用`new`命令生成实例时会自动调用该方法。
通常在`constructor`中对实例对象的属性进行初始化。

## this指向
类的方法内部如果含有`this`，它默认指向类的实例。

## extends
Class 可以通过`extends`关键字实现继承
```javascript
class Point {
}
class ColorPoint extends Point {
}
```
上面代码定义了一个`ColorPoint`类，该类通过`extends`关键字，继承了`Point`类的所有属性和方法。
--
### super关键字
`super`代表父类的构造函数
ES6要求，在子类的`construtor`必须执行一次`super`函数
--
# Module语法
ES6实现了模块功能  
模块功能主要由两个命令构成：`export`和`import`。  
`export`命令用于规定模块的对外接口，`import`命令用于输入其他模块提供的功能。  
--
## export
`export`可以暴露模块内部的变量和方法

```javascript
const a =1
const b = ()=>{
    //...
}
export {a,b}
//或者
export const a = 1
```
--
## import
`import`命令用来导入其他模块暴露出的变量和方法
```javascript
import {a,b} from './module1.js'
a()
b()
```
--
### export default
`export default`命令暴露出的变量或方法，在`import`时可以自定义名字来引入
```javascript
//a.js
function a(){}
export default a
//b.js
import whatever from './a.js'
whatever()
```
显然，一个模块只能有一个默认输出，因此`export default`命令只能使用一次。
--