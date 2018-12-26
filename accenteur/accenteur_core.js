// This module returns the accented version(s) of a word.

var vowels = ["a", "e", "i", "o", "u", "y", "A", "E", "I", "O", "U", "Y"];
var consonants = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "x", "z"];
var longs = ["ā", "ē", "ī", "ō", "ū", "ȳ", "Ā", "Ē", "Ī", "Ō", "Ū", "Ȳ"];
var breves = ["ă", "ĕ", "ĭ", "ŏ", "ŭ", "ў", "Ă", "Ĕ", "Ĭ", "Ŏ", "Ŭ", "Ў"];
var accented = ["á", "é", "í", "ó", "ú", "ý"];
var uppercase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Y", "Z"];
var lowercase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "x", "y", "z"];

function accentify(word, uppercase){
    var found = search_quantified(word);
    
    // Try other possibilities, first separately and then together:
    var new_word = word;
    var new_word_all = word;
    var prefix = "";
    var enclitic = "";
    var with_j = false;
    var sub_found = [];
    // Uppercase? Set to lowercase:
    if(uppercase){
        new_word = to_lowercase(word);
        new_word_all = to_lowercase(new_word_all);
        sub_found = search_quantified(new_word);
        for(var i = 0; i < sub_found.length; i++){
            s = sub_found[i];
            if(s != ""){
                s = to_uppercase(s);
            }
            found.push(s);
        }
    }
    // Prefix? Replace it:
    if(word.indexOf("aff") == 0){
        prefix = "aff";
        new_word = word.replace(/^aff/g, "adf");
        new_word_all = new_word_all.replace(/^aff/g, "adf");
        sub_found = search_quantified(new_word);
        for(var i = 0; i < sub_found.length; i++){
            s = sub_found[i];
            if(s != ""){
                s = s.replace(/^([āă])df/g, "$1ff");
            }
            found.push(s);
        }
    }
    if(word.indexOf("agg") == 0){
        prefix = "agg";
        new_word = word.replace(/^agg/g, "adg");
        new_word_all = new_word_all.replace(/^agg/g, "adg");
        sub_found = search_quantified(new_word);
        for(var i = 0; i < sub_found.length; i++){
            s = sub_found[i];
            if(s != ""){
                s = s.replace(/^([āă])dg/g, "$1gg");
            }
            found.push(s);
        }
    }
    if(word.indexOf("arr") == 0){
        prefix = "arr";
        new_word = word.replace(/^arr/g, "adr");
        new_word_all = new_word_all.replace(/^arr/g, "adr");
        sub_found = search_quantified(new_word);
        for(var i = 0; i < sub_found.length; i++){
            s = sub_found[i];
            if(s != ""){
                s = s.replace(/^([āă])dr/g, "$1rr");
            }
            found.push(s);
        }
    }
    if(word.indexOf("ex") == 0 && word.indexOf("s") != 2){
        prefix = "ex";
        new_word = word.replace(/^ex/g, "exs");
        new_word_all = new_word_all.replace(/^ex/g, "exs");
        sub_found = search_quantified(new_word);
        for(var i = 0; i < sub_found.length; i++){
            s = sub_found[i];
            if(s != ""){
                s = s.replace(/^([ēĕ])xs/g, "$1x");
            }
            found.push(s);
        }
    }
    // Enclitic? Delete it:
    var encl = ["que", "ne", "ve", "dam", "quam", "libet"];
    for(var i = 0; i < encl.length; i++){
        var e = encl[i];
        if(word.length > e.length && word.indexOf(e) == word.length - e.length){
            var enclitic = e;
            new_word = word.substring(0, word.indexOf(e));
            new_word_all = new_word_all.substring(0, new_word_all.indexOf(e));
            sub_found = search_quantified(new_word);
            for(var j = 0; j < sub_found.length; j++){
                s = sub_found[j];
                if(s != ""){
                    s = last_long(s) + enclitic;
                }
                found.push(s);
            }
        }
    }
    // J? If the word begins with a "i" (or "I") + vowel, or contains a "i" between 2 vowels, then replace it with "j" (or "J"):
    var new_word = word;
    var regex = /^i([aeiouy])/g;
    new_word = new_word.replace(regex, "j$1");
    new_word_all = new_word_all.replace(regex, "j$1");
    var regex = /^I([aeiouy])/g;
    new_word = new_word.replace(regex, "J$1");
    new_word_all = new_word_all.replace(regex, "J$1");
    var regex = /([aeiouy])i([aeiouy])/g;
    new_word = new_word.replace(regex, "$1j$2");
    new_word_all = new_word_all.replace(regex, "$1j$2");
    if(new_word != word){
        with_j = true;
        sub_found = search_quantified(new_word);
        for(var i = 0; i < sub_found.length; i++){
            s = sub_found[i];
            if(s != ""){
                s = s.replace("j", "i").replace("J", "I");
            }
            found.push(s);
        }
    }
    // Finally, retry with all the possibilities together:
    sub_found = search_quantified(new_word_all);
    for(var i = 0; i < sub_found.length; i++){
        s = sub_found[i];
        if(s != ""){
            if(uppercase){
                s = to_uppercase(s);
            }
            if(prefix != ""){
                switch(prefix){
                    case "aff":
                        s = s.replace(/^([āă])df/g, "$1ff");
                    break;
                    case "agg":
                        s = s.replace(/^([āă])dg/g, "$1gg");
                    break;
                    case "arr":
                        s = s.replace(/^([āă])dr/g, "$1rr");
                    break;
                    case "ex":
                        s = s.replace(/^([ēĕ])xs/g, "$1x");
                    break;
                }
            }
            if(enclitic != ""){
                s = last_long(s) + enclitic;
            }
            if(with_j){
                s = s.replace("j", "i").replace("J", "I");
            }
            found.push(s);
        }
    }
    // Words in "-cumque":
    if(/..*cumque/.test(word)){
        found.push(word.replace("cumque", "cūmque"));
    }
    // Words in "-emetips-":
    if(/..*emetips..*/.test(word)){
        found.push(word.replace("emetips", "emetīps"));
    }
    // Words in "-familias":
    if(/..*familias/.test(word)){
        found.push(word.replace("familias", "familĭas"));
    }

    if(found.length == 0){
        if(word.search(/[!?:;]/) == -1 && count_vowels(word) > 2){
            found.push("<span class='red'>" + word + "</span>");
        }
        else{
            found.push(word);
        }
    }
    else{
        for(var i = 0; i < found.length; i++){
            found[i] = qty_to_accent(word, found[i])[1];
        }
    }
    return(reduce(found));
}

