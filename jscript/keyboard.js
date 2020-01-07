//* Define the main cosmetic markers used to force RTL
const arLet = "\u061C"; // Arabic letter mark
const vowSep = "\u180E"; // Mongolian vowel separator
const circle = "\u25cc"; // dotted circle for diacritics
// */
/*
// for testing purposes:
const arLet = "-";
const vowSep = "_";
const circle = "\u25cc"; // dotted circle for diacritics
// */


//-----------------------------------------------------------------------------

// Populate the virtual keyboard's keys:

populateInitialKeys()
function populateInitialKeys() {
  var basic = [
        ["ذ", ""],
        ["١", ""],
        ["٢", ""],
        ["٣", ""],
        ["٤", ""],
        ["٥", ""],
        ["٦", ""],
        ["٧", ""],
        ["٨", ""],
        ["٩", ""],
        ["٠", ""],
        ["\u279e", "backspace"],                                  // Row 1
        ["ض", ""],
        ["ص", ""],
        ["ث", ""],
        ["ق", ""],
        ["ف", ""],
        ["غ", ""],
        ["ع", ""],
        ["ه", ""],
        ["خ", ""],
        ["ح", ""],
        ["ج", ""],
        ["د", ""],                                                 //Row 2
        ["ش", ""],
        ["س", ""],
        ["ي", ""],
        ["ب", ""],
        ["ل", ""],
        ["ا", ""],
        ["ت", ""],
        ["ن", ""],
        ["م", ""],
        ["ك", ""],
        ["ط", ""],
        [String.raw`\n`, "enter"],                                // Row 3
        ["ئ", ""],
        ["ء", ""],
        ["ؤ", ""],
        ["ر", ""],
        ["لا", ""],
        ["ى", ""],
        ["ة", ""],
        ["و", ""],
        ["ز", ""],
        ["ظ", ""],
        ["ـ", "taṭwīl (kashīda)"],                                // Row 4
        ['،', "Arabic comma"],
        [':', "colon"],
        ['؛', "Arabic semicolon"],
        [" ", ""],
        ['\u200c', "zero-width non-joiner (فاصلهٔ مجازی)"],
        ['؟', "Arabic question mark"],
        ['.', "full stop"],
        ["!", "exclamation mark"],                                // Row 5
        ];
    for (i=0, j=basic.length; i<j; i++) {
        addKey(basic[i][0], basic[i][1], keyGridNo=0);
    }
    var additional = [
        [circle+'\u0652',"sukūn"],
        [circle+'\u064b', "fatḥatān"],
        [circle+'\u064c',"ḍammatān"],
        [circle+'\u064d', "kasratān"],
        [circle+'\u064e', "fatḥa"],
        [circle+'\u064f', "ḍamma"],
        [circle+'\u0650',"kasra"],
        [circle+'\u0651', "shadda"],
        ['آ', "alif madda"],
        ['ٱ', "alif waṣla"],
        ['أ', "alif with hamza on top"],
        ['إ', "alif with hamza below"],                           // Row 6
        [circle+'\u06e1',"Quranic sukūn"],
        [circle+'\u08f0',"Quranic open fatḥatān"],
        [circle+'\u08f1',"Quranic open ḍammatān"],
        [circle+'\u08f2',"Quranic open kasratān"],
        [circle+'\u0670',"dagger alif"],
    ];
    var palaeo = [
        ['ٮ',"dotless b"],
        ['ں',"dotless n"],
        ['ڡ',"dotless f"],
        ['ٯ',"dotless q"],
        ['ڧ',"maghrebi q"],
        ['ڢ',"maghrebi f"],
        ['ٯ\u065c',"qāf with dot below"],                         // Row 7
    ];
    var persian = [
        ["۱", "Persian digit 1"],
        ["۲", "Persian digit 2"],
        ["۳", "Persian digit 3"],
        ["۴", "Persian digit 4"],
        ["۵", "Persian digit 5"],
        ["۶", "Persian digit 6"],
        ["۷", "Persian digit 7"],
        ["۸", "Persian digit 8"],
        ["۹", "Persian digit 9"],
        ["۰", "Persian digit 0"],
        ['پ', "Persian peh"],
        ['چ', "Persian cheh"],                                     //Row 8
        ['ژ', "Persian zheh"],
        ['ک', "Persian kāf"],
        ['گ', "Persian gāf"],
        ['ی', "Persian yeh"],
        ['\u06c2', "Persian heh-yeh"],
    ];
    var regexchars = [
        ['.', "full stop"],
        [',', "latin comma"],
        ['?', "latin question mark"],
        ['-', "hyphen"],
        ['+', "plus"],
        ['*', "asterisk"],
        ['|', "vertical bar (pipe)"],                             // Row 9
        ['/', "forward slash"],
        [String.raw`\\`, "backslash"],
        ['(', "opening bracket"],
        [')', "closing bracket"],
        ['[', "opening square bracket"],
        [']', "closing square bracket"],
        ['{‎', "opening brace"],
        ['}‎', "closing brace"],
        ['<', "opening angular bracket"],
        ['>', "closing angular bracket"],
        ['^', "caret / circonflex"],
        ['$', "dollar sign"],
        ['@', "ampersand"],
        ['%', "percent / modulo"],
        ['"', "double quote"],
        ["'", "single quote"],
        ["_", "underscore"],
        ["=", "equals"],
    ];
    var cookieKeys = getKeysFromCookie();
    var categories = [additional, palaeo, persian, regexchars, cookieKeys];
    for (i=0, j=categories.length; i<j; i++) {
        var cat = categories[i];
        for (k=0, l=cat.length; k<l; k++) {
          addKey(cat[k][0], cat[k][1], keyGridNo=1);
      }
    }
}

