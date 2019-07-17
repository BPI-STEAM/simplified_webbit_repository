Blockly.Blocks['pin_read_digital'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_PIN_READ)
      .appendField(new Blockly.FieldDropdown(Code.getPinDropdown('digital')), 'pin_')
      .appendField(Blockly.Msg.WEBDUINO_PIN_DIN);
    this.setOutput(true);
    this.setColour(50);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['pin_read_analog'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_PIN_READ)
      .appendField(new Blockly.FieldDropdown(Code.getPinDropdown('analog')), 'pin_')
      .appendField(Blockly.Msg.WEBDUINO_PIN_AIN);
    this.setOutput(true);
    this.setColour(50);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['pin_write_digital'] = {
  init: function () {
    this.appendValueInput("value_")
      .appendField(Blockly.Msg.WEBDUINO_PIN_DIGITAL_WRITE)
      .appendField(new Blockly.FieldDropdown(Code.getPinDropdown('digital')), 'pin_')
      .appendField(Blockly.Msg.WEBDUINO_PIN_VALUE);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(50);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['pin_write_analog'] = {
  init: function () {
    this.appendValueInput("value_")
      .appendField(Blockly.Msg.WEBDUINO_PIN_ANALOG_WRITE)
      .appendField(new Blockly.FieldDropdown(Code.getPinDropdown('pwm')), 'pin_')
      .appendField(Blockly.Msg.WEBDUINO_PIN_VALUE);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(50);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};