// Returns an array of all the combinations of roots and terminations that can give word:
function search_quantified(word){
    // We successively split the word into 2 splinters, like this for a word of five letters:
    // |12345, then 1|2345, then 12|345, then 123|45, then 1234|5, then 12345,
    // and each time we search if we find these 2 splinters
    // in our roots" and terminations" Objects:
    var found = [];
    for(var i = 0; i <= word.length; i++){
        var root = word.substring(0, i);
        var term = word.substring(i, word.length);
        if(roots[root] != null && terminations[term] != null){
            for(var j = 0; j < roots[root].length; j++){
                r = roots[root][j];
                var quantified = r[0];
                var model = r[1];
                var num_root = r[2];
                if(root == word && (model == "inv" || models[model]["roots"][num_root] == "K")){
                    found.push(quantified);
                }
                else{
                    for(var k = 0; k < terminations[term].length; k++){
                        t = terminations[term][k]
                        if(t[1] == model && t[2] == num_root){
                            found.push(quantified + t[0]);
                        }
                    }
                }
            }
        }
    }

    // A word in "-sti" ("-stis") can be a syncopated form ("amasti" for "amavisti"):
    if(word.indexOf("sti") == word.length - 3 && word.length > 3){
        /(\S*)([aeiou])sti/.exec(word);
        found.push(RegExp.$1 + longs[vowels.indexOf(RegExp.$2)] + "stī");
    }
    if(word.indexOf("stis") == word.length - 4 && word.length > 4){
        /(\S*)([aeiou])stis/.exec(word);
        found.push(RegExp.$1 + longs[vowels.indexOf(RegExp.$2)] + "stĭs");
    }
    return(found);
}

// Converts a quantified word into an accented one:
function qty_to_accent(plain, quantified){
    var with_accents = plain;
    var plain_split = plain.split("");
    var quantified_split = quantified.split("");
    var accentable = false;
    var quantities = [quantified.length]; // Will contains something like ["0", "+", "0", "0", "-", "-"].
    var num_syllables = 0;

    // We note the quantities of all the vowels of the word, and we count the syllables:
    for(var i in quantified){
        var c = quantified[i];
        // 1. Vowels without quantities:
        if(vowels.indexOf(c) != -1){
            // Vowel without quantity is considered as a breve, except "u" after "q" and "e" after "ā" (because "sāeculum" is different of "āĕris"):
            if((plain[i] == "u" && ["Q", "q"].indexOf(plain[i - 1]) != -1) || (c == "e" && plain[i - 1] == "a")){
                quantities[i] = "0";
            }
            else{
                quantities[i] = "-";
            }

            // If c is not the second letter of "au", "eu", "ae", "oe", "qu", "gu", add a syllable:
            if((["e", "u"].indexOf(plain[i]) != -1 && ["a", "e", "o", "A", "E", "q", "g"].indexOf(plain[i - 1]) != -1) == false){
                num_syllables ++;
            }
        }

        // 2. Vowels with quantities:
        else if(longs.indexOf(c) != -1){
            quantities[i] = "+";
            num_syllables ++;
        }
        else if(breves.indexOf(c) != -1){
            quantities[i] = "-";
            num_syllables ++;
        }
        else if(c == "\u0306"){ // Combining breve => there are two quantities, and we set the 1st to "breve".
            quantities[i - 1] = "-";
            quantities[i] = "c";
        }

        // 3. Others (consonantics):
        else{
            quantities[i] = "0";
        }
    }

    // We remove the combining breve characters:
    var quantities = quantities.filter(function(item){
        return item != "c";
    });
    var quantified_split = quantified_split.filter(function(item){
        return item != "\u0306";
    });

    // Then we accentify:
    if(num_syllables > 2){ // Ignore words of less than 3 syllables (never accented).
        accentable = true;
        var nb_vowels = 0; // Will count the 3 last syllables (antepenult., penult., ult.).
        var accent_pos = 0; // Will contain the position of accent.
        for(var j = 0; j < quantities.length; j++){
            var qty = quantities[quantities.length - j - 1];
            if(qty != "0"){ // Not a consonantic.
                nb_vowels ++;
                if((nb_vowels == 2 && qty == "+") || (nb_vowels == 3 && accent_pos == 0)){
                    // Case of "ae":
                    if(plain_split[quantities.length - j - 1] == "e" && plain_split[quantities.length - j - 2] == "a"){
                        if(qty == "0"){ // "āe" like in "sǽculum".
                            accent_pos = quantities.length - j - 1;
                        }
                        else if(qty == "-"){ // "āĕ" like in "áeris".
                            accent_pos = quantities.length - j;
                        }
                    }
                    // Cases of "oe", "au", "eu": accent on the first letter (except if the second letter is long):
                    else if(["e", "u"].indexOf(plain_split[quantities.length - j - 1]) != -1 && ["a", "e", "o", "A", "E", "U"].indexOf(plain_split[quantities.length - j - 2]) != -1 && qty != "+"){
                        accent_pos = quantities.length - j - 1;
                    }
                    // Other cases:
                    else{
                        accent_pos = quantities.length - j;
                    }
                }
            }
        }

        if(vowels.indexOf(plain[accent_pos - 1]) < 6 && num_syllables > 2){ // Never accentify an uppercase, nor a word of less than 3 syllables (elsewhere, for ex., coepit will be accented on "oe").
            plain_split[accent_pos - 1] = accented[vowels.indexOf(plain[accent_pos - 1])];

            // áe (if e has no quantity):
            if(plain_split[accent_pos - 1] == "á" && quantified_split[accent_pos] == "e"){
                plain_split[accent_pos - 1] = "\u01FD";
                plain_split[accent_pos] = "";
            }
            // óe (if e has no quantity):
            if(plain_split[accent_pos - 1] == "ó" && quantified_split[accent_pos] == "e"){
                plain_split[accent_pos - 1] = "œ\u0301";
                plain_split[accent_pos] = "";
            }
        }
    }

    // ae and oe => æ and œ (if e has no quantity):
    for(var j = 0; j < plain_split.length; j++){
        if(plain_split[j] == "a" && quantified_split[j + 1] == "e"){
            plain_split[j] = "æ";
            plain_split[j + 1] = "";
        }
        if(plain_split[j] == "o" && quantified_split[j + 1] == "e"){
            plain_split[j] = "œ";
            plain_split[j + 1] = "";
        }
    }
    with_accents = plain_split.join("");
    return([accentable, with_accents]);
}

// Counts the number of vowels in a word:
function count_vowels(word){
    var num_v = 0;
    for(var i = 0; i < word.length; i++){
        if(vowels.indexOf(word[i]) != -1){
            if(!(word[i] == "u"  && ["q", "g"].indexOf(word[i - 1]) != -1)){
                num_v ++;
            }
        }
    }
    return(num_v);
}

// Returns true if the first letter of "word" is uppercase:
function is_uppercase(word){
    return(uppercase.indexOf(word.charAt(0)) != -1 ? true : false);
}

// Word => word:
function to_lowercase(word){
    var word_split = word.split("");
    word_split[0] = lowercase[uppercase.indexOf(word[0])];
    return(word_split.join(""));
}

// word => Word:
function to_uppercase(word){
    var word_split = word.split("");
    
    // Case of an initial "A" which becomes a long or a breve "a":
    if(longs.indexOf(word_split[0]) != -1){
        word_split[0] = vowels[longs.indexOf(word_split[0])];
    }
    if(breves.indexOf(word_split[0]) != -1){
        word_split[0] = vowels[breves.indexOf(word_split[0])];
    }

    word_split[0] = uppercase[lowercase.indexOf(word_split[0])];
    return(word_split.join(""));
}

// Eliminates all the redundances in an array of accented words:
function reduce(this_array){
    var result = [];
    for(var i = 0; i < this_array.length; i++){
        if(result.indexOf(this_array[i]) == -1){
            result.push(this_array[i]);
        }
    }
    return(result);
}

// Returns a word with his last vowel long (useful with enclitics):
function last_long(word){
    for(i = 0; i < vowels.length; i++){
        regex = new RegExp(longs[i], "g");
        word = word.replace(regex, vowels[i]);
        regex = new RegExp(breves[i], "g");
        word = word.replace(regex, vowels[i]);
    }
    /(\S*)([aeiouy])([bcdfghjklmnpqrstvxz]*)/.exec(word);
    return(RegExp.$1 + longs[vowels.indexOf(RegExp.$2)] + RegExp.$3);
}