function getKeysFromCookie() {
   var cookie_keys = getCookie("keys");
   if (cookie_keys) {
       return JSON.parse(cookie_keys);
   } else {
       return [];
   }
}

function addKey(character, alias, keyGridNo=1) {
   if (character === "none") {
       var character = document.getElementById("extraInput0").value;
       var alias = document.getElementById("extraInputDescr0").value;
       // add the key to the cookie:
       var keys = getKeysFromCookie();
       keys.push([character, alias]);
       console.log("new cookie: keys: ");
       console.log(keys);
       createCookie("keys", JSON.stringify(keys), 365);
   }
   // Add the character to the grid:
   var keyCharacterDiv = document.createElement("div");
   if (character===String.raw`\n`) {
     keyCharacterDiv.innerHTML = "\u2937";
     keyCharacterDiv.setAttribute("class", "keyCharacter tooltip enter");
   } else if (character===String.raw`\\`) {
     keyCharacterDiv.innerHTML = "&#92;";
     keyCharacterDiv.setAttribute("class", "keyCharacter tooltip");
   } else  if (character==='\u200c') {
     keyCharacterDiv.innerHTML = '<img src="img/zwnj.bmp" style="height:25px; padding-top:3px"></img>';
     keyCharacterDiv.setAttribute("class", "keyCharacter tooltip");
   } else{
     keyCharacterDiv.innerHTML = character;
     if (character===" ") {
       keyCharacterDiv.setAttribute("class", "keyCharacter tooltip space");
     } else {
       keyCharacterDiv.setAttribute("class", "keyCharacter tooltip");
     }
   }
   if (alias==="backspace") {
       keyCharacterDiv.setAttribute("onclick", "remove('backspace')");
   } else {
       keyCharacterDiv.setAttribute("onclick", "wr('"+character+"')");
   }
   document.getElementsByClassName("keyGrid")[keyGridNo].appendChild(keyCharacterDiv);
   if (alias) {
       var ttSpan = document.createElement("span");
       ttSpan.setAttribute("class", "tooltiptext");
       ttSpan.innerHTML = alias;
       keyCharacterDiv.appendChild(ttSpan);
   }
}

