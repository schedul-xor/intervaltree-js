require('nclosure').nclosure({additionalDeps:['deps.js']});
expect = require('expect.js');

goog.require('goog.math.Range');
goog.require('vadimg.bintrees.Iterator');
goog.require('vadimg.bintrees.RBTree');

describe('RBTree',function(){
  var tree = new vadimg.bintrees.RBTree();
  tree.insert(new goog.math.Range(2,4));
  tree.insert(new goog.math.Range(5,10));
  tree.insert(new goog.math.Range(1,3));
  tree.insert(new goog.math.Range(2,5));
  tree.insert(new goog.math.Range(8,9));

  tree.forEach(function(node){
  },this);

  tree.forReversedEach(function(node){
  },this);
});
