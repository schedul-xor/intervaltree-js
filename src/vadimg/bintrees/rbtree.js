goog.provide('vadimg.bintrees.RBTree');

goog.require('vadimg.bintrees.Node');
goog.require('vadimg.bintrees.TreeBase');



/**
 * @constructor
 * @extends {vadimg.bintrees.TreeBase}
 * @template T
 * @param {function(!T,!T):!number=} opt_comparator
 */
vadimg.bintrees.RBTree = function(opt_comparator){
  goog.base(this,opt_comparator);
};
goog.inherits(vadimg.bintrees.RBTree,vadimg.bintrees.TreeBase);


/**
 * returns true if inserted, false if duplicate
 */
vadimg.bintrees.RBTree.prototype.insert = function(data) {
    var ret = false;

    if(this._root === null) {
        // empty tree
        this._root = new vadimg.bintrees.Node(data);
        ret = true;
        this.size++;
    }
    else {
        var head = new vadimg.bintrees.Node(undefined); // fake tree root

        var dir = 0;
        var last = 0;

        // setup
        var gp = null; // grandparent
        var ggp = head; // grand-grand-parent
        var p = null; // parent
        var node = this._root;
        ggp.right = this._root;

        // search down
        while(true) {
            if(node === null) {
                // insert new node at the bottom
                node = new vadimg.bintrees.Node(data);
                p.set_child(dir, node);
                ret = true;
                this.size++;
            }
            else if(vadimg.bintrees.RBTree.is_red(node.left) && vadimg.bintrees.RBTree.is_red(node.right)) {
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

            var cmp = this._comparator(node.data, data);

            // stop if found
            if(cmp === 0) {
                break;
            }

            last = dir;
            dir = cmp < 0;

            // update helpers
            if(gp !== null) {
                ggp = gp;
            }
            gp = p;
            p = node;
            node = node.get_child(dir);
        }

        // update root
        this._root = head.right;
    }

    // make root black
    this._root.red = false;

    return ret;
};


/**
 * returns true if removed, false if not found
 */
vadimg.bintrees.RBTree.prototype.remove = function(data) {
    if(this._root === null) {
        return false;
    }

    var head = new vadimg.bintrees.Node(undefined); // fake tree root
    var node = head;
    node.right = this._root;
    var p = null; // parent
    var gp = null; // grand parent
    var found = null; // found item
    var dir = 1;

    while(node.get_child(dir) !== null) {
        var last = dir;

        // update helpers
        gp = p;
        p = node;
        node = node.get_child(dir);

        var cmp = this._comparator(data, node.data);

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
                if(sibling !== null) {
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
    if(found !== null) {
        found.data = node.data;
        p.set_child(p.right === node, node.get_child(node.left === null));
        this.size--;
    }

    // update root and make it black
    this._root = head.right;
    if(this._root !== null) {
        this._root.red = false;
    }

    return found !== null;
};


/**
 *
 */
vadimg.bintrees.RBTree.is_red = function(node) {
    return node !== null && node.red;
};


/**
 *
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
 *
 */
vadimg.bintrees.RBTree.double_rotate = function(root, dir) {
    root.set_child(!dir, vadimg.bintrees.RBTree.single_rotate(root.get_child(!dir), !dir));
    return vadimg.bintrees.RBTree.single_rotate(root, dir);
};