function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function resetKeys() {
    createCookie("keys", "", 365);
    copy2Clipboard(msg="Reloading the page. ");
    // reload the page:
    location = location;
}

//-----------------------------------------------------------------------------


/**
 * toggle an html element's visibility.
 *
 * @param {string} id - the id of the html element
 */

function Toggle(id) {
   var el = document.getElementById(id);
   if (el.style.display === "block"){
       el.style.display = "none";
   } else {
       el.style.display = "block";
   }
}

//set up the modal message box:

var modal = document.getElementById("msgBox");
var modalContent = document.getElementsByClassName("modal-content")[0];
var xSpan = document.getElementsByClassName("close")[0];
function closeMsgBox() {
    modalContent.innerHTML = '<span class="close" onclick="closeMsgBox()">&times;</span>';
    modal.style.display = "none";
    ar = document.getElementById("area");
    ar.focus();
}
// When the user clicks anywhere outside of the modal, close it:
window.onclick = function(event) {
  if (event.target == modal) {
    modalContent.innerHTML = '<span class="close" onclick="closeMsgBox()">&times;</span>';
    modal.style.display = "none";
    ar = document.getElementById("area");
    ar.focus();
  }
}


// adapt the paste event in the text area: use the wr() function to input the copied text:

var ar = document.getElementById('area');
ar.onpaste = function(e) {
  var pastedText = "";
  if (window.clipboardData && window.clipboardData.getData) { // IE
    pastedText = window.clipboardData.getData('Text');
  } else if (e.clipboardData && e.clipboardData.getData) {
    pastedText = e.clipboardData.getData('text/plain');
  }
  wr(pastedText);
  return false; // Prevent the default handler from running.
};


// Adapt the text area content on checkbox change:

var checkboxids = ["regexCheck0", "regexCheck"];
for(var i = 0; i < checkboxids.length; i++) {
  var chckbx = document.getElementById(checkboxids[i]);
  chckbx.onchange = function() {
    var ar = document.getElementById("area");
    ar.focus();
    var cont = ar.value;
    [srt, end] = getSelection(ar, prev=true);
    //var srt = toPrevChar(ar.selectionStart, ar.value);
    //var end = toPrevChar(ar.selectionEnd, ar.value);
    ar.value = "";

    // insert the content into the textarea, taking checked checkboxes into account:

    wr(cont);

    // put the cursor/selection box back to where it was:

    if (this.id==="regexCheck") {  // letter separation checkbox changed
      var vowelRegex = new RegExp(vowels.join("|"), 'g');
      var vowelsBefore = (cont.substring(0,srt).match(vowelRegex) || []).length;
      var vowelsInSel = (cont.substring(srt,end).match(vowelRegex) || []).length;
      if (this.checked) {
        srt = (srt*2) + vowelsBefore;
        end = (end*2) + vowelsBefore + vowelsInSel;
      } else {
        srt =(srt - vowelsBefore) / 2;
        end = (end - vowelsBefore - vowelsInSel) / 2;
      }
    } else {  // Arabic letter order checkbox changed
      var circleRE = new RegExp(circle, "g");
      var vowelsBefore = (cont.substring(0,srt).match(circleRE) || []).length;
      var vowelsInSel = (cont.substring(srt,end).match(circleRE) || []).length;
      if (this.checked) {
        srt = ((srt - vowelsBefore) * 2) + vowelsBefore;
        end = ((end - vowelsBefore - vowelsInSel) * 2) + vowelsBefore + vowelsInSel;
      } else {
        srt = ((srt - vowelsBefore) / 2) + vowelsBefore;
        end = ((end - vowelsBefore - vowelsInSel) / 2) + vowelsBefore + vowelsInSel;
      }
    }

    // Make sure the selection does not spill over the start or end of string:

    srt = Math.max(0, toPrevChar(srt, ar.value));
    end = Math.min(ar.value.length, toPrevChar(end, ar.value));

    // set the selection range:

    ar.setSelectionRange(srt, end);
  }
}


