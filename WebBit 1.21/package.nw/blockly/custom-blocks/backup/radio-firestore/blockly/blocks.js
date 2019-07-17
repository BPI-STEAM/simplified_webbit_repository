
Blockly.Blocks['radio_channel_set'] = {
  init: function () {
    this.appendValueInput("name_")
      .setCheck(null)
      .appendField("向頻道");
    this.appendValueInput("msg_")
      .setCheck(null)
      .appendField("發送廣播訊息");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
    this.setTooltip("");
    this.setHelpUrl("");
    this.setCommentText("發送廣播訊息後，才會繼續執行下方程式");
  }
};

Blockly.Blocks['radio_channel_get'] = {
  init: function () {
    this.appendValueInput("name_")
      .setCheck(null)
      .appendField("從頻道");
    this.appendDummyInput()
      .appendField("接收廣播訊息");
    this.appendStatementInput("do_")
      .setCheck(null)
      .appendField("執行");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
    this.setTooltip("");
    this.setHelpUrl("");
    this.setCommentText("獨立使用，不需放在迴圈積木內，就能持續偵測頻道。");
  }
};

Blockly.Blocks['radio_channel_value'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("收到的廣播訊息");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(25);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};