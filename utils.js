function roundNumber(num, dec) {
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
}

function setHashParameter(key, value){

    var kvp = updateURIKeyValuePair(document.location.hash.replace('#?', ''), key, value);

    var newHash = "#?" + kvp;

    var url = document.URL;

    // remove hash value (if present).
    var index = url.indexOf('#');

    if (index != -1) {
        url = url.substr(0, url.indexOf('#'));
    }

    document.location.replace(url + newHash);
}

function getHashParameter(key) {
    var regex = new RegExp("#.*[?&]" + key + "=([^&]+)(&|$)");
    var match = regex.exec(document.location.hash);
    return(match ? decodeURIComponent(match[1].replace(/\+/g, " ")) : null);
}

function updateURIKeyValuePair(uriSegment, key, value){

    key = encodeURIComponent(key);
    value = encodeURIComponent(value);

    var kvp = uriSegment.split('&');

    // Array.split() returns an array with a single "" item
    // if the target string is empty. remove if present.
    if (kvp[0] == "") kvp.shift();

    var i = kvp.length;
    var x;

    // replace if already present.
    while (i--) {
        x = kvp[i].split('=');

        if (x[0] == key) {
            x[1] = value;
            kvp[i] = x.join('=');
            break;
        }
    }

    // not found, so append.
    if (i < 0) {
        kvp[kvp.length] = [key, value].join('=');
    }

    return kvp.join('&');
}