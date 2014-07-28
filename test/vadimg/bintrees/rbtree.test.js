require('nclosure').nclosure({additionalDeps:['deps.js']});
expect = require('expect.js');

goog.require('goog.math.Range');
goog.require('vadimg.bintrees.Iterator');
goog.require('vadimg.bintrees.RBTree');

describe('vadimg.bintrees.RBTree',function(){
  describe('with [1,2) only inserted',function(){
    var tree = new vadimg.bintrees.RBTree();
    var range = new goog.math.Range(1,2);
    tree.insert(range);

    it('should return nothing when searching with 0.9',function(){
      var found = tree.find(0.9);
      expect(found).to.be.empty();
      found = tree.find(0.9);
      expect(found).to.be.empty();
    });

    it('should return one when searching with 1',function(){
      var found = tree.find(1);
      expect(found).not.to.be.empty();
      found = tree.find(1);
      expect(found).not.to.be.empty();
    });

    it('should return one when searching with 1.1',function(){
      var found = tree.find(1.1);
      expect(found).not.to.be.empty();
      found = tree.find(1.1);
      expect(found).not.to.be.empty();
    });

    it('should return nothing when searching with 2',function(){
      var found = tree.find(2);
      expect(found).to.be.empty();
      found = tree.find(2);
      expect(found).to.be.empty();
    });
  });

  describe('with [1,2) and [1,3) inserted',function(){
    var tree = new vadimg.bintrees.RBTree();
    var range12 = new goog.math.Range(1,2);
    var range13 = new goog.math.Range(1,3);
    tree.insert(range12);
    tree.insert(range13);

    it('should return nothing when searching with 0.9',function(){
      var found = tree.find(0.9);
      expect(found).to.be.empty();
      found = tree.find(0.9);
      expect(found).to.be.empty();
    });

    it('should return 2 resultswhen searching with 1',function(){
      var found = tree.find(1);
      expect(found.length).to.be(2);
      found = tree.find(1);
      expect(found.length).to.be(2);
    });

    it('should return 2 results when searching with 1.1',function(){
      var found = tree.find(1.1);
      expect(found.length).to.be(2);
      found = tree.find(1.1);
      expect(found.length).to.be(2);
    });

    it('should return 1 result when searching with 2',function(){
      var found = tree.find(2);
      expect(found.length).to.be(1);
      found = tree.find(2);
      expect(found.length).to.be(1);
    });

    it('should return nothing when searching with 3',function(){
      var found = tree.find(3);
      expect(found).to.be.empty();
      found = tree.find(3);
      expect(found).to.be.empty();
    });
  });

  describe('with [1,2), [1,3) and [0,4) inserted',function(){
    var tree = new vadimg.bintrees.RBTree();
    var range12 = new goog.math.Range(1,2);
    var range13 = new goog.math.Range(1,3);
    var range04 = new goog.math.Range(0,4);
    tree.insert(range12);
    tree.insert(range13);
    tree.insert(range04);

    it('should return nothing when searching with -0.1',function(){
      var found = tree.find(-0.1);
      expect(found).to.be.empty();
      found = tree.find(-0.1);
      expect(found).to.be.empty();
    });
    it('should return 1 result when searching with 0.9',function(){
      var found = tree.find(0.9);
      expect(found.length).to.be(1);
      found = tree.find(0.9);
      expect(found.length).to.be(1);
    });

    it('should return 3 resultswhen searching with 1',function(){
      var found = tree.find(1);
      expect(found.length).to.be(3);
      found = tree.find(1);
      expect(found.length).to.be(3);
    });

    it('should return 3 results when searching with 1.1',function(){
      var found = tree.find(1.1);
      expect(found.length).to.be(3);
      found = tree.find(1.1);
      expect(found.length).to.be(3);
    });

    it('should return 2 result when searching with 2',function(){
      var found = tree.find(2);
      expect(found.length).to.be(2);
      found = tree.find(2);
      expect(found.length).to.be(2);
    });

    it('should return 1 result when searching with 3',function(){
      var found = tree.find(3);
      expect(found.length).to.be(1);
      found = tree.find(3);
      expect(found.length).to.be(1);
    });

    it('should return nothing when searching with 4',function(){
      var found = tree.find(4);
      expect(found).to.be.empty();
      found = tree.find(4);
      expect(found).to.be.empty();
    });
  });

  describe('with [1,2), [1,3) and [0,1) inserted',function(){
    var tree = new vadimg.bintrees.RBTree();
    var range12 = new goog.math.Range(1,2);
    var range13 = new goog.math.Range(1,3);
    var range01 = new goog.math.Range(0,1);
    tree.insert(range12);
    tree.insert(range13);
    tree.insert(range01);

    it('should return nothing when searching with -0.1',function(){
      var found = tree.find(-0.1);
      expect(found).to.be.empty();
      found = tree.find(-0.1);
      expect(found).to.be.empty();
    });
    it('should return 1 result when searching with 0.9',function(){
      var found = tree.find(0.9);
      expect(found.length).to.be(1);
      found = tree.find(0.9);
      expect(found.length).to.be(1);
    });

    it('should return 2 resultswhen searching with 1',function(){
      var found = tree.find(1);
      expect(found.length).to.be(2);
      found = tree.find(1);
      expect(found.length).to.be(2);
    });

    it('should return 2 results when searching with 1.1',function(){
      var found = tree.find(1.1);
      expect(found.length).to.be(2);
      found = tree.find(1.1);
      expect(found.length).to.be(2);
    });

    it('should return 1 result when searching with 2',function(){
      var found = tree.find(2);
      expect(found.length).to.be(1);
      found = tree.find(2);
      expect(found.length).to.be(1);
    });

    it('should return nothing when searching with 3',function(){
      var found = tree.find(3);
      expect(found).to.be.empty();
      found = tree.find(3);
      expect(found).to.be.empty();
    });
  });

  describe('with [1,2), [1,3) and [2,5) inserted',function(){
    var tree = new vadimg.bintrees.RBTree();
    var range12 = new goog.math.Range(1,2);
    var range13 = new goog.math.Range(1,3);
    var range25 = new goog.math.Range(2,5);
    tree.insert(range12);
    tree.insert(range13);
    tree.insert(range25);

    it('should return nothing when searching with 0.9',function(){
      var found = tree.find(0.9);
      expect(found).to.be.empty();
      found = tree.find(0.9);
      expect(found).to.be.empty();
    });

    it('should return 2 resultswhen searching with 1',function(){
      var found = tree.find(1);
      expect(found.length).to.be(2);
      found = tree.find(1);
      expect(found.length).to.be(2);
    });

    it('should return 2 results when searching with 1.1',function(){
      var found = tree.find(1.1);
      expect(found.length).to.be(2);
      found = tree.find(1.1);
      expect(found.length).to.be(2);
    });

    it('should return 2 results when searching with 2',function(){
      var found = tree.find(2);
      expect(found.length).to.be(2);
      found = tree.find(2);
      expect(found.length).to.be(2);
    });

    it('should return 1 result when searching with 3',function(){
      var found = tree.find(3);
      expect(found.length).to.be(1);
      found = tree.find(3);
      expect(found.length).to.be(1);
    });

    it('should return nothing when searching with 5',function(){
      var found = tree.find(5);
      expect(found).to.be.empty();
      found = tree.find(5);
      expect(found).to.be.empty();
    });
  });

  describe('with [1,2), [1,3) and [4,5) inserted',function(){
    var tree = new vadimg.bintrees.RBTree();
    var range12 = new goog.math.Range(1,2);
    var range13 = new goog.math.Range(1,3);
    var range45 = new goog.math.Range(4,5);
    tree.insert(range12);
    tree.insert(range13);
    tree.insert(range45);

    it('should return nothing when searching with 0.9',function(){
      var found = tree.find(0.9);
      expect(found).to.be.empty();
      found = tree.find(0.9);
      expect(found).to.be.empty();
    });

    it('should return 2 results when searching with 1',function(){
      var found = tree.find(1);
      expect(found.length).to.be(2);
      found = tree.find(1);
      expect(found.length).to.be(2);
    });

    it('should return 2 results when searching with 1.1',function(){
      var found = tree.find(1.1);
      expect(found.length).to.be(2);
      found = tree.find(1.1);
      expect(found.length).to.be(2);
    });

    it('should return 1 result when searching with 2',function(){
      var found = tree.find(2);
      expect(found.length).to.be(1);
      found = tree.find(2);
      expect(found.length).to.be(1);
    });

    it('should return nothing when searching with 3',function(){
      var found = tree.find(3);
      expect(found).to.be.empty();
      found = tree.find(3);
      expect(found).to.be.empty();
    });

    it('should return 1 result when searching with 4',function(){
      var found = tree.find(4);
      expect(found.length).to.be(1);
      found = tree.find(4);
      expect(found.length).to.be(1);
    });

    it('should return nothing when searching with 5',function(){
      var found = tree.find(5);
      expect(found).to.be.empty();
      found = tree.find(5);
      expect(found).to.be.empty();
    });
  });

  describe('with [3,4), [3,5), [1,4), [2,3), [5,7), [4,8) inserted',function(){
    var tree = new vadimg.bintrees.RBTree();
    tree.insert(new goog.math.Range(3,4));
    tree.insert(new goog.math.Range(3,5));
    tree.insert(new goog.math.Range(1,4));
    tree.insert(new goog.math.Range(2,3));
    tree.insert(new goog.math.Range(5,7));
    tree.insert(new goog.math.Range(4,8));

    it('should return nothing when searching with 0.9',function(){
      var found = tree.find(0.9);
      expect(found).to.be.empty();
      found = tree.find(0.9);
      expect(found).to.be.empty();
    });

    it('should return 1 result when searching with 1',function(){
      var found = tree.find(1);
      expect(found.length).to.be(1);
      found = tree.find(1);
      expect(found.length).to.be(1);
    });

    it('should return 1 result when searching with 1.1',function(){
      var found = tree.find(1.1);
      expect(found.length).to.be(1);
      found = tree.find(1.1);
      expect(found.length).to.be(1);
    });

    it('should return 2 results when searching with 2',function(){
      var found = tree.find(2);
      expect(found.length).to.be(2);
      found = tree.find(2);
      expect(found.length).to.be(2);
    });

    it('should return 3 results when searching with 3',function(){
      var found = tree.find(3);
      expect(found.length).to.be(3);
      found = tree.find(3);
      expect(found.length).to.be(3);
    });

    it('should return 2 results when searching with 4',function(){
      var found = tree.find(4);
      expect(found.length).to.be(2);
      found = tree.find(4);
      expect(found.length).to.be(2);
    });

    it('should return 2 results when searching with 5',function(){
      var found = tree.find(5);
      expect(found.length).to.be(2);
      found = tree.find(5);
      expect(found.length).to.be(2);
    });

  });
  describe('with [1,4), [2,3), [3,4), [3,5), [4,8), [5,7) inserted',function(){
    var tree = new vadimg.bintrees.RBTree();
    tree.insert(new goog.math.Range(1,4));
    tree.insert(new goog.math.Range(2,3));
    tree.insert(new goog.math.Range(3,4));
    tree.insert(new goog.math.Range(3,5));
    tree.insert(new goog.math.Range(4,8));
    tree.insert(new goog.math.Range(5,7));

    it('should return nothing when searching with 0.9',function(){
      var found = tree.find(0.9);
      expect(found).to.be.empty();
      found = tree.find(0.9);
      expect(found).to.be.empty();
    });

    it('should return 1 result when searching with 1',function(){
      var found = tree.find(1);
      expect(found.length).to.be(1);
      found = tree.find(1);
      expect(found.length).to.be(1);
    });

    it('should return 1 result when searching with 1.1',function(){
      var found = tree.find(1.1);
      expect(found.length).to.be(1);
      found = tree.find(1.1);
      expect(found.length).to.be(1);
    });

    it('should return 2 results when searching with 2',function(){
      var found = tree.find(2);
      expect(found.length).to.be(2);
      found = tree.find(2);
      expect(found.length).to.be(2);
    });

    it('should return 3 results when searching with 3',function(){
      var found = tree.find(3);
      expect(found.length).to.be(3);
      found = tree.find(3);
      expect(found.length).to.be(3);
    });

    it('should return 2 results when searching with 4',function(){
      var found = tree.find(4);
      expect(found.length).to.be(2);
      found = tree.find(4);
      expect(found.length).to.be(2);
    });

    it('should return 2 results when searching with 5',function(){
      var found = tree.find(5);
      expect(found.length).to.be(2);
      found = tree.find(5);
      expect(found.length).to.be(2);
    });

  });
});
