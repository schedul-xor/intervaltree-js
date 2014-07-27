goog.require('goog.dom');
goog.require('goog.ui.Button');
goog.require('goog.ui.LabelInput');
goog.require('vadimg.bintrees.RBTree');



var inputDom = goog.dom.getElement('input');
var inputLabelInput = new goog.ui.LabelInput('target');
inputLabelInput.render(inputDom);

var seedDom = goog.dom.getElement('seed');
var seedLabelInput = new goog.ui.LabelInput('seed');
seedLabelInput.render(seedDom);
seedLabelInput.setValue('100');

var outputDom = goog.dom.getElement('output');
var outputLabelInput = new goog.ui.LabelInput('');
outputLabelInput.render(outputDom);

var i2oButtonDom = goog.dom.getElement('i2o');
var i2oButton = new goog.ui.Button('->');
i2oButton.render(i2oButtonDom);

goog.events.listen(i2oButton, goog.ui.Component.EventType.ACTION, function() {
  var inputString = inputLabelInput.getValue();
  var seed = Number(seedLabelInput.getValue());
});
