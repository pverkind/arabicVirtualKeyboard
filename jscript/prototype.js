function sl(id) {
    return document.getElementById(id);
}

var arLet = "\u061C";
var vowSep = "\u180E";
// for testing purposes:
//var arLet = "-";
//var vowSep = "_";


// insert an item in the text area
function wr(item, offset=0) {
    //console.log("wr() item "+item);
    var input = sl('area');
    item = item.split(arLet).join("");
    item = item.split(vowSep).join("");
    item = item.split("\u25cc").join("");
    //console.log("adapted item: "+item);
    //console.log("adapted item length: "+item.length);
    offsetQ = 1;
    if (sl("regexCheck0").checked && sl("regexCheck").checked) {
        offsetQ = 4;
        item = item.split("");
        var tr = vowSep+arLet+vowSep;
        item = tr + item.join(tr) + tr;
    } else if (sl("regexCheck0").checked) {
        /* add an Arabic letter mark (\u061C) after every character
        to fix the display order for every character from right to left*/
        offsetQ = 2;
        item = item.split("");
        item = arLet + item.join(arLet) + arLet;
    } else if (sl("regexCheck").checked) {
        /* add a MONGOLIAN VOWEL SEPARATOR (\u180E) before every character
        to separate the Arabic characters */
        offsetQ = 2;
        item = item.split("");
        item = vowSep + item.join(vowSep) + vowSep;
    }
    //console.log("item after adding/deleting separators: "+item);
    //console.log("item length after adding/deleting separators: "+item.length);

    // add or remove dotted vowel circles:
    item = vowelSigns(item, include=sl("regexCheck").checked);
    //console.log("item after adding/deleting vowel signs: "+item);
    //console.log("item length after adding/deleting vowel signs: "+item.length);

    input.focus();
    var srt = input.selectionStart;
    var len = input.selectionEnd;
    if (srt < len) srt++;
    txt = input.value.substring(0, srt) + item + input.value.substring(len);
    txt = txt.replace(vowSep+vowSep, vowSep);
    txt = txt.replace(arLet+arLet, arLet);
    txt = txt.replace(vowSep+arLet+vowSep+arLet, vowSep+arLet);
    txt = txt.replace(arLet+vowSep+arLet+vowSep, arLet+vowSep);
    input.value = txt;
    if (offset > 0) {
      console.log("srt: ", srt);
      srt = toPrevChar(srt + (offsetQ * offset), txt);
      input.setSelectionRange(srt, srt);
      console.log("> ", srt);
    } else {
      input.setSelectionRange(srt + item.length, srt + item.length);
    }
    input.focus();
    input.scrollTop = input.scrollHeight;
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
  console.log("add vowel signs:"+include);
  if (include) {
    for (i=0; i<vowels.length; i++) {
      txt = txt.split(vowels[i]).join("\u25cc"+vowels[i]); // add dotted circles
    }
    txt = txt.replace(/\u25cc+/g, "\u25cc");
  } else {
    txt = txt.split("\u25cc").join(""); // remove dotted circles
  }
  return txt;
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
  while ([arLet, vowSep, "\u25cc"].includes(txt.substring(pos-1, pos))) pos--;
  return pos;
}

// Move the cursor position to just before the next real character
// (after any nonChar (i.e., ALM or character separator))
function toNextChar(pos, txt) {
  while ([arLet, vowSep, "\u25cc"].includes(txt.substring(pos, pos+1))) pos++;
  return pos;
}

function getSelection(target) {
  target.focus();
  var srt = target.selectionStart;
  var end = target.selectionEnd;
  return [srt, end];
}

function arrowR(shiftKey) {
  // NB both arrow keys bring the caret to immediately after a character.
  var target = sl("area");
  [srt, end] = getSelection(target);
  //console.log([srt, end]);
  if (srt < end) {  // if something is selected, move cursor to start of selection
    srt = toPrevChar(srt, target.value);
    if (shiftKey) { // if shift is pressed, extend the selection to the right
      srt--;
      srt = toPrevChar(srt, target.value); // include all nonChars before character
    }
    if (srt < 0) srt = 0; // make sure selection does not go beyond position 0
  } else {  // if nothing is selected, move cursor to  before previous character
    srt = toPrevChar(srt, target.value);
    srt--;
    srt = toPrevChar(srt, target.value);
  }
  if (shiftKey) {
    target.setSelectionRange(srt, end);
  } else {
    target.setSelectionRange(srt, srt);
  }
  target.focus();
}

function arrowL(shiftKey) {
  // NB: both arrow keys always bring caret to immediately after a character
  var target = sl("area");
  [srt, end] = getSelection(target);
  if (srt < end) {  // if something is selected, move cursor to end of selection
    srt = toPrevChar(srt, target.value);
    end = toPrevChar(end, target.value);
    if (shiftKey) {
      toNextChar(end, target.value);
      end++;
    }
  } else {  // if nothing is selected, move cursor to position after next character
    end = toNextChar(end, target.value);
    end++;
    if (end > target.value.length) end = 0;
  }
  if (shiftKey) {
    target.setSelectionRange(srt, end);
  } else {
    target.setSelectionRange(end, end);
  }
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
