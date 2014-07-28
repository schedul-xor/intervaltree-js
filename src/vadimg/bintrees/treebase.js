goog.provide('vadimg.bintrees.TreeBase');

goog.require('goog.asserts');
goog.require('vadimg.bintrees.Iterator');



/**
 * @constructor
 * @param {function(!number,!number):!number=} opt_comparator
 */
vadimg.bintrees.TreeBase = function(opt_comparator) {
  this.root_ = null;
  this.comparator_ = opt_comparator?opt_comparator:vadimg.bintrees.TreeBase.DEFAULT_COMPARATOR_;
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
 * @return {?number}
 */
vadimg.bintrees.TreeBase.prototype.find = function(data) {
  goog.asserts.assertNumber(data);

  var res = this.root_;

  while(!goog.isNull(res)) {
    var c = this.comparator_(data, res.data);
    if(c === 0) {
      return res.data;
    }
    else {
      res = res.get_child(c > 0);
    }
  }

  return null;
};


/**
 * returns iterator to node if found, null otherwise
 * @param {!number} data
 * @return {?vadimg.bintrees.Iterator}
 */
vadimg.bintrees.TreeBase.prototype.findIter = function(data) {
  goog.asserts.assertNumber(data);

  var res = this.root_;
  var iter = new vadimg.bintrees.Iterator();

  while(!goog.isNull(res)) {
    var c = this.comparator_(data, res.data);
    if(c === 0) {
      iter._cursor = res;
      return iter;
    }
    else {
      iter.getAncestors().push(res);
      res = res.get_child(c > 0);
    }
  }
  return null;
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

  while(!goog.isNull(cur)) {
    var c = cmp(item, cur.data);
    if(c === 0) {
      iter._cursor = cur;
      return iter;
    }
    iter.getAncestors().push(cur);
    cur = cur.get_child(c > 0);
  }

  for(var i=iter.getAncestors().length - 1; i >= 0; --i) {
    cur = iter.getAncestors()[i];
    if(cmp(item, cur.data) < 0) {
      iter._cursor = cur;
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

  while(cmp(iter.data(), item) === 0) {
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
  if(goog.isNull(res)) {
    return null;
  }
  while(!goog.isNull(res.left)) {
    res = res.left;
  }
  return res.data;
};


/**
 * returns null if tree is empty
 * @return {?number}
 */
vadimg.bintrees.TreeBase.prototype.max = function() {
  var res = this.root_;
  if(goog.isNull(res)) {
    return null;
  }
  while(!goog.isNull(res.right)) {
    res = res.right;
  }
  return res.data;
};


/**
 * calls cb on each node's data, in order
 * @template S
 * @param {!function(?number)} f
 * @param {S=} opt_obj The object to be used as the value of 'this' within f.
 */
vadimg.bintrees.TreeBase.prototype.forEach = function(f,opt_obj) {
  var it=new vadimg.bintrees.Iterator(), data;
  while(!goog.isNull(data = it.next(this.root_))) {
    f.call(opt_obj, data);
  }
};


/**
 * calls cb on each node's data, in reverse order
 * @template S
 * @param {!function(?number)} f
 * @param {S=} opt_obj The object to be used as the value of 'this' within f.
 */
vadimg.bintrees.TreeBase.prototype.forReversedEach = function(f,opt_obj) {
  var it=new vadimg.bintrees.Iterator(), data;
  while(!goog.isNull(data = it.prev(this.root_))) {
    f.call(opt_obj, data);
  }
};


/**
 *
 */
vadimg.bintrees.TreeBase.DEFAULT_COMPARATOR_ = function(a, b) {
  if (String(a) < String(b)) {
    return -1;
  } else if (String(a) > String(b)) {
    return 1;
  }
  return 0;
};
