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

    it('should have single root node with variables',function(){
      var root = tree.root_;
      expect(root.start).to.be(1);
      expect(root.left).to.be(null);
      expect(root.right).to.be(null);
      expect(root.maxEndIncludingChildren_).to.be(2);
      expect(root.endMaxHeap_.peek()).to.be(2);
    });

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
    var tree = new vadimg.bintrees.BinTree();
    var range12 = new goog.math.Range(1,2);
    var range13 = new goog.math.Range(1,3);
    tree.insert(range12);
    tree.insert(range13);

    it('should have single root node with variables',function(){
      var root = tree.root_;
      expect(root.start).to.be(1);
      expect(root.left).to.be(null);
      expect(root.right).to.be(null);
      expect(root.maxEndIncludingChildren_).to.be(3);
      expect(root.endMaxHeap_.peek()).to.be(3);
    });

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
    var tree = new vadimg.bintrees.BinTree();
    var range12 = new goog.math.Range(1,2);
    var range13 = new goog.math.Range(1,3);
    var range04 = new goog.math.Range(0,4);
    tree.insert(range12);
    tree.insert(range13);
    tree.insert(range04);

    it('should have single root node with variables',function(){
      var root = tree.root_;
      expect(root.start).to.be(1);
      expect(root.left).not.to.be(null);
      expect(root.right).to.be(null);
      expect(root.maxEndIncludingChildren_).to.be(4);
      expect(root.endMaxHeap_.peek()).to.be(3);

      expect(root.left.start).to.be(0);
      expect(root.left.left).to.be(null);
      expect(root.left.right).to.be(null);
      expect(root.left.maxEndIncludingChildren_).to.be(4);
      expect(root.left.endMaxHeap_.peek()).to.be(4);
    });

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
    var tree = new vadimg.bintrees.BinTree();
    var range12 = new goog.math.Range(1,2);
    var range13 = new goog.math.Range(1,3);
    var range01 = new goog.math.Range(0,1);
    tree.insert(range12);
    tree.insert(range13);
    tree.insert(range01);

    it('should have single root node with variables',function(){
      var root = tree.root_;
      expect(root.start).to.be(1);
      expect(root.left).not.to.be(null);
      expect(root.right).to.be(null);
      expect(root.maxEndIncludingChildren_).to.be(3);
      expect(root.endMaxHeap_.peek()).to.be(3);

      expect(root.left.start).to.be(0);
      expect(root.left.left).to.be(null);
      expect(root.left.right).to.be(null);
      expect(root.left.maxEndIncludingChildren_).to.be(1);
      expect(root.left.endMaxHeap_.peek()).to.be(1);
    });

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
    var tree = new vadimg.bintrees.BinTree();
    var range12 = new goog.math.Range(1,2);
    var range13 = new goog.math.Range(1,3);
    var range25 = new goog.math.Range(2,5);
    tree.insert(range12);
    tree.insert(range13);
    tree.insert(range25);

    it('should have single root node with variables',function(){
      var root = tree.root_;
      expect(root.start).to.be(1);
      expect(root.left).to.be(null);
      expect(root.right).not.to.be(null);
      expect(root.maxEndIncludingChildren_).to.be(5);
      expect(root.endMaxHeap_.peek()).to.be(3);

      expect(root.right.start).to.be(2);
      expect(root.right.left).to.be(null);
      expect(root.right.right).to.be(null);
      expect(root.right.maxEndIncludingChildren_).to.be(5);
      expect(root.right.endMaxHeap_.peek()).to.be(5);
    });

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
    var tree = new vadimg.bintrees.BinTree();
    var range12 = new goog.math.Range(1,2);
    var range13 = new goog.math.Range(1,3);
    var range45 = new goog.math.Range(4,5);
    tree.insert(range12);
    tree.insert(range13);
    tree.insert(range45);

    it('should have single root node with variables',function(){
      var root = tree.root_;
      expect(root.start).to.be(1);
      expect(root.left).to.be(null);
      expect(root.right).not.to.be(null);
      expect(root.maxEndIncludingChildren_).to.be(5);
      expect(root.endMaxHeap_.peek()).to.be(3);

      expect(root.right.start).to.be(4);
      expect(root.right.left).to.be(null);
      expect(root.right.right).to.be(null);
      expect(root.right.maxEndIncludingChildren_).to.be(5);
      expect(root.right.endMaxHeap_.peek()).to.be(5);
    });

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
});
