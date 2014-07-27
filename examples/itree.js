goog.require('goog.dom');
goog.require('goog.math.Range');
goog.require('goog.ui.Button');
goog.require('goog.ui.LabelInput');
goog.require('vadimg.bintrees.RBTree');



var tree = new vadimg.bintrees.RBTree();

var rangeInputDom = goog.dom.getElement('range_input');
var rangeInputLabelInput = new goog.ui.LabelInput('min,max');
rangeInputLabelInput.render(rangeInputDom);

var rangeInputButtonDom = goog.dom.getElement('range_input_button');
var rangeInputButton = new goog.ui.Button('Input');
rangeInputButton.render(rangeInputButtonDom);

goog.events.listen(rangeInputButton, goog.ui.Component.EventType.ACTION, function() {
  var inputString = rangeInputLabelInput.getValue();
  var a = inputString.split(',');
  var min = Number(a[0]);
  var max = Number(a[1]);
  var range = new goog.math.Range(min,max);
  tree.insert(range);
});

var pointInputDom = goog.dom.getElement('point_input');
var pointInputLabelInput = new goog.ui.LabelInput('search');
pointInputLabelInput.render(pointInputDom);
pointInputLabelInput.setValue('100');

var outputDom = goog.dom.getElement('matched');
var outputLabelInput = new goog.ui.LabelInput('');
outputLabelInput.render(outputDom);

var pointInputButtonDom = goog.dom.getElement('point_input_button');
var pointInputButton = new goog.ui.Button('Search');
pointInputButton.render(pointInputButtonDom);

goog.events.listen(pointInputButton, goog.ui.Component.EventType.ACTION, function() {
  var inputString = pointInputLabelInput.getValue();
  var input = Number(inputString);
  var searchedResult = tree.find(input);
  outputLabelInput.setValue(searchedResult);
});