//-----------------------------------------------------------------------------

function sl(id) {
    return document.getElementById(id);
}


/**
 * Adapt the standard copy mechanism to remove cosmetic marks.
 *
 * @param {string} msg - An additional message to prepend to the standard message
 * @param {bool} asIs - If false: remove fom the copied text the marks added to
 *                                force RTL and character split behavior
 *                      If true: copy the selected text as is.
 */

function copy2Clipboard(msg="", asIs=false) {
  // store the original content and selection boundaries of the text area:
  var ar = document.getElementById("area");
  var originalAreaContent = ar.value;
  var srt = ar.selectionStart;
  var end = ar.selectionEnd;

  // abort copy if the text area is empty:
  if (!originalAreaContent) {
    console.log("Text area empty - copying aborted.");
    return false
  }

  // Get the selected characters from the text area;
  // if nothing is selected, get the entire content of the text area:
  if (ar.selectionStart === ar.selectionEnd) {
    var copyText = ar.value;
  } else {
    var copyText = (ar.value).substring(ar.selectionStart, ar.selectionEnd);
  }

  // prepare the selected text for copying:
  if (asIs) { // copy with all cosmetic marks
    // put the selected text into the text area for copying:
    ar.value = copyText;
  } else {
    // remove the special characters:
    var temp_copyText = copyText.split(circle).join("");   // dotted circle
    temp_copyText = temp_copyText.split(arLet).join("");  // Arabic letter mark
    temp_copyText = temp_copyText.split(vowSep).join("");  // Mongolian Vowel Separator
    // previously used separators, no longer used:
    //temp_copyText = temp_copyText.split("\u200E").join(""); //left-to-right mark
    //temp_copyText = temp_copyText.split("\u200A").join(""); //hair space

    // put the manipulated text into the text area
    ar.value = temp_copyText;
  }

  // Copy the text inside the text field:
  ar.select();
  document.execCommand("copy");

  // put the original text (and selected area/cursor) back:
  ar.value = originalAreaContent;
  ar.setSelectionRange(srt, end);

  // create a message that explains what was copied:
  if (!asIs) {
    var modal = document.getElementById("msgBox");
    var modalContent = document.getElementsByClassName("modal-content")[0];
    var p = document.createElement("p");
    var link = 'http://www.babelstone.co.uk/Unicode/whatisit.html?string=';
    var t = "<br/> (Use ctrl+shift+C to copy the text as is)"
    t = t + '<br/>You can inspect the characters copied <a href="';
    t = t + link + temp_copyText + '" target="_blank">here</a>';
    p.innerHTML = msg+"Copied the text: " + copyText + " as " + temp_copyText + t;
    modalContent.appendChild(p);
    modal.style.display = "block";
  }
}



/**
 * Insert an item in the text area.
 *
 * @param {string} item - A string to be inserted into the text area
 * @param {number} [offset=0] - number of characters from the start of the item
 *                              after which the cursor should be inserted.
 *                              If offset is 0, cursor will be put after
 *                              inserted text.
 */

