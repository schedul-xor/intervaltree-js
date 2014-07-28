goog.provide('vadimg.bintrees.Iterator');

goog.require('vadimg.bintrees.Node');



/**
 * @constructor
 */
vadimg.bintrees.Iterator = function() {
  this.ancestors_ = [];
  this.cursor_ = null;
};


/**
 * @return {!Array.<!vadimg.bintrees.Node>}
 */
vadimg.bintrees.Iterator.prototype.getAncestors = function(){
  return this.ancestors_;
};


/**
 * @return {?number}
 */
vadimg.bintrees.Iterator.prototype.data = function() {
  return !goog.isNull(this.cursor_) ? this.cursor_.data : null;
};


/**
 * if null-iterator, returns first node. otherwise, returns next node
 * @param {?vadimg.bintrees.Node} treeRootNode
 * @return {?number}
 */
vadimg.bintrees.Iterator.prototype.next = function(treeRootNode) {
  if(goog.isNull(this.cursor_)) {
    var root = treeRootNode;
    if(!goog.isNull(root)){
      this.minNode_(root);
    }
  }
  else {
    if(goog.isNull(this.cursor_.right)) {
      // no greater node in subtree, go up to parent
      // if coming from a right child, continue up the stack
      var save;
      do {
        save = this.cursor_;
        if(this.ancestors_.length) {
          this.cursor_ = this.ancestors_.pop();
        }
        else {
          this.cursor_ = null;
          break;
        }
      } while(this.cursor_.right === save);
    }
    else {
      // get the next node from the subtree
      this.ancestors_.push(this.cursor_);
      this.minNode_(this.cursor_.right);
    }
  }
  return !goog.isNull(this.cursor_) ? this.cursor_.data : null;
};


/**
 *  if null-iterator, returns last node. otherwise, returns previous node
 * @param {?vadimg.bintrees.Node} treeRootNode
 * @return {?number}
 */
vadimg.bintrees.Iterator.prototype.prev = function(treeRootNode) {
  if(goog.isNull(this.cursor_)) {
    var root = treeRootNode;
    if(!goog.isNull(root)){
      this.maxNode_(root);
    }
  }
  else {
    if(goog.isNull(this.cursor_.left)) {
      var save;
      do {
        save = this.cursor_;
        if(this.ancestors_.length) {
          this.cursor_ = this.ancestors_.pop();
        }
        else {
          this.cursor_ = null;
          break;
        }
      } while(this.cursor_.left === save);
    }
    else {
      this.ancestors_.push(this.cursor_);
      this.maxNode_(this.cursor_.left);
    }
  }
  return !goog.isNull(this.cursor_) ? this.cursor_.data : null;
};


/**
 * @private
 * @param {!vadimg.bintrees.Node} start
 */
vadimg.bintrees.Iterator.prototype.minNode_ = function(start) {
  while(!goog.isNull(start.left)){
    this.ancestors_.push(start);
    start = start.left;
  }
  this.cursor_ = start;
};


/**
 * @private
 * @param {!vadimg.bintrees.Node} start
 */
vadimg.bintrees.Iterator.prototype.maxNode_ = function(start) {
  while(!goog.isNull(start.right)) {
    this.ancestors_.push(start);
    start = start.right;
  }
  this.cursor_ = start;
};
