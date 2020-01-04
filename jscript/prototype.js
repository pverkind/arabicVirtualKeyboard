function sl(id) {
    return document.getElementById(id);
}

var arLet = "\u061C";
var vowSep = "\u180E";
//var arLet = "-";
//var vowSep = "_";



function wr(item) {
    var input = sl('area');
    if (sl("regexCheck0").checked) {
        /* add an Arabic letter mark (\u061C) after every character
        to fix the display order for every character from right to left*/
        /*item = item + "\u061C";*/
        item = item.split("");
        /*item = item.join("\u061C") + "\u061C";*/
        item = item.join(arLet) + arLet;
    } else {
        /*item = item.replace("\u061C", "");*/
        item = item.replace(arLet, "");
    }
    if (sl("regexCheck").checked) {
        /* add a MONGOLIAN VOWEL SEPARATOR (\u180E) before every character
        to separate the Arabic characters */
        /*item = "\u180E" + item;*/
        item = item.split("");
        /*item = "\u180E"+item.join("\u180E");*/
        item = vowSep + item.join(vowSep);
    } else {
        item = item.replace("\u25cc", ""); /*remove the dotted circles from vowels*/
    }
    input.focus();
    if (input.setSelectionRange) {
        var srt = input.selectionStart;
        var len = input.selectionEnd;
        if (srt < len) srt++;
        input.value = input.value.substring(0, srt) + item + input.value.substring(len);
        input.setSelectionRange(srt + item.length, srt + item.length);
    } else {
        var range = document.selection.createRange();
        range.text = item;
    }
    input.focus();
    input.scrollTop = input.scrollHeight;
}



/*function setSelectionRange(input, selectionStart, selectionEnd) {
    if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
    } else if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd("character", selectionEnd);
        range.moveStart("character", selectionStart);
        range.select();
    }
}*/

// Move the cursor position to just after the previous real character
// (before any ALM or character separator)
function toPrevChar(pos, txt) {
  //console.log(pos);
  if (pos > 0) {
    var precededByNonChar = [arLet, vowSep].includes(txt.substring(pos-1, pos));
    while (precededByNonChar) {
      precededByNonChar = [arLet, vowSep].includes(txt.substring(pos-1, pos));
      if (precededByNonChar) pos--;
    }
  }
  return pos;
}

// Move the cursor position to just before the next real character
// (after any nonChar (i.e., ALM or character separator))
function toNextChar(pos, txt) {
  var followedByNonChar = true;
  while (followedByNonChar) {
    followedByNonChar = [arLet, vowSep].includes(txt.substring(pos, pos+1));
    if (followedByNonChar) pos++;
  }
  return pos;
}

function getSelection(target) {
  target.focus();
  var srt = target.selectionStart;
  var end = target.selectionEnd;
  return [srt, end];
}

function arrowR() {
  var target = sl("area");
  [srt, end] = getSelection(target);
  //console.log([srt, end]);
  if (srt < end) {  // if something is selected, move cursor to start of selection
    srt = toPrevChar(srt, target.value);
  } else {  // if nothing is selected, move cursor to position before previous character
    srt = toPrevChar(end, target.value);
    srt--;
  }
  target.setSelectionRange(srt, srt);
  target.focus();
}

function arrowL() {
  var target = sl("area");
  [srt, end] = getSelection(target);
  if (srt < end) {  // if something is selected, move cursor to end of selection
    srt = toNextChar(end, target.value);
  } else {  // if nothing is selected, move cursor to position after next character
    srt = toNextChar(end, target.value);
    srt++;
  }
  target.setSelectionRange(srt, srt);
  target.focus();
}

function remove(rmType) {
  // rmType is a string, either "del" or "backspace".
  var target = sl("area");
  [srt, end] = getSelection(target);
  if (srt < end) {  // if something is selected, remove selection
    srt = toPrevChar(srt, target.value);
    end = toPrevChar(end, target.value);
  } else {  // if nothing is selected
    srt = toPrevChar(srt, target.value);
    end = toNextChar(end, target.value);
    if (rmType === "del") {  // remove following character
      end = Math.min(target.value.length, (end+1));
    } else if (rmType === "backspace") { // remove preceding character
      srt = Math.max(0, (srt-1));
    }
  }
  target.value = target.value.substring(0, srt) + target.value.substring(end);
  target.setSelectionRange(srt, srt);
  target.focus();
  return true;
}

function del() {
  remove("del");
  /*var target = sl("area");
  [srt, end] = getSelection(target);
  if (srt < end) {  // if something is selected, remove selection
    var srt = toPrevChar(srt, target.value);
    var end = toPrevChar(end, target.value);
  } else {  // if nothing is selected, remove following character
    var srt = toPrevChar(srt, target.value);
    var end = toNextChar(end, target.value);
    end = Math.min(target.value.length, (end+1));
  }
  target.value = target.value.substring(0, srt) + target.value.substring(end);
  target.setSelectionRange(srt, srt);
  target.focus();
  return true;*/
}

function backspace() {
  remove("backspace");
  /*var target = sl("area");
  [srt, end] = getSelection(target);
  //console.log("selection start: " + srt + ", end: " + end);
  if (srt < end) {  // if something is selected, remove selection
    var srt = toPrevChar(srt, target.value);
    var end = toPrevChar(end, target.value);
  } else {  // if nothing is selected, remove preceding character
    var srt = toPrevChar(srt, target.value);
    var end = toNextChar(end, target.value);
    srt = Math.max(0, (srt-1));
  }
  target.value = target.value.substring(0, srt) + target.value.substring(end);
  target.setSelectionRange(srt, srt);
  target.focus();
  return true;*/
}

function op(el) {
    var input = sl("area").value;
    if (el == "back") {
      backspace();
    }
}
