goog.provide('vadimg.bintrees.BinTree');

goog.require('goog.asserts');
goog.require('goog.math.Range');
goog.require('vadimg.bintrees.Node');
goog.require('vadimg.bintrees.TreeBase');



/**
 * @constructor
 * @extends {vadimg.bintrees.TreeBase}
 * @param {function(!number,!number):!number=} opt_comparator
 */
vadimg.bintrees.BinTree = function(opt_comparator) {
  goog.base(this,opt_comparator);
};
goog.inherits(vadimg.bintrees.BinTree,vadimg.bintrees.TreeBase);


/**
 * returns true if inserted, false if duplicate
 */
vadimg.bintrees.BinTree.prototype.insert = function(range) {
  goog.asserts.assertInstanceof(range,goog.math.Range);

  var ret = false;

  if(goog.isNull(this.root_)) {
    // empty tree
    this.root_ = new vadimg.bintrees.Node(range.start);
    this.root_.addRange(range);
    this.size++;
    return true;
  }

  var dir = false;

  // setup
  var p = null; // parent
  var node = this.root_;

  // search down
  while(true) {
    if(goog.isNull(node)) {
      // insert new node at the bottom
      node = new vadimg.bintrees.Node(range.start);
      node.addRange(range);
      p.set_child(dir, node);
      ret = true;
      this.size++;
      return true;
    }

    // stop if found
    if(this.comparator_(node.start, range.start) === 0) {
      node.addRange(range);
      return false;
    }

    dir = this.comparator_(node.start, range.start) < 0;

    // update helpers
    p = node;
    node = node.get_child(dir);
  }
};


/**
 * returns true if removed, false if not found
 */
vadimg.bintrees.BinTree.prototype.remove = function(data) {
  if(goog.isNull(this.root_)){
    return false;
  }

  var head = new vadimg.bintrees.Node(); // fake tree root
  var node = head;
  node.right = this.root_;
  var p = null; // parent
  var found = null; // found item
  var dir = true;

  while(!goog.isNull(node.get_child(dir))){
    p = node;
    node = node.get_child(dir);
    var cmp = this.comparator_(data, node.start);
    dir = cmp > 0;

    if(cmp === 0) {
      found = node;
    }
  }

  if(!goog.isNull(found)){
    found.start = node.start;
    p.set_child(p.right === node, node.get_child(goog.isNull(node.left)));

    this.root_ = head.right;
    this.size--;
    return true;
  }else {
    return false;
  }
};
