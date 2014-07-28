goog.provide('vadimg.bintrees.Node');

goog.require('goog.asserts');
goog.require('goog.array');
goog.require('goog.math.Range');
goog.require('goog.object');
goog.require('goog.structs.PriorityQueue');



/**
 * @constructor
 * @param {number=} opt_start
 */
vadimg.bintrees.Node = function(opt_start) {
  this.start = opt_start?opt_start:null;
  this.addedEnds_ = {};
  this.endHeap = new goog.structs.PriorityQueue();
  this.maxEndIncludingChildren_ = this.start;
  this.left = null;
  this.right = null;
  this.red = true;
};


/**
 * @param {!goog.math.Range} range
 */
vadimg.bintrees.Node.prototype.addRange = function(range){
  goog.asserts.assert(range.start === this.start);

  var end = range.end;
  if(goog.object.containsKey(this.addedEnds_,end)){
    return;
  }
  this.addedEnds_[end] = 1;

  // Since goog.structs.PriorityQueue dequeues values in ascendant order, you need to enqueue negative values in order to let this.endHeap dequeue in descendant order.
  this.endHeap.enqueue(-end,end);
  this.updateMaxEndIncludingChildren();
};


/**
 * @param {!goog.math.Range} range
 */
vadimg.bintrees.Node.prototype.removeRange = function(range){
  var end = range.end;
  if(!goog.object.containsKey(this.addedEnds_,end)){
    return;
  }
  goog.object.remove(this.addedEnds_,end);
  var poppedButStillRequiredValues = [];
  while(!this.endHeap.isEmpty()){
    var popped = this.endHeap.dequeue();
    if(end === popped){
      break;
    }
    poppedButStillRequiredValues.push(popped);
  }
  goog.array.forEach(poppedButStillRequiredValues,function(value,index){
    this.endHeap.enqueue(-value,value);
  },this);
  this.updateMaxEndIncludingChildren();
};


/**
 * @return {!boolean}
 */
vadimg.bintrees.Node.prototype.isEmpty = function(){
  return this.endHeap.isEmpty();
};


/**
 *
 */
vadimg.bintrees.Node.prototype.updateMaxEndIncludingChildren = function(){
  var currentMaxInsideMe = this.endHeap.peek();
  var maxInLeft = goog.isNull(this.left)?this.start:this.left.getMaxEndIncludingChildren();
  var maxInRight = goog.isNull(this.right)?this.start:this.right.getMaxEndIncludingChildren();
  this.maxEndIncludingChildren_ = Math.max(Math.max(currentMaxInsideMe,maxInLeft),maxInRight);
};


/**
 * @return {?number}
 */
vadimg.bintrees.Node.prototype.getMaxEndIncludingChildren = function(){
  return this.maxEndIncludingChildren_;
};


/**
 * @return {?Array.<!goog.math.Range>}
 */
vadimg.bintrees.Node.prototype.allRanges = function(){
  if(goog.isDefAndNotNull(this.start)){
    var ranges = [];
    goog.array.forEach(this.endHeap.getValues(),function(end,index){
      goog.asserts.assertNumber(this.start);
      ranges.push(new goog.math.Range(this.start,end));
    },this);
    return ranges;
  }
  return null;
};


/**
 * @param {?boolean} dir
 * @return {?vadimg.bintrees.Node}
 */
vadimg.bintrees.Node.prototype.get_child = function(dir) {
  return dir ? this.right : this.left;
};


/**
 * @param {!boolean} dir
 * @param {?vadimg.bintrees.Node} val
 */
vadimg.bintrees.Node.prototype.set_child = function(dir, val) {
  if(dir) {
    this.right = val;
  }else {
    this.left = val;
  }
};