function wr(item, offset=0) {
    var ar = sl('area');

    // remove all cosmetic marks:

    item = item.split(arLet).join("");
    item = item.split(vowSep).join("");
    item = item.split(circle).join("");
    //console.log("adapted item: "+item);
    //console.log("adapted item length: "+item.length);

    // add new cosmetic marks, depending on the checked checkboxes:

    offsetQ = 1;
    if (sl("regexCheck0").checked && sl("regexCheck").checked) {
      // Add marks to fix the RTL display order (arLet)
      // and character splitting (vowSep) before and after each character.
        item = item.split("");
        var tr = vowSep+arLet+vowSep;
        item = tr + item.join(tr) + tr;
        offsetQ = 4;
    } else if (sl("regexCheck0").checked) {
        // add an Arabic letter mark (\u061C) before and after every character
        // to fix the display order for every character from right to left:
        item = item.split("");
        item = arLet + item.join(arLet) + arLet;
        offsetQ = 2;
    } else if (sl("regexCheck").checked) {
        // add a MONGOLIAN VOWEL SEPARATOR (\u180E) before and after
        // every character to force separation of the Arabic characters:
        item = item.split("");
        item = vowSep + item.join(vowSep) + vowSep;
        offsetQ = 2;
    }
    //console.log("item after adding/deleting separators: "+item);
    //console.log("item length after adding/deleting separators: "+item.length);

    // add or remove dotted vowel circles:
    item = vowelSigns(item, include=sl("regexCheck").checked);
    //console.log("item after adding/deleting vowel signs: "+item);
    //console.log("item length after adding/deleting vowel signs: "+item.length);

    ar.focus();
    var srt = ar.selectionStart;
    var len = ar.selectionEnd;
    if (srt < len) srt++;
    txt = ar.value.substring(0, srt) + item + ar.value.substring(len);
    txt = txt.replace(vowSep+vowSep, vowSep);
    txt = txt.replace(arLet+arLet, arLet);
    txt = txt.replace(vowSep+arLet+vowSep+arLet, vowSep+arLet);
    txt = txt.replace(arLet+vowSep+arLet+vowSep, arLet+vowSep);
    ar.value = txt;
    srt = toPrevChar((srt + item.length) - (offsetQ * offset), txt)
    ar.setSelectionRange(srt, srt);
    ar.focus();
    ar.scrollTop = ar.scrollHeight;
}

var vowels = [
    '\u0652', //sukūn
    '\u064b', //fatḥatān
    '\u064c', //ḍammatān
    '\u064d', //kasratān
    '\u064e', //fatḥa
    '\u064f', //ḍamma
    '\u0650', //kasra
    '\u0651', //shadda
    '\u06e1', //Quranic sukūn
    '\u08f0', //Quranic open fatḥatān
    '\u08f1', //Quranic open ḍammatān
    '\u08f2', //Quranic open kasratān
    '\u0670', //dagger alif
];

function vowelSigns(txt, include=true) {
  //console.log("add vowel signs:"+include);
  if (include) {
    for (i=0, j=vowels.length; i<j; i++) {
      txt = txt.split(vowels[i]).join(circle+vowels[i]); // add dotted circles
    }
    txt = txt.replace(/\u25cc+/g, "\u25cc");
  } else {
    txt = txt.split("\u25cc").join(""); // remove dotted circles
  }
  return txt;
}


/**
 * Move the cursor position to just after the previous real character
 * (before any ALM, character separator or vowel circle)
 *
 * @param {number} pos - The position of the cursor in the text string
 * @param {string} txt - The text string.
 */

function toPrevChar(pos, txt) {
  //console.log(pos);
  while ([arLet, vowSep, circle].includes(txt.substring(pos-1, pos))) pos--;
  return pos;
}


/**
 * Move the cursor position to just before the next real character
 * (after any ALM, character separator or vowel circle)
 *
 * @param {number} pos - The position of the cursor in the text string
 * @param {string} txt - The text string.
 */

function toNextChar(pos, txt) {
  while ([arLet, vowSep, circle].includes(txt.substring(pos, pos+1))) pos++;
  return pos;
}


/**
 * Get the start and end position of the selection within the text area
 *
 * @param {object} target - The text area
 * @param {bool} prev - If prev is set to true, the position will be adjusted
 *                      to the position just after the preceding character
 *                      (i.e., before any cosmetic mark).
 */

function getSelection(target, prev=false) {
  target.focus();
  var srt = target.selectionStart;
  var end = target.selectionEnd;
  if (prev) {
    return [toPrevChar(srt, target.value), toPrevChar(end, target.value)]
  } else {
    return [srt, end];
  }
}


// ----------------------------------------------------------------------------


 // Define functionality of some keys of the hardware keyboard.


/**
 * Change the functionality of some keyboard keys.
 */

