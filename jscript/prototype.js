function sl(id) {
    return document.getElementById(id);
}



function wr(item) {
    var input = sl('area');
    if (sl("regexCheck").checked) {
        /* add a small space after every character to separate the characters */
        item = item + "\u200A";
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
            target.value = target.value.substr(0, srt - 1) +
            target.value.substr(len);
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
            self.VKI_range.moveStart('character', -1);
            self.VKI_range.text = "";
            target.focus();
        } else target.value = target.value.substr(0, target.value.length - 1);
        target.focus();
        return true;
    }
}






jQuery.cookie = function (name, value, options) {
    if (typeof value != 'undefined') {
        // name and value given, set cookie
        options = options || {
        };
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString();
        }
        var path = options.path ? '; path=' + (options.path): '';
        var domain = options.domain ? '; domain=' + (options.domain): '';
        var secure = options.secure ? '; secure': '';
        document.cookie =[name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
