goog.provide('vadimg.bintrees.RBTree');

goog.require('goog.asserts');
goog.require('goog.math.Range');
goog.require('vadimg.bintrees.Node');
goog.require('vadimg.bintrees.TreeBase');



/**
 * @constructor
 * @extends {vadimg.bintrees.TreeBase}
 * @param {function(!number,!number):!number=} opt_comparator
 */
vadimg.bintrees.RBTree = function(opt_comparator){
  goog.base(this,opt_comparator);
};
goog.inherits(vadimg.bintrees.RBTree,vadimg.bintrees.TreeBase);


/**
 * returns true if inserted, false if duplicate
 * @param {!goog.math.Range} range
 * @return {!boolean}
 */
vadimg.bintrees.RBTree.prototype.insert = function(range) {
  goog.asserts.assertInstanceof(range,goog.math.Range);

  var ret = false;

  if(goog.isNull(this.root_)) {
    // empty tree
    this.root_ = new vadimg.bintrees.Node(range.start);
    this.root_.addRange(range);
    ret = true;
    this.size++;
  }else {
    var head = new vadimg.bintrees.Node(); // fake tree root

    var dir = false;
    var last = false;

    // setup
    var gp = null; // grandparent
    var ggp = head; // grand-grand-parent
    var p = null; // parent
    var node = this.root_;
    ggp.right = this.root_;

    // search down
    while(true) {
      if(goog.isNull(node)) {
        // insert new node at the bottom
        node = new vadimg.bintrees.Node(range.start);
        p.set_child(dir, node);
        ret = true;
        this.size++;
      }else if(vadimg.bintrees.RBTree.is_red(node.left) && vadimg.bintrees.RBTree.is_red(node.right)) {
        // color flip
        node.red = true;
        node.left.red = false;
        node.right.red = false;
      }

      // fix red violation
      if(vadimg.bintrees.RBTree.is_red(node) && vadimg.bintrees.RBTree.is_red(p)) {
        var dir2 = ggp.right === gp;

        if(node === p.get_child(last)) {
          ggp.set_child(dir2, vadimg.bintrees.RBTree.single_rotate(gp, !last));
        }
        else {
          ggp.set_child(dir2, vadimg.bintrees.RBTree.double_rotate(gp, !last));
        }
      }

      var cmp = this.comparator_(node.start, range.start);

      // stop if found
      if(cmp === 0) {
        break;
      }

      last = dir;
      dir = cmp < 0;

      // update helpers
      if(!goog.isNull(gp)) {
        ggp = gp;
      }
      gp = p;
      p = node;
      node = node.get_child(dir);
    }

    // update root
    this.root_ = head.right;
    node.addRange(range);
  }

  // make root black
  this.root_.red = false;

  return ret;
};


/**
 * returns true if removed, false if not found
 * @param {!number} data
 * @return {!boolean}
 */
vadimg.bintrees.RBTree.prototype.remove = function(data) {
    if(goog.isNull(this.root_)) {
        return false;
    }

    var head = new vadimg.bintrees.Node(); // fake tree root
    var node = head;
    node.right = this.root_;
    var p = null; // parent
    var gp = null; // grand parent
    var found = null; // found item
    var dir = true;

    while(!goog.isNull(node.get_child(dir))) {
        var last = dir;

        // update helpers
        gp = p;
        p = node;
        node = node.get_child(dir);

        var cmp = this.comparator_(data, node.start);

        dir = cmp > 0;

        // save found node
        if(cmp === 0) {
            found = node;
        }

        // push the red node down
        if(!vadimg.bintrees.RBTree.is_red(node) && !vadimg.bintrees.RBTree.is_red(node.get_child(dir))) {
            if(vadimg.bintrees.RBTree.is_red(node.get_child(!dir))) {
                var sr = vadimg.bintrees.RBTree.single_rotate(node, dir);
                p.set_child(last, sr);
                p = sr;
            }
            else if(!vadimg.bintrees.RBTree.is_red(node.get_child(!dir))) {
                var sibling = p.get_child(!last);
                if(!goog.isNull(sibling)){
                    if(!vadimg.bintrees.RBTree.is_red(sibling.get_child(!last)) && !vadimg.bintrees.RBTree.is_red(sibling.get_child(last))) {
                        // color flip
                        p.red = false;
                        sibling.red = true;
                        node.red = true;
                    }
                    else {
                        var dir2 = gp.right === p;

                        if(vadimg.bintrees.RBTree.is_red(sibling.get_child(last))) {
                            gp.set_child(dir2, vadimg.bintrees.RBTree.double_rotate(p, last));
                        }
                        else if(vadimg.bintrees.RBTree.is_red(sibling.get_child(!last))) {
                            gp.set_child(dir2, vadimg.bintrees.RBTree.single_rotate(p, last));
                        }

                        // ensure correct coloring
                        var gpc = gp.get_child(dir2);
                        gpc.red = true;
                        node.red = true;
                        gpc.left.red = false;
                        gpc.right.red = false;
                    }
                }
            }
        }
    }

    // replace and remove if found
    if(!goog.isNull(found)){
        found.data = node.data;
        p.set_child(p.right === node, node.get_child(goog.isNull(node.left)));
        this.size--;
    }

    // update root and make it black
    this.root_ = head.right;
    if(!goog.isNull(this.root_)) {
        this.root_.red = false;
    }

    return !goog.isNull(found);
};


/**
 * @param {?vadimg.bintrees.Node} node
 * @return {!boolean}
 */
vadimg.bintrees.RBTree.is_red = function(node) {
    return !goog.isNull(node) && node.red;
};


/**
 * @param {?vadimg.bintrees.Node} root
 * @param {!boolean} dir
 * @return {!vadimg.bintrees.Node}
 */
vadimg.bintrees.RBTree.single_rotate = function(root, dir) {
    var save = root.get_child(!dir);

    root.set_child(!dir, save.get_child(dir));
    save.set_child(dir, root);

    root.red = true;
    save.red = false;

    return save;
};


/**
 * @param {?vadimg.bintrees.Node} root
 * @param {!boolean} dir
 * @return {!vadimg.bintrees.Node}
 */
vadimg.bintrees.RBTree.double_rotate = function(root, dir) {
    root.set_child(!dir, vadimg.bintrees.RBTree.single_rotate(root.get_child(!dir), !dir));
    return vadimg.bintrees.RBTree.single_rotate(root, dir);
};
