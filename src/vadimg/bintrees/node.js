goog.provide('vadimg.bintrees.Node');

goog.require('goog.array');
goog.require('goog.asserts');
goog.require('goog.math.Range');
goog.require('goog.object');
goog.require('goog.structs.PriorityQueue');



/**
 * @constructor
 * @param {number=} opt_start
 */
vadimg.bintrees.Node = function(opt_start) {
  this.start = goog.isDefAndNotNull(opt_start) ? opt_start : null;
  this.addedEnds_ = {};
  this.endMaxHeap_ = new goog.structs.PriorityQueue();
  this.maxEndIncludingChildren_ = this.start;
  this.left = null;
  this.right = null;
  this.red = true;
};


/**
 * @param {!goog.math.Range} range
 */
vadimg.bintrees.Node.prototype.addRange = function(range) {
  goog.asserts.assertInstanceof(range, goog.math.Range);
  goog.asserts.assert(range.start === this.start);

  var end = range.end;
  if (goog.object.containsKey(this.addedEnds_, end)) {
    return;
  }
  this.addedEnds_[end] = 1;

  // Since goog.structs.PriorityQueue dequeues values in ascendant order, you need to enqueue negative values in order to let this.endMaxHeap dequeue in descendant order.
  this.endMaxHeap_.enqueue(-end, end);
  this.updateMaxEndIncludingChildren();
};


/**
 * @private
 * @param {!goog.structs.PriorityQueue} heap
 * @param {!number} removingValue
 */
vadimg.bintrees.Node.removeValueFromHeap_ = function(heap, removingValue) {
  goog.asserts.assertInstanceof(heap, goog.structs.PriorityQueue);
  goog.asserts.assertNumber(removingValue);

  var poppedButStillRequiredValues = [];
  while (!heap.isEmpty()) {
    var popped = heap.dequeue();
    if (removingValue === popped) {
      break;
    }
    poppedButStillRequiredValues.push(popped);
  }
  goog.array.forEach(poppedButStillRequiredValues, function(value, index) {
    heap.enqueue(-value, value);
  });
};


/**
 * @param {!goog.math.Range} range
 */
vadimg.bintrees.Node.prototype.removeRange = function(range) {
  goog.asserts.assertInstanceof(range, goog.math.Range);

  var end = range.end;
  if (!goog.object.containsKey(this.addedEnds_, end)) {
    return;
  }
  goog.object.remove(this.addedEnds_, end);
  vadimg.bintrees.Node.removeValueFromHeap_(this.endMaxHeap_, end);
  this.updateMaxEndIncludingChildren();
};


/**
 * @return {!boolean}
 */
vadimg.bintrees.Node.prototype.isEmpty = function() {
  return this.endMaxHeap_.isEmpty();
};


/**
 *
 */
vadimg.bintrees.Node.prototype.updateMaxEndIncludingChildren = function() {
  var currentMaxInsideMe = this.endMaxHeap_.peek();
  var maxInLeft = goog.isNull(this.left) ? this.start : this.left.getMaxEndIncludingChildren();
  var maxInRight = goog.isNull(this.right) ? this.start : this.right.getMaxEndIncludingChildren();
  this.maxEndIncludingChildren_ = Math.max(Math.max(currentMaxInsideMe, maxInLeft), maxInRight);
};


/**
 * @return {?number}
 */
vadimg.bintrees.Node.prototype.getMaxEndIncludingChildren = function() {
  return this.maxEndIncludingChildren_;
};


/**
 * @param {!number} end
 * @return {?Array.<!goog.math.Range>}
 */
vadimg.bintrees.Node.prototype.rangesWhereEndIsOver = function(end) {
  if (goog.isDefAndNotNull(this.start)) {
    var ranges = [];
    while (!this.endMaxHeap_.isEmpty()) {
      var foundEnd = this.endMaxHeap_.dequeue();
      if (foundEnd <= end) {
        break;
      }
      ranges.push(new goog.math.Range(this.start, foundEnd));
    }
    goog.array.forEach(ranges, function(range, index) {
      this.endMaxHeap_.enqueue(-range.end, range.end);
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
  if (dir) {
    this.right = val;
  }else {
    this.left = val;
  }
  this.updateMaxEndIncludingChildren();
};
