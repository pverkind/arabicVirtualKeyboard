function sl(id) {
    return document.getElementById(id);
}


function wr(item) {
    var input = sl('area');
    if (sl("regexCheck0").checked) {
        /* add an Arabic letter mark (\u061C) after every character
        to fix the display order for every character from right to left*/
        /*item = item + "\u061C";*/
        item = item.split("");
        item = item.join("\u061C")+"\u061C";
    } else {
        item = item.replace("\u061C", "");
    }
    if (sl("regexCheck").checked) {
        /* add a MONGOLIAN VOWEL SEPARATOR (\u180E) before every character
        to separate the Arabic characters */
        /*item = "\u180E" + item;*/
        item = item.split("");
        item = "\u180E"+item.join("\u180E");        
    } else {
        item = item.replace("\u25cc", ""); /*remove the dotted circles from vowels*/
    }
    input.focus();
    if (input.setSelectionRange) {
        var srt = input.selectionStart;
        var len = input.selectionEnd;
        if (srt < len) srt++;
        input.value = input.value.substr(0, srt) + item + input.value.substr(len);
        input.setSelectionRange(srt + item.length, srt + item.length);
    } else {
        var range = document.selection.createRange();
        range.text = item;
    }
    input.focus();
    input.scrollTop = input.scrollHeight;
}



function setSelectionRange(input, selectionStart, selectionEnd) {
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
}



function op(el) {
    var input = sl("area").value;
    var encode = encodeURI(input);
    if (el == "back") {
        var target = sl("area");
        target.focus();
        if (target.setSelectionRange) {
            var srt = target.selectionStart;
            var len = target.selectionEnd;
            if (srt < len) srt++;
            if (sl("regexCheck").checked && sl("regexCheck0").checked) {
                target.value = target.value.substr(0, srt - 3) + target.value.substr(len);
            } else if (sl("regexCheck").checked || sl("regexCheck0").checked) {
                target.value = target.value.substr(0, srt - 2) + target.value.substr(len);
            } else {
                target.value = target.value.substr(0, srt - 1) + target.value.substr(len);
            }
            target.setSelectionRange(srt - 1, srt - 1);
            target.focus();
        } else
        if (target.createTextRange) {
            self.VKI_range = document.selection.createRange();
            try {
                self.VKI_range.select();
            }
            catch (e) {
            }
            self.VKI_range = document.selection.createRange();
            if (! self.VKI_range.text.length)
            if (sl("regexCheck").checked && sl("regexCheck0").checked) {
                self.VKI_range.moveStart('character', -3);
            } else if (sl("regexCheck").checked || sl("regexCheck0").checked) {
                self.VKI_range.moveStart('character', -2);
            } else {
                self.VKI_range.moveStart('character', -1);
            }
            self.VKI_range.text = "";
            target.focus();
        } else target.value = target.value.substr(0, target.value.length - 1);
        target.focus();
        return true;
    }
}
