// let obj = {
// }
// Object.defineProperty(
//     obj,
//     'a',
//     {
//         configurable: true, 
//         enumerable: true,
//         get(){
//             return this._a
//         },
//         set(val){
//             this._a = val*5
//         }
//     }
// )

// describe('definProperty', () => {
//   it.skip('obj.a',()=>{
//     obj.a=10
//     console.log(obj.a)
//     console.log(obj._a)
//   })
  
// })




// class Parent{
//     constructor(){
//         this.foo()
//     }
//     toString(){
//         console.log('string')
//     }
// }
// class Child extends Parent{
//     foo(){
//         console.log('child')
//     }
// }
// describe('class',()=>{
//     it.skip('a',()=>{
//         let child = new Child()
//         child.toString()
//     })
// })

let arr = [1,2,3,4,5 ,       ,6]

let arr2 = arr.map((v)=>v*v)

let sum = [0, 1, 2, 3].reduce(function (a, b) {
    return a + b;
  }, 0)

let arr3 = arr.filter((v)=>v>2)



describe('Destructuring',()=>{
    it('...',()=>{
        console.log(arr2)
        arr.forEach((element, index, array)=>{
            console.log("arr[" + index + "] = " + element)
        })
        console.log(arr)
        console.log(sum)
        console.log(arr3)
    })
})