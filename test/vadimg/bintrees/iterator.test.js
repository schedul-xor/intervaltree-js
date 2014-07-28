require('nclosure').nclosure({additionalDeps:['deps.js']});
expect = require('expect.js');

goog.require('goog.math.Range');
goog.require('vadimg.bintrees.Iterator');
goog.require('vadimg.bintrees.RBTree');

describe('RBTree',function(){
  var tree = new vadimg.bintrees.RBTree();
  tree.insert(new goog.math.Range(1,4));
  tree.insert(new goog.math.Range(2,10));
  tree.insert(new goog.math.Range(3,4));
  tree.insert(new goog.math.Range(3,5));
  tree.insert(new goog.math.Range(4,9));
  tree.insert(new goog.math.Range(5,9));
  tree.insert(new goog.math.Range(6,7));
  tree.insert(new goog.math.Range(7,9));

  tree.forEach(function(node){
  },this);

  tree.forReversedEach(function(node){
  },this);
});
