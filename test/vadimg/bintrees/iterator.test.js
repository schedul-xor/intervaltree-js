require('nclosure').nclosure({additionalDeps:['deps.js']});
expect = require('expect.js');

goog.require('vadimg.bintrees.Iterator');
goog.require('vadimg.bintrees.RBTree');

describe('RBTree',function(){
  var tree = new vadimg.bintrees.RBTree();
  tree.insert(1);
  tree.insert(2);
  tree.insert(3);
  tree.insert(5);
  tree.insert(8);

  
});
