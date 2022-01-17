---
title: 原型连
tags:
  - js
---

```js
// 虽然写在注释里，但是你要注意：
// prototype是函数才会有的属性
Person.prototype.name = "Kevin"
var person1 = new Person()
var person2 = new Person()
console.log(person1.name) // Kevin
console.log(person2.name) // Kevin
```

所谓原型连，写成对象的写法就是(伪代码如下)

```js
let Objcet, Parsen, parsan
//Objcet
Objcet = {
  prototype: {
  __proto__: null
  },
  __proto__: null
}
// Function
Parsen = {
  prototype: {
    name: 'Kevin'
    __proto__: Objcet.prototype
  },
  __proto__: this.prototype
}
// variable Object
parsan = {
  __proto__: Parsen.prototype
}
```
