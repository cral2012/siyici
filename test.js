 
风兮版本：

function avg()
{
var args = arguments;
if ( args.length < 3 )
{
return 0;
}
var max = Math.max.apply( this, args );
var min = Math.min.apply( this, args );
var sum = 0 - max - min;
for ( var i = 0; i < args.length; i ++ )
{
sum += args [i] ;
}
var avg = sum / ( args.length - 2 );
return avg;
}
 
清版本：

function avg()
{
var args = arguments;
if ( args.length < 3 )
{
return 0;
}
var max = Math.max.apply( this, args );
var min = Math.min.apply( this, args );
var sum = 0 - max - min;
for ( var i = 0; i < args.length; i ++ )
{
sum += args[ i ];
}
var avg = Math.round( sum / ( args.length - 2 ) );
return avg;
}
 
Zjmainstay版本：
/**
* 快速排序 Object 版 （容易出错！）
*/
function quick_sort_obj(points) {
if(typeof points.length == 'undefined') {
points = array_merge(points);	//Object.length 是 undefined，所以必须用array_merge转成数组
}

//Object.length is undefined;
if(points.length <= 1) {
return points;	//只有一个或为空直接返回
}

var left = {};
var right = {};

var needle = points[0];

for(var i = 1; i < points.length; i++) {
if(points [i] < needle) {
left [i] = points [i] ;
} else {
right [i] = points [i] ;
}
}

return array_merge(quick_sort_obj(left), [needle], quick_sort_obj(right));	//左右合并
}

/**
* 快速排序 Array 版
*/
function quick_sort_arr(points) {
if(points.length <= 1) return points;	//只有一个或为空直接返回

var left = [];
var right = [];

var needle = points[0];	 //第0个为目标值

for(var i = 1; i < points.length; i++) {	//第1~N个与目标值比较
if(points [i] < needle) {
left.push(points [i] );
} else {
right.push(points [i] );
}
}

return array_merge(quick_sort_arr(left), [needle], quick_sort_arr(right));	//左右合并
}

/**
* 合并多个一维数组
* 
*/
function array_merge(/*[arr1], [arr2], [arr3]...*/) {
var args = array_merge.arguments;	//获取所有js参数

var merge = [];	//存储合并结果
var count = 0;	//合并后下标
for(var i in args) {	 //合并数组1-N
for(var j in args [i] ) {	//单个数组的数值并入
merge.push(args [i] [j] );
}
}
return merge;
}

/**
* 求平均值
*/
function getAverage(points) {
var sum = 0;
for(var i in points) {
sum += points [i] ;
}

return (sum/points.length).toFixed(1);
}

function getPoint(points) {
// points = quick_sort_obj(points);
points = quick_sort_arr(points);

if(points.length <= 2) return 0;	//评分人数不够

//删除最低最高分
points.pop();
points.shift();

var average = getAverage(points);

return average;
}

var points = [];
console.log(getPoint(points));
console.log('---');

var points = [1,2,3];
console.log(getPoint(points));
console.log('---');

var points = [7,2,3,10,9,8,1,6,5,4];
console.log(getPoint(points));
console.log('---');
 
阳光版本1：
// 打分，假设满分100
// 版本1，未使用 apply
function score1() {
var args = arguments
var min = 100, max = 0, sum = 0, avg = 0, len = args.length

// 需去掉一个最大值和一个最小值
// 所以数量必须大于2
if ( args.length > 2 ) {

for ( var i = 0; i < len; i ++ ) {
sum += args [i] 

// 得到最大和最小值
min = args [i] < min ? args [i] : min
max = args [i] > max ? args [i] : max

}

// 总和减去最大和最小值，求平均，取整
avg = Math.round((sum - min - max) / ( len - 2 ))
}

return avg
}
 

阳光版本2：
// 版本2，先转为数组，再使用sort方法
function score3() {
// arguments 转为数组
var args = [].concat.apply([], arguments)
var min = 100, max = 0, sum = 0, avg = 0, len = args.length

if ( args.length > 2 ) {
args = args.sort(function(a, b){return a-b})
// 去掉一个最大和最小值
args.shift()
args.pop()

for ( var i = 0; i < len -2; i ++ ) {
sum += args [i] 
}

// 总和减去最大和最小值，求平均，取整
avg = Math.round(sum / ( len - 2 ))
}

return avg
}

console.log(score3(11,2,3,1,5,6,7,8,4,3)) // 5
 
阳光版本3：
// 版本3，用call/apply借用数组的sort方法
function score2() {
var args = arguments
var min = 100, max = 0, sum = 0, avg = 0, len = args.length

// 需去掉一个最大值和一个最小值
// 所以数量必须大于2
if ( args.length > 2 ) {
// 坑：
// 1. sort 默认按ASCII字符升序排列，不是数字大小，比如11会排在2之前
// 2. sort 方法在执行过程中并不会创建新的 Array 对象，所以返回值仍然不是数组对象

// apply和call都可以使用，稍有差别
//args = [].sort.apply(args, [function(a, b){return a-b}])
args = [].sort.call(args, function(a, b){return a-b})

// 得到最大和最小值
min = args[0]
max = args[len - 1]

for ( var i = 0; i < len; i ++ ) {
sum += args [i] 
}

// 总和减去最大和最小值，求平均，取整
avg = Math.round((sum - min - max) / ( len - 2 ))
}

return avg
}

console.log(score2(11,2,3,1,5,6,7,8,4,3)) // 5