function interceptOnKeyDown() {
    var keyID = event.which;
    if (event.ctrlKey) { // if Ctrl key is pressed:
      if (keyID === 67) {  // check if c key is also pressed;
        // if so, adapt the copy event:
        event.preventDefault();
        if(event.shiftKey) {  // ctrl+shift+c: copy as is
          copy2Clipboard(msg="", asIs=true);
        } else {  // ctrl+c: copy without the separator characters
          copy2Clipboard();
        }
      } else {
        // do nothing: let the standard event happen (ctrl+v, ctrl+f, ...)
      }
    } else if (keyID === 8) { // if backspace key is pressed:
      event.preventDefault();
      remove("backspace");
    } else if (keyID === 46) { // if delete key is pressed:
      event.preventDefault();
      remove("del");
    } else if (keyID === 37) { // if arrow left key is pressed:
      event.preventDefault();
      arrowL(event.shiftKey);
    } else if (keyID === 39) { // if arrow right key is pressed:
      event.preventDefault();
      arrowR(event.shiftKey);
    } else if (event.key.length === 1) { // use wr() function to insert letter and number keys
      event.preventDefault();
      wr(event.key);
    } else {
      // do nothing: normal functionality of the key.
    }
}


/**
 * Define the functionality of the right arrow key.
 * NB both arrow keys bring the caret to immediately after a character.
 *
 * @param {bool} shiftKey - If shiftKey is set to true, the shiftKey was pressed
 *                          with the arrow key.
 */

function arrowR(shiftKey) {
  var target = sl("area");
  [srt, end] = getSelection(target, prev=true);
  if (srt < end) {  // if something is selected
    if (shiftKey) { // if shift is pressed, extend the selection to the right
      srt--;
      srt = toPrevChar(srt, target.value); // include all nonChars before character
    } else {  // if shift is not pressed, move the cursor to the start of selection
      end = srt;
    }
    if (srt < 0) srt = 0; // make sure selection does not go beyond position 0
  } else {  // if nothing is selected, move cursor to  before previous character
    srt--;
    srt = toPrevChar(srt, target.value);
    if (!shiftKey) end = srt;
  }
  target.setSelectionRange(srt, end);
  target.focus();
}



/**
 * Define the functionality of the left arrow key.
 * NB both arrow keys bring the caret to immediately after a character.
 *
 * @param {bool} shiftKey - If shiftKey is set to true, the shiftKey was pressed
 *                          with the arrow key.
 */

function arrowL(shiftKey) {
  // NB: both arrow keys always bring caret to immediately after a character
  var target = sl("area");
  [srt, end] = getSelection(target, prev=true);
  if (srt < end) {   // if something is selected
    if (shiftKey) {  // if shift is pressed, extend the selection to the left
      end = toNextChar(end, target.value);
      end++;
    } else {         // if shift is not pressed, move cursor to end of selection
      srt = end;
    }
  } else {  // if nothing is selected, move cursor to position after next character
    end = toNextChar(end, target.value);
    end++;
    if (end > target.value.length) end = 0;
    if (!shiftKey) srt = end;
  }
  target.setSelectionRange(srt, end);
  target.focus();
}


/**
 * Define the functionality of the delete and backspace keys.
 * NB both keys bring the caret to immediately after a character.
 *
 * @param {string} rmType - Either "backspace" or "del"
 */

function remove(rmType) {
  var target = sl("area");
  [srt, end] = getSelection(target, prev=true);
  console.log(srt, end);
  if (srt === end) { // if nothing is selected
    if (rmType === "del") {  // remove following character
      end = toNextChar(end, target.value);
      end = Math.min(target.value.length, (end+1));
    } else if (rmType === "backspace") { // remove preceding character
      srt = Math.max(0, toPrevChar(srt-1, target.value));
    }
  } else {  // if something is selected
    // do not change srt or end; selected characters will be removed.
  }
  target.value = target.value.substring(0, srt) + target.value.substring(end);
  target.setSelectionRange(srt, srt);
  console.log(srt);
  target.focus();
  return true;
}
