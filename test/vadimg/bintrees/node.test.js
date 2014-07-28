require('nclosure').nclosure({additionalDeps:['deps.js']});
expect = require('expect.js');

goog.require('goog.math.Range');
goog.require('vadimg.bintrees.Node');

describe('Node',function(){
  it('should return valid maxValue for single node',function(){
    var range34 = new goog.math.Range(3,4);
    var node1 = new vadimg.bintrees.Node(range34.start);
    node1.addRange(range34);
    expect(node1.getMaxEndIncludingChildren()).to.be(4);
    var range35 = new goog.math.Range(3,5);
    node1.addRange(range35);
    expect(node1.getMaxEndIncludingChildren()).to.be(5);
    node1.removeRange(range35);
    expect(node1.getMaxEndIncludingChildren()).to.be(4);
  });
});
