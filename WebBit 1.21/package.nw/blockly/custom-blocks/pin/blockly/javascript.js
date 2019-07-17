Blockly.JavaScript['pin_read_digital'] = function (block) {
  var pin = block.getFieldValue('pin_');
  var code = 'await Pin.init(board, ' + pin + ', 0).read()';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['pin_read_analog'] = function (block) {
  var pin = block.getFieldValue('pin_');
  var code = 'await Pin.init(board, ' + pin + ', 2).read()';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['pin_write_digital'] = function (block) {
  var pin = block.getFieldValue('pin_');
  var value = Blockly.JavaScript.valueToCode(block, 'value_', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'Pin.init(board, ' + pin + ', 1).write(' + value + ');\n';
  return code;
};

Blockly.JavaScript['pin_write_analog'] = function (block) {
  var pin = block.getFieldValue('pin_');
  var value = Blockly.JavaScript.valueToCode(block, 'value_', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'Pin.init(board, ' + pin + ', 3).write(' + value + ');\n';
  return code;
};
