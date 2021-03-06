goog.provide('vadimg.bintrees.TreeBase');

goog.require('goog.asserts');
goog.require('vadimg.bintrees.Iterator');



/**
 * @constructor
 * @param {function(?number,?number):!number=} opt_comparator
 */
vadimg.bintrees.TreeBase = function(opt_comparator) {
  this.root_ = null;
  this.comparator_ = opt_comparator ? opt_comparator : vadimg.bintrees.TreeBase.DEFAULT_COMPARATOR_;
  this.size = 0;
};


/**
 * removes all nodes from the tree
 */
vadimg.bintrees.TreeBase.prototype.clear = function() {
  this.root_ = null;
  this.size = 0;
};


/**
 * returns node data if found, null otherwise
 * @param {!number} data
 * @return {!Array.<!goog.math.Range>}
 */
vadimg.bintrees.TreeBase.prototype.find = function(data) {
  goog.asserts.assertNumber(data);

  var res = this.root_;
  var minStartInRes = this.min();
  if (this.comparator_(data, minStartInRes) === -1) {
    return [];
  }
  var iter = new vadimg.bintrees.Iterator();

  var didNotMatch = false;

  // This while loop will find the *MOST LEFT* node available.
  //
  // Rules:
  // 1. If cmax > data, go left.
  while (!goog.isNull(res)) {
    var cmin = this.comparator_(data, res.start);
    var maxInRes = res.getMaxEndIncludingChildren();
    var cmax = this.comparator_(data, maxInRes);
    var goLeft = cmax > data;

    iter.getAncestors().push(res);
    var foundRes = res.get_child(goLeft);
    if (goog.isNull(foundRes)) {
      iter.getAncestors().pop();
      foundRes = res;
      break;
    }
    res = foundRes;
  }
  iter.setNodeForCursor(res);
  iter.prev(this.root_);

  var foundRanges = [];
  var node;
  while (!goog.isNull(node = iter.next(this.root_))) {
    if (this.comparator_(data, node.start) === -1) {
      continue;
    }
    var rangesWhereEndIsOver = node.rangesWhereEndIsOver(data);
    if (goog.isNull(rangesWhereEndIsOver)) {
      continue;
    }
    goog.array.forEach(rangesWhereEndIsOver, function(range, index) {
      foundRanges.push(range);
    },this);
  }

  return foundRanges;
};


/**
 * Returns an interator to the tree node at or immediately after the item
 * @param {!number} item
 * @return {!vadimg.bintrees.Iterator}
 */
vadimg.bintrees.TreeBase.prototype.lowerBound = function(item) {
  var cur = this.root_;
  var iter = new vadimg.bintrees.Iterator();
  var cmp = this.comparator_;

  while (!goog.isNull(cur)) {
    var c = cmp(item, cur.start);
    if (c === 0) {
      iter.setNodeForCursor(cur);
      return iter;
    }
    iter.getAncestors().push(cur);
    cur = cur.get_child(c > 0);
  }

  for (var i = iter.getAncestors().length - 1; i >= 0; --i) {
    cur = iter.getAncestors()[i];
    if (cmp(item, cur.start) < 0) {
      iter.setNodeForCursor(cur);
      iter.getAncestors().length = i;
      return iter;
    }
  }

  iter.getAncestors().length = 0;
  return iter;
};


/**
 * Returns an interator to the tree node immediately after the item
 * @param {!number} item
 * @return {!vadimg.bintrees.Iterator}
 */
vadimg.bintrees.TreeBase.prototype.upperBound = function(item) {
  var iter = this.lowerBound(item);
  var cmp = this.comparator_;

  while (cmp(iter.data(), item) === 0) {
    iter.next(this.root_);
  }

  return iter;
};


/**
 * returns null if tree is empty
 * @return {?number}
 */
vadimg.bintrees.TreeBase.prototype.min = function() {
  var res = this.root_;
  if (goog.isNull(res)) {
    return null;
  }
  while (!goog.isNull(res.left)) {
    res = res.left;
  }
  return res.start;
};


/**
 * returns null if tree is empty
 * @return {?number}
 */
vadimg.bintrees.TreeBase.prototype.max = function() {
  var res = this.root_;
  if (goog.isNull(res)) {
    return null;
  }
  while (!goog.isNull(res.right)) {
    res = res.right;
  }
  return res.start;
};


/**
 * calls cb on each node's data, in order
 * @template S
 * @param {!function(?vadimg.bintrees.Node)} f
 * @param {S=} opt_obj The object to be used as the value of 'this' within f.
 */
vadimg.bintrees.TreeBase.prototype.forEach = function(f, opt_obj) {
  goog.asserts.assertFunction(f);

  var it = new vadimg.bintrees.Iterator(), node;
  while (!goog.isNull(node = it.next(this.root_))) {
    f.call(opt_obj, node);
  }
};


/**
 * calls cb on each node's data, in reverse order
 * @template S
 * @param {!function(?vadimg.bintrees.Node)} f
 * @param {S=} opt_obj The object to be used as the value of 'this' within f.
 */
vadimg.bintrees.TreeBase.prototype.forReversedEach = function(f, opt_obj) {
  goog.asserts.assertFunction(f);

  var it = new vadimg.bintrees.Iterator(), node;
  while (!goog.isNull(node = it.prev(this.root_))) {
    f.call(opt_obj, node);
  }
};


/**
 * @private
 * @param {?number} a
 * @param {?number} b
 * @return {!number}
 */
vadimg.bintrees.TreeBase.DEFAULT_COMPARATOR_ = function(a, b) {
  if (a === b) {
    return 0;
  }
  if (goog.isNull(a)) {
    return 1;
  }
  if (goog.isNull(b)) {
    return -1;
  }

  if (a < b) {
    return -1;
  }
  return 1;
};
