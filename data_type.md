# 数据类型
最新的 ECMAScript 标准定义了 7 种数据类型:
- 6 种原始类型:
  - Boolean
  - Null
  - Undefined
  - Number
  - String
  - Symbol (ECMAScript 6 新定义)
- 和 Object
## 区别
```javascript
var a = 1;
var b = a;
b = 2;
console.log(a==b);//false
//这个我们都知道，b跟a的内存地址是不一致的，简单类型的赋值会进行复制，所以a跟b不相等。
var a1 = {
    counter : 1
};
var b1 = a1;

b1.counter++;
console.log(a1.counter==b1.counter);//true
//这时候因为a和b指向相同的内存地址，所以只要修改了b的counter，a里面的counter也会跟着变。
```
# 对象
在计算机科学中, 对象是指内存中的可以被标识符引用的一块区域  
## 属性
在 `Javascript` 里，对象可以被看作是一组属性的集合。用对象字面量语法来定义一个对象时，会自动初始化一组属性。（也就是说，你定义一个`var a = "Hello"`，那么a本身就会有`a.substring`这个方法，以及`a.length`这个属性，以及其它；如果你定义了一个对象，`var a = {}`，那么`a`就会自动有`a.hasOwnProperty`及`a.constructor`等属性和方法。）而后，这些属性还可以被增减。属性的值可以是任意类型，包括具有复杂数据结构的对象。属性使用键来标识，它的键值可以是一个字符串或者符号值（`Symbol`）。

ECMAScript定义的对象中有两种属性：`数据属性`和`访问器属性`。
## 属性描述符
对象里目前存在的属性描述符有两种主要形式：`数据描述符`和`存取描述符`。  
`数据描述符`是一个具有值的属性，该值可能是可写的，也可能不是可写的。  
`存取描述符`是由`getter-setter`函数对描述的属性。
### 数据属性
数据属性是键值对，并且每个数据属性拥有下列特性:

| 特性             | 数据类型           | 描述                                                         | 默认值    |
| :--------------- | ------------------ | ------------------------------------------------------------ | --------- |
| [[Value]]        | 任何Javascript类型 | 包含这个属性的数据值。                                       | undefined |
| [[Writable]]     | Boolean            | 如果该值为 `false，`则该属性的 [[Value]] 特性 不能被改变。   | true      |
| [[Enumerable]]   | Boolean            | 如果该值为 `true，`则该属性可以用 for...in 循环来枚举。 | true      |
| [[Configurable]] | Boolean            | 如果该值为 `false，`则该属性不能被删除，并且 除了 [[Value]] 和 [[Writable]] 以外的特性都不能被改变 。 | true      |

也就是说这些属性是给对象添加了属性后自动拥有的。当然也可以自己配置

```javascript
let obj = {}
Object.defineProperty(obj,'a',
    {
        value: 2,//定义'a'属性值为2
        writable: true, //如果为false，后面对a属性赋值操作会失败报错
        configurable: true, //如果为false，后面对a属性重新使用defineProperty会失败
        enumerable: true //该属性可以用for...in 循环来枚举
    }
)
```

### 访问器属性

| 特性             | 数据类型           | 描述                                                         | 默认值    |
| :--------------- | ------------------ | ------------------------------------------------------------ | --------- |
| [[Get]]        | 函数对象或者 undefined | 该函数使用一个空的参数列表，能够在有权访问的情况下读取属性值。| undefined |
| [[Set]]     | 函数对象或者 undefined            | 该函数有一个参数，用来写入属性值   | undefined      |
| [[Enumerable]]   | Boolean            | 如果该值为 true，则该属性可以用 for...in 循环来枚举 | true      |
| [[Configurable]] | Boolean            | 如果该值为 false，则该属性不能被删除，并且不能被转变成一个数据属性。 | true |

当我们通过`.`或`[]`访问某个数据属性时，访问结果受这些属性影响。

这些属性通过`Object.defineProperty()`定义

```javascript
let obj = {
}
Object.defineProperty(
    obj,
    'a',
    {
        configurable: true, 
        enumerable: true,
        get(){
            return this._a
        },
        set(val){
            this._a = val*5
        }
    }
)
obj.a = 10
obj.a //50
```
### 属性描述符可同时具有的键值

|            | configurable | enumerable | value | writable | get  | set  |
| ---------- | ------------ | ---------- | ----- | -------- | ---- | ---- |
| 数据属性   | Yes          | Yes        | Yes   | Yes      | No   | No   |
| 访问器属性 | Yes          | Yes        | No    | No       | Yes  | Yes  |

这意味着我们在使用`Object.defineProperty()`设置属性的描述符时，只能设置`数据属性`和`访问器属性`中的一种。

也就是说，一个属性的描述符中不能同时有(`value`或`writable`)和(`get`或`set`)关键字。

如果一个描述符不具有`value`,`writable`,`get` 和 `set` 任意一个关键字，那么它将被认为是一个数据描述符。