goog.provide('vadimg.bintrees.Node');

goog.require('goog.math.Range');



/**
 * @constructor
 * @param {number=} opt_start
 */
vadimg.bintrees.Node = function(opt_start) {
  this.start = opt_start?opt_start:null;
  this.end2range_ = {};
  this.intersectedEnd = goog.isNull(this.start)?null:this.start;
  this.left = null;
  this.right = null;
  this.red = true;
};


/**
 * @param {!goog.math.Range} range
 */
vadimg.bintrees.Node.prototype.addRange = function(range){
  var end = range.end;
  if(goog.object.containsKey(this.end2range_,end)){
    return;
  }
  this.end2range_[end] = range;
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
