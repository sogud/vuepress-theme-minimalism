---
title: leetcode初级算法
date: 2019-03-13 16:07:32
tags:
  - JavaScript
  - 算法
  - LeetCode
category: 算法
---

### 26.从排序数组中删除重复项

解题思路：
一级循环从左至右遍历数组，对比对象为该循环索引右侧的所有元素，所以二级循环取从右到左，并终止于一级循环索引数 i，
遇到相同元素，立即删除右侧（二级循环中的）元素并变更原始数组，以保证一级循环过的元素都是唯一的。

```JavaScript
/**
* @param {number[]} nums
* @return {number}
*/
var removeDuplicates = function(nums) {
 // return [...new Set(nums)]
 // return Array.from(new Set(nums))
 // nums = [...new Set(nums)]
 // return nums
 for(i=0;i<nums.length;i++){
   for(j=nums.length-1;j>i;j--){
     if(nums[i]==nums[j]){
       nums.splice(i,1)
     }
   }
 }
};

```
