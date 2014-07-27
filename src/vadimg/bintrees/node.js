goog.provide('vadimg.bintrees.Node');



/**
 * @constructor
 * @param {number=} opt_data
 * @param {!number=} opt_myEnd
 */
vadimg.bintrees.Node = function(opt_data,opt_myEnd) {
  this.data = opt_data?opt_data:null;
  this.myEnd = opt_myEnd?opt_myEnd:null;
  this.intersectedEnd = this.myEnd;
  this.left = null;
  this.right = null;
  this.red = true;
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
