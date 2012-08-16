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

/**
 * @fileoverview Utility functions for handling variables and procedure names.
 * Note that variables and procedures share the same name space, meaning that
 * one can't have a variable and a procedure of the same name.
 * @author fraser@google.com (Neil Fraser)
 */

/**
 * Class for a database of variables.
 * @param {Array.<string>} reservedWords An array of words that are illegal for
 *     use as variable names in a language (e.g. ['new', 'if', 'this', ...]).
 * @constructor
 */
Blockly.MyDocument = {};

Blockly.MyDocument.NAME_TYPE = 'Document';

/**
 * Find all user-created variables.
 * @param {Blockly.Block} opt_block Optional root block.
 * @return {!Array.<string>} Array of variable names.
 */
Blockly.MyDocument.allId = function(opt_block) {
	var idList = new Array();
	
	var dom = window.parent.parseHTML2DOM();
    if (dom != null) {
        var body = dom.getElementsByTagName("body");
        search(idList, body[0]);
    }

	return idList;
};
function search( idList, element ){
	if( element.nodeType == 3 || element.nodeType == 8){ // skip Text & Comment node
		return;
	}
	if( element.getAttribute('id') != null && element.getAttribute('id').length != 0){
		idList.push( element.getAttribute('id') );
	}
	for( var i=0 ; i < element.childNodes.length ; i++ ){
		search( idList, element.childNodes[i] );
	}
}

/**
 * Construct the blocks required by the flyout for the variable category.
 * @param {!Array.<!Blockly.Block>} blocks List of blocks to show.
 * @param {!Array.<number>} gaps List of widths between blocks.
 * @param {number} margin Standard margin width for calculating gaps.
 * @param {!Blockly.Workspace} workspace The flyout's workspace.
 */
Blockly.MyDocument.flyoutCategory = function(blocks, gaps, margin, workspace) {
  var idList = Blockly.MyDocument.allId();
  idList.sort(Blockly.caseInsensitiveComparator);
  // In addition to the user's variables, we also want to display the default
  // variable name at the top.  We also don't want this duplicated if the
  // user has created a variable of the same name.
  //funcList.unshift(null);
  
  for (var i = 0; i < idList.length; i++) {
	
    var getBlock = Blockly.Language.myDocument_innerHTML ?
        new Blockly.Block(workspace, 'myDocument_innerHTML') : null;

    getBlock && getBlock.setTitleText( idList[i], 'TARGET');

    getBlock && getBlock.initSvg();
	
    getBlock && blocks.push(getBlock);
    if (getBlock) {
      gaps.push(margin, margin * 3);
    } else {
      gaps.push(margin * 2);
    }

  }
};

/**
 * Refresh the variable flyout if it is open.
 * Only used if the flyout's autoClose is false.
 */
Blockly.MyDocument.refreshFlyoutCategory = function() {
  if (Blockly.Toolbox && Blockly.Toolbox.flyout_.isVisible() &&
      Blockly.Toolbox.selectedOption_.cat == Blockly.MSG_MYDOCUMENT_CATEGORY) {
    Blockly.Toolbox.flyout_.hide();
    Blockly.Toolbox.flyout_.show(Blockly.MSG_MYDOCUMENT_CATEGORY);
  }
};
