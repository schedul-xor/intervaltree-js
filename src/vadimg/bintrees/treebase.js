goog.provide('vadimg.bintrees.TreeBase');

goog.require('vadimg.bintrees.Iterator');



/**
 * @constructor
 * @template T
 * @param {function(!T,!T):!number=} opt_comparator
 */
vadimg.bintrees.TreeBase = function(opt_comparator) {
  this._root = null;
  this._comparator = opt_comparator?opt_comparator:vadimg.bintrees.TreeBase.DEFAULT_COMPARATOR_;
};


/**
 * removes all nodes from the tree
 */
vadimg.bintrees.TreeBase.prototype.clear = function() {
    this._root = null;
    this.size = 0;
};


/**
 * returns node data if found, null otherwise
 */
vadimg.bintrees.TreeBase.prototype.find = function(data) {
    var res = this._root;

    while(res !== null) {
        var c = this._comparator(data, res.data);
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
 */
vadimg.bintrees.TreeBase.prototype.findIter = function(data) {
    var res = this._root;
    var iter = this.iterator();

    while(res !== null) {
        var c = this._comparator(data, res.data);
        if(c === 0) {
            iter._cursor = res;
            return iter;
        }
        else {
            iter._ancestors.push(res);
            res = res.get_child(c > 0);
        }
    }

    return null;
};


/**
 * Returns an interator to the tree node at or immediately after the item
 */
vadimg.bintrees.TreeBase.prototype.lowerBound = function(item) {
    var cur = this._root;
    var iter = this.iterator();
    var cmp = this._comparator;

    while(cur !== null) {
        var c = cmp(item, cur.data);
        if(c === 0) {
            iter._cursor = cur;
            return iter;
        }
        iter._ancestors.push(cur);
        cur = cur.get_child(c > 0);
    }

    for(var i=iter._ancestors.length - 1; i >= 0; --i) {
        cur = iter._ancestors[i];
        if(cmp(item, cur.data) < 0) {
            iter._cursor = cur;
            iter._ancestors.length = i;
            return iter;
        }
    }

    iter._ancestors.length = 0;
    return iter;
};


/**
 * Returns an interator to the tree node immediately after the item
 */
vadimg.bintrees.TreeBase.prototype.upperBound = function(item) {
    var iter = this.lowerBound(item);
    var cmp = this._comparator;

    while(cmp(iter.data(), item) === 0) {
        iter.next();
    }

    return iter;
};


/**
 * returns null if tree is empty
 */
vadimg.bintrees.TreeBase.prototype.min = function() {
    var res = this._root;
    if(res === null) {
        return null;
    }

    while(res.left !== null) {
        res = res.left;
    }

    return res.data;
};


/**
 * returns null if tree is empty
 */
vadimg.bintrees.TreeBase.prototype.max = function() {
    var res = this._root;
    if(res === null) {
        return null;
    }

    while(res.right !== null) {
        res = res.right;
    }

    return res.data;
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


/**
 * returns a null iterator. call next() or prev() to point to an element
 */
vadimg.bintrees.TreeBase.prototype.iterator = function() {
    return new vadimg.bintrees.Iterator();
};


/**
 * calls cb on each node's data, in order
 */
vadimg.bintrees.TreeBase.prototype.each = function(cb) {
    var it=this.iterator(), data;
    while((data = it.next(this._root)) !== null) {
        cb(data);
    }
};


/**
 * calls cb on each node's data, in reverse order
 */
vadimg.bintrees.TreeBase.prototype.reach = function(cb) {
    var it=this.iterator(), data;
    while((data = it.prev(this._root)) !== null) {
        cb(data);
    }
};
