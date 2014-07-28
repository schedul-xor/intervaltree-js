require('nclosure').nclosure({additionalDeps:['deps.js']});
expect = require('expect.js');

goog.require('goog.math.Range');
goog.require('vadimg.bintrees.Iterator');
goog.require('vadimg.bintrees.BinTree');

describe('vadimg.bintrees.BinTree',function(){
  describe('with [1,2) only inserted',function(){
    var tree = new vadimg.bintrees.BinTree();
    var range = new goog.math.Range(1,2);
    tree.insert(range);

    it('should return nothing when searching with 0.9',function(){
      var found = tree.find(0.9);
      expect(found).to.be.empty();
    });

    it('should return one when searching with 1',function(){
      var found = tree.find(1);
      expect(found).not.to.be.empty();
    });

    it('should return one when searching with 1.1',function(){
      var found = tree.find(1.1);
      expect(found).not.to.be.empty();
    });

    it('should return nothing when searching with 1.2',function(){
      var found = tree.find(1.2);
      expect(found).to.be.empty();
    });
  });

  describe('with [1,2) and [1,3) inserted',function(){
    var tree = new vadimg.bintrees.BinTree();
    var range12 = new goog.math.Range(1,2);
    var range13 = new goog.math.Range(1,3);
    tree.insert(range12);
    tree.insert(range13);

    it('should return nothing when searching with 0.9',function(){
      var found = tree.find(0.9);
      expect(found).to.be.empty();
    });

    it('should return 2 resultswhen searching with 1',function(){
      var found = tree.find(1);
      expect(found.length).to.be(2);
    });

    it('should return 2 results when searching with 1.1',function(){
      var found = tree.find(1.1);
      expect(found.length).to.be(2);
    });

    it('should return 1 result when searching with 1.2',function(){
      var found = tree.find(1.2);
      expect(found.length).to.be(1);
    });

    it('should return nothing when searching with 1.3',function(){
      var found = tree.find(1.3);
      expect(found).to.be.empty();
    });
  });
});
