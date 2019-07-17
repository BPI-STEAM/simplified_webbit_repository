Blockly.JavaScript['radio_channel_set'] = function (block) {
  var value_name_ = Blockly.JavaScript.valueToCode(block, 'name_', Blockly.JavaScript.ORDER_ATOMIC);
  var value_msg_ = Blockly.JavaScript.valueToCode(block, 'msg_', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'await radioSet_(' + value_name_ + ', ' + value_msg_ + ');\n' +
    'await radioReset_(' + value_name_ + ');';
  return code;
};

Blockly.JavaScript['radio_channel_get'] = function (block) {
  var value_name_ = Blockly.JavaScript.valueToCode(block, 'name_', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_do_ = Blockly.JavaScript.statementToCode(block, 'do_');
  //Blockly.JavaScript.provideFunction_('fn_radio_reset_'+value_name_, ['await radioReset_('+value_name_+');']);
  var code = 'radioGet_(' + value_name_ + ',async function(radioValue_){\n' +
    statements_do_ + '\n' +
    '});\n';
  return code;
};

Blockly.JavaScript['radio_channel_value'] = function (block) {
  var code = 'radioValue_';
  return [code, Blockly.JavaScript.ORDER_NONE];
};