/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var mathColor = '#cf4ad9';

/**
 * @fileoverview Math blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
if (!Blockly.Language) 
  Blockly.Language = {};

Blockly.Language.math_number = {
  // Numeric value.
  categoryName: Blockly.LANG_CATEGORY_MATH,
  categoryID: 'math',
  helpUrl: Blockly.LANG_MATH_NUMBER_HELPURL,
  init: function() {
    this.setColour(mathColor);
    this.appendTitle(Blockly.LANG_MATH_NUMBER_VALUE);
    this.appendTitle(new Blockly.FieldTextInput('0', Blockly.Language.math_number.validator), 'NUM');
    this.setOutput(true, Number);
    this.setTooltip(Blockly.LANG_MATH_NUMBER_TOOLTIP_1);
  }
};

Blockly.Language.math_number.validator = function(text) {
  // Ensure that only a number may be entered.
  // TODO: Handle cases like 'o', 'ten', '1,234', '3,14', etc.
  var n = window.parseFloat(text || 0);
  return window.isNaN(n) ? null : String(n);
};

Blockly.Language.math_arithmetic = {
  // Basic arithmetic operator.
  categoryName: Blockly.LANG_CATEGORY_MATH,
  categoryID: 'math',
  helpUrl: Blockly.LANG_MATH_ARITHMETIC_HELPURL,
  init: function() {
    this.setColour(mathColor);
    this.setOutput(true, Number);
    this.appendInput('', Blockly.INPUT_VALUE, 'A', Number);
    var dropdown = new Blockly.FieldDropdown(this.OPERATORS);
    this.appendInput([dropdown, 'OP'], Blockly.INPUT_VALUE, 'B', Number);
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getTitleValue('OP');
      return Blockly.Language.math_arithmetic.TOOLTIPS[mode];
    });
  }
};

Blockly.Language.math_arithmetic.OPERATORS = [['+', 'ADD'], ['-', 'MINUS'], ['\u00D7', 'MULTIPLY'], ['\u00F7', 'DIVIDE'], [Blockly.LANG_MATH_POW, 'POWER']];

Blockly.Language.math_arithmetic.TOOLTIPS = {
  ADD: Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_ADD,
  MINUS: Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_MINUS,
  MULTIPLY: Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_MULTIPLY,
  DIVIDE: Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_DIVIDE,
  POWER: Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_POWER
};

Blockly.Language.math_modulo = {
  // Remainder of a division.
  categoryName: Blockly.LANG_CATEGORY_MATH,
  categoryID: 'math',
  helpUrl: Blockly.LANG_MATH_MODULO_HELPURL,
  init: function() {
    this.setColour(mathColor);
    this.setOutput(true, Number);
    this.appendInput('', Blockly.INPUT_VALUE, 'DIVIDEND', Number);
    this.appendInput(Blockly.LANG_MATH_MODULO_TITLE1, Blockly.INPUT_VALUE, 'DIVISOR', Number);
    this.appendInput(Blockly.LANG_MATH_MODULO_TITLE2, Blockly.DUMMY_INPUT, '', null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.LANG_MATH_MODULO_TOOLTIP_1);
  }
};

Blockly.Language.math_single = {
  // Advanced math operators with single operand.
  categoryName: Blockly.LANG_CATEGORY_MATH,
  categoryID: 'math',
  helpUrl: Blockly.LANG_MATH_SINGLE_HELPURL,
  init: function() {
    this.setColour(mathColor);
    this.setOutput(true, Number);
    this.appendInput('', Blockly.INPUT_VALUE, 'NUM', Number);
    var dropdown = new Blockly.FieldDropdown(this.OPERATORS);
    this.appendInput([dropdown, 'OP'], Blockly.DUMMY_INPUT, 'NUM', Number);
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getTitleValue('OP');
      return Blockly.Language.math_single.TOOLTIPS[mode];
    });
  }
};

Blockly.Language.math_single.OPERATORS = [[Blockly.LANG_MATH_SINGLE_OP_ABSOLUTE, 'ABS'], [Blockly.LANG_MATH_SINGLE_OP_ROOT, 'ROOT'], [Blockly.LANG_MATH_SINGLE_OPERATOR_ROUND, 'ROUND'], [Blockly.LANG_MATH_SINGLE_OPERATOR_ROUNDUP, 'ROUNDUP'], [Blockly.LANG_MATH_SINGLE_OPERATOR_ROUNDDOWN, 'ROUNDDOWN'], [Blockly.LANG_MATH_SINGLE_OP_NEG, 'NEG'], [Blockly.LANG_MATH_SINGLE_OP_LN, 'LN'], [Blockly.LANG_MATH_SINGLE_OP_LOG10, 'LOG10'], [Blockly.LANG_MATH_SINGLE_OP_EXP, 'EXP']];
//['10^', 'POW10'] Exceptionがでるので外した

Blockly.Language.math_single.TOOLTIPS = {
  ABS: Blockly.LANG_MATH_SINGLE_TOOLTIP_ABS,
  ROOT: Blockly.LANG_MATH_SINGLE_TOOLTIP_ROOT,
  NEG: Blockly.LANG_MATH_SINGLE_TOOLTIP_NEG,
  LN: Blockly.LANG_MATH_SINGLE_TOOLTIP_LN,
  LOG10: Blockly.LANG_MATH_SINGLE_TOOLTIP_LOG10,
  EXP: Blockly.LANG_MATH_SINGLE_TOOLTIP_EXP,
  //POW10: Blockly.LANG_MATH_SINGLE_TOOLTIP_POW10  Exceptionがでるので外した
  ROUND: Blockly.LANG_MATH_SINGLE_TOOLTIP_ROUND,
  ROUNDUP: Blockly.LANG_MATH_SINGLE_TOOLTIP_ROUNDUP,
  ROUNDDOWN: Blockly.LANG_MATH_SINGLE_TOOLTIP_ROUNDDOWN
};

//parseIntとparseFloat（オリジナル）
Blockly.Language.math_parse = {
  categoryName: Blockly.LANG_CATEGORY_MATH,
  categoryID: 'math',
  helpUrl: Blockly.LANG_MATH_NUMBER_HELPURL,
  init: function() {
    this.setColour(mathColor);
    this.appendInput('', Blockly.INPUT_VALUE, 'VALUE', null);
    this.appendInput(Blockly.LANG_MATH_PARSE_TITLE1, Blockly.DUMMY_INPUT, '', null);
    var dropdown = new Blockly.FieldDropdown(this.OPERATORS);
    this.appendInput([dropdown, 'TYPE'], Blockly.DUMMY_INPUT, '', Number);
    this.setOutput(true, Number);
    this.appendInput(Blockly.LANG_MATH_PARSE_TITLE2, Blockly.DUMMY_INPUT, '', null);
    this.setInputsInline(true);
    
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var type = thisBlock.getTitleValue('TYPE');
      return Blockly.Language.math_parse.TOOLTIPS[type];
    });
  }
};

Blockly.Language.math_parse.OPERATORS = [[Blockly.LANG_MATH_PARSE_TYPE_INT, 'INT'], [Blockly.LANG_MATH_PARSE_TYPE_FLOAT, 'FLOAT']];
Blockly.Language.math_parse.TOOLTIPS = {
  INT: Blockly.LANG_MATH_PARSE_TOOLTIP_INT,
  FLOAT: Blockly.LANG_MATH_PARSE_TOOLTIP_FLOAT
};

Blockly.Language.math_trig = {
  // Trigonometry operators.
  categoryName: Blockly.LANG_CATEGORY_MATH,
  categoryID: 'math',
  helpUrl: Blockly.LANG_MATH_TRIG_HELPURL,
  init: function() {
    this.setColour(mathColor);
    this.setOutput(true, Number);
    var dropdown = new Blockly.FieldDropdown(this.OPERATORS);
    this.appendInput([dropdown, 'OP'], Blockly.INPUT_VALUE, 'NUM', Number);
    this.appendInput(Blockly.LANG_MATH_TRIG_TITLE, Blockly.DUMMY_INPUT, '', null);
    this.setInputsInline(true);
    
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getTitleValue('OP');
      return Blockly.Language.math_trig.TOOLTIPS[mode];
    });
  }
};

Blockly.Language.math_trig.OPERATORS = [['sin', 'SIN'], ['cos', 'COS'], ['tan', 'TAN'], ['asin', 'ASIN'], ['acos', 'ACOS'], ['atan', 'ATAN']];

Blockly.Language.math_trig.TOOLTIPS = {
  SIN: Blockly.LANG_MATH_TRIG_TOOLTIP_SIN,
  COS: Blockly.LANG_MATH_TRIG_TOOLTIP_COS,
  TAN: Blockly.LANG_MATH_TRIG_TOOLTIP_TAN,
  ASIN: Blockly.LANG_MATH_TRIG_TOOLTIP_ASIN,
  ACOS: Blockly.LANG_MATH_TRIG_TOOLTIP_ACOS,
  ATAN: Blockly.LANG_MATH_TRIG_TOOLTIP_ATAN
};

Blockly.Language.math_const = {
  categoryName: Blockly.LANG_CATEGORY_MATH,
  categoryID: 'math',
  init: function() {
    this.setColour(mathColor);
    this.setOutput(true, Number);
    this.appendTitle(Blockly.LANG_MATH_CONST_TITLE);
    var dropdown = new Blockly.FieldDropdown(this.OPERATORS);
    this.appendTitle(dropdown, 'TYPE');
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getTitleValue('TYPE');
      return Blockly.Language.math_const.TOOLTIPS[mode];
    });
  }
};

Blockly.Language.math_const.OPERATORS = [[Blockly.LANG_MATH_CONST_PI, 'PI'], [Blockly.LANG_MATH_CONST_E, 'E']];
Blockly.Language.math_const.TOOLTIPS = {
  PI: Blockly.LANG_MATH_CONST_TOOLTIP_PI,
  E: Blockly.LANG_MATH_CONST_TOOLTIP_E
};

Blockly.Language.math_random_float = {
  // Random fraction between 0 and 1.
  categoryName: Blockly.LANG_CATEGORY_MATH,
  categoryID: 'math',
  helpUrl: Blockly.LANG_MATH_RANDOM_FLOAT_HELPURL,
  init: function() {
    this.setColour(mathColor);
    this.setOutput(true, Number);
    this.appendTitle(Blockly.LANG_MATH_RANDOM_FLOAT_TITLE_RANDOM);
    this.setTooltip(Blockly.LANG_MATH_RANDOM_FLOAT_TOOLTIP_1);
  }
};

Blockly.Language.math_double = {
  categoryName: Blockly.LANG_CATEGORY_MATH,
  categoryID: 'math',
  init: function() {
    this.setColour(mathColor);
    this.setOutput(true, Number);
    var dropdown = new Blockly.FieldDropdown(this.OPERATORS);
    this.appendTitle(Blockly.LANG_MATH_DOUBLE_INPUT_TITLE);
    this.appendTitle(dropdown, 'OP');
    this.appendInput('', Blockly.INPUT_VALUE, 'A', Number);
    this.appendInput('', Blockly.INPUT_VALUE, 'B', Number);
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getTitleValue('OP');
      return Blockly.Language.math_double.TOOLTIPS[mode];
    });
  }
};
Blockly.Language.math_double.OPERATORS = [[Blockly.LANG_MATH_DOUBLE_MAX, 'MAX'], [Blockly.LANG_MATH_DOUBLE_MIN, 'MIN']];
Blockly.Language.math_double.TOOLTIPS = {
  MAX: Blockly.LANG_MATH_DOUBLE_TOOLTIP_MAX,
  MIN: Blockly.LANG_MATH_DOUBLE_TOOLTIP_MIN
};

Blockly.Language.math_change = {
  // Add to a variable in place.
  categoryName: Blockly.LANG_CATEGORY_MATH,
  categoryID: 'math',
  helpUrl: Blockly.LANG_MATH_CHANGE_HELPURL,
  init: function() {
    this.setColour(mathColor);
    this.appendTitle(Blockly.LANG_MATH_CHANGE_TITLE_CHANGE1);
    this.appendTitle(new Blockly.FieldDropdown(Blockly.Variables.dropdownCreate, Blockly.Variables.dropdownChange), 'VAR').setText(Blockly.LANG_MATH_CHANGE_TITLE_ITEM);
    this.appendInput(Blockly.LANG_MATH_CHANGE_TITLE_CHANGE2, Blockly.INPUT_VALUE, 'DELTA', Number);
    this.appendInput(Blockly.LANG_MATH_CHANGE_INPUT_BY, Blockly.DUMMY_INPUT, '', null);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    
    this.setTooltip(function() {
      return Blockly.LANG_MATH_CHANGE_TOOLTIP_1.replace('%1', thisBlock.getTitleText('VAR'));
    });
  },
  getVars: function() {
    return [this.getTitleText('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getTitleText('VAR'))) {
      this.setTitleText(newName, 'VAR');
    }
  }
};

//教育的観点から表示しない
/*

 Blockly.Language.math_on_list = {

 // Evaluate a list of numbers to return sum, average, min, max, etc.

 // Some functions also work on text (min, max, mode, median).

 categoryName: Blockly.LANG_CATEGORY_MATH,

 categoryID: 'math',

 helpUrl: Blockly.LANG_MATH_ONLIST_HELPURL,

 init: function() {

 this.setColour(mathColor);

 this.setOutput(true, [Number, Array]);

 var dropdown = new Blockly.FieldDropdown(this.OPERATORS);

 this.appendTitle(dropdown, 'OP');

 this.appendInput(Blockly.LANG_MATH_ONLIST_INPUT_OFLIST, Blockly.INPUT_VALUE, 'LIST', Array);

 // Assign 'this' to a variable for use in the tooltip closure below.

 var thisBlock = this;

 this.setTooltip(function() {

 var mode = thisBlock.getTitleValue('OP');

 return Blockly.Language.math_on_list.TOOLTIPS[mode];

 });

 }

 };

 Blockly.Language.math_on_list.OPERATORS = [[Blockly.LANG_MATH_ONLIST_OPERATOR_SUM, 'SUM'], [Blockly.LANG_MATH_ONLIST_OPERATOR_MIN, 'MIN'], [Blockly.LANG_MATH_ONLIST_OPERATOR_MAX, 'MAX'], [Blockly.LANG_MATH_ONLIST_OPERATOR_AVERAGE, 'AVERAGE'], [Blockly.LANG_MATH_ONLIST_OPERATOR_MEDIAN, 'MEDIAN'], [Blockly.LANG_MATH_ONLIST_OPERATOR_MODE, 'MODE'], [Blockly.LANG_MATH_ONLIST_OPERATOR_STD_DEV, 'STD_DEV'], [Blockly.LANG_MATH_ONLIST_OPERATOR_RANDOM, 'RANDOM']];

 Blockly.Language.math_on_list.TOOLTIPS = {

 SUM: Blockly.LANG_MATH_ONLIST_TOOLTIP_SUM,

 MIN: Blockly.LANG_MATH_ONLIST_TOOLTIP_MIN,

 MAX: Blockly.LANG_MATH_ONLIST_TOOLTIP_MAX,

 AVERAGE: Blockly.LANG_MATH_ONLIST_TOOLTIP_AVERAGE,

 MEDIAN: Blockly.LANG_MATH_ONLIST_TOOLTIP_MEDIAN,

 MODE: Blockly.LANG_MATH_ONLIST_TOOLTIP_MODE,

 STD_DEV: Blockly.LANG_MATH_ONLIST_TOOLTIP_STD_DEV,

 RANDOM: Blockly.LANG_MATH_ONLIST_TOOLTIP_RANDOM

 };

 */

//教育的観点から表示しない
/*

 Blockly.Language.math_constrain = {

 // Constrain a number between two limits.

 categoryName: Blockly.LANG_CATEGORY_MATH,

 categoryID: 'math',

 helpUrl: Blockly.LANG_MATH_CONSTRAIN_HELPURL,

 init: function() {

 this.setColour(mathColor);

 this.setOutput(true, Number);

 this.appendInput(Blockly.LANG_MATH_CONSTRAIN_INPUT_CONSTRAIN, Blockly.INPUT_VALUE, 'VALUE', Number);

 this.appendInput(Blockly.LANG_MATH_CONSTRAIN_INPUT_LOW, Blockly.INPUT_VALUE, 'LOW', Number);

 this.appendInput(Blockly.LANG_MATH_CONSTRAIN_INPUT_HIGH, Blockly.INPUT_VALUE, 'HIGH', Number);

 this.setInputsInline(true);

 this.setTooltip(Blockly.LANG_MATH_CONSTRAIN_TOOLTIP_1);

 }

 };*/

//教育的観点から表示しない
/*

 Blockly.Language.math_random_int = {

 // Random integer between [X] and [Y].

 categoryName: Blockly.LANG_CATEGORY_MATH,

 categoryID: 'math',

 helpUrl: Blockly.LANG_MATH_RANDOM_INT_HELPURL,

 init: function() {

 this.setColour(mathColor);

 this.setOutput(true, Number);

 this.appendTitle(Blockly.LANG_MATH_RANDOM_INT_TITLE_RANDOM);

 this.appendInput(Blockly.LANG_MATH_RANDOM_INT_INPUT_FROM, Blockly.INPUT_VALUE, 'FROM', Number);

 this.appendInput(Blockly.LANG_MATH_RANDOM_INT_INPUT_TO, Blockly.INPUT_VALUE, 'TO', Number);

 // TODO: Ensure that only number blocks may used to set range.

 this.setInputsInline(true);

 this.setTooltip(Blockly.LANG_MATH_RANDOM_INT_TOOLTIP_1);

 }

 };*/

