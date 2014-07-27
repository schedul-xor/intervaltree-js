goog.provide('vadimg.bintrees.Node');



/**
 * @constructor
 */
vadimg.bintrees.Node = function(data) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.red = true;
}


/**
 *
 */
vadimg.bintrees.Node.prototype.get_child = function(dir) {
    return dir ? this.right : this.left;
};


/**
 *
 */
vadimg.bintrees.Node.prototype.set_child = function(dir, val) {
    if(dir) {
        this.right = val;
    }
    else {
        this.left = val;
    }
};
