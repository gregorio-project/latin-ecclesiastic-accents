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
    if(found.length == 0){
        // If uppercase, lowercase and retry:
        if(uppercase){
            found = search_quantified(to_lowercase(word));
            for(var f in found){
                if(f != ""){
                    found.push(to_uppercase(found[f]));
                }
            }
        }
    }

    // If enclitics, remove enclitic and retry:
    // -que:
    if(word.indexOf("que") == word.length - 3){
        var sub_word = word.substring(0, word.length - 3);
        var sub_found = search_quantified(sub_word);
        if(sub_found.length != 0){
            found.push(last_long(sub_word) + "quĕ");
        }
        // If uppercase, lowercase and retry:
        else if(uppercase){
            sub_found = search_quantified(to_lowercase(sub_word));
            if(sub_found.length != 0){
                found.push(last_long(sub_word) + "quĕ");
            }
        }
    }
    // -ne:
    if(word.indexOf("ne") == word.length - 2){
        var sub_word = word.substring(0, word.length - 2);
        var sub_found = search_quantified(sub_word);
        if(sub_found.length != 0){
            found.push(last_long(sub_word) + "nĕ");
        }
        // If uppercase, lowercase and retry:
        else if(uppercase){
            sub_found = search_quantified(to_lowercase(sub_word));
            if(sub_found.length != 0){
                found.push(last_long(sub_word) + "nĕ");
            }
        }
    }
    // -ve:
    if(word.indexOf("ve") == word.length - 2){
        var sub_word = word.substring(0, word.length - 2);
        var sub_found = search_quantified(sub_word);
        if(sub_found.length != 0){
            found.push(last_long(sub_word) + "vĕ");
        }
        // If uppercase, lowercase and retry:
        else if(uppercase){
            sub_found = search_quantified(to_lowercase(sub_word));
            if(sub_found.length != 0){
                found.push(last_long(sub_word) + "vĕ");
            }
        }
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
        for(var f in found){
            found[f] = qty_to_accent(word, found[f])[1];
        }
    }
    return(reduce(found));
}

// Returns an array of all the combinations of roots and terminations that can give word:
function search_quantified(word){
    // We successively split the word into 2 splinters, like this for a word of five letters:
    // |12345, then 1|2345, then 12|345, then 123|45, then 1234|5, then 12345,
    // and each time we search if we find these 2 splinters
    // in our roots' and terminations' Objects:
    var found = [];
    for(var i = 0; i <= word.length; i++){
        var root = word.substring(0, i);
        var term = word.substring(i, word.length);
        if(roots[root] != null && terminations[term] != null){
            for(var sub_root in roots[root]){
                r = roots[root][sub_root]
                var quantified = r[0];
                var model = r[1];
                var num_root = r[2];
                if(root == word && (model == "inv" || models[model]["roots"][num_root] == "K")){
                    found.push(quantified);
                }
                else{
                    for(var sub_t in terminations[term]){
                        t = terminations[term][sub_t]
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

    // We note the quantities of all the vowels of the word:
    for(var i in quantified){
        var c = quantified[i];
        if(vowels.indexOf(c) != -1){ // Vowel without quantity is considered as a breve, except 'u' after 'q'.
            if(plain[i] == "u" && ["Q", "q"].indexOf(plain[i - 1]) != -1 || vowels.indexOf(plain[plain.length - 2]) != -1 && (c == "e" && plain[plain.length - 2] == "a")){
                quantities[i] = "0";
            }
            else{
                quantities[i] = "-";
            }
            if((["e", "u"].indexOf(plain[i]) != -1 && ["a", "e", "o", "A", "E", "q", "g"].indexOf(plain[i - 1]) != -1) == false){ // If c is not the second letter of "au", "eu", "ae", "oe", "qu", "gu".
                num_syllables ++;
            }
        }
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
        var count_vowels = 0; // Will count the 3 last syllables (antepenult., penult., ult.).
        var accent_pos = 0; // Will contain the position of accent.
        for(var i in quantities){
            var q = quantities[quantities.length -1 - i];
            if(q != "0"){ // Not a consonantic.
                count_vowels ++;
                if((count_vowels == 2 && q == "+") || (count_vowels == 3 && accent_pos == 0)){
                    if(["e", "u"].indexOf(plain_split[quantities.length - 1 - i]) != -1 && ["a", "e", "o", "A", "E", "U"].indexOf(plain_split[quantities.length - 2 - i]) != -1){ // "ae", "oe", "au": accent on the first letter.
                        accent_pos = quantities.length - i - 1;
                    }
                    else{
                        accent_pos = quantities.length - i;
                    }
                }
            }
        }

        if(vowels.indexOf(plain[accent_pos - 1]) < 6 && num_syllables > 2){ // Never accentify an uppercase, nor a word of less than 3 syllables (elsewhere, for ex., coepit will be accented on 'oe').
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
    for(var i = 0; i < plain_split.length; i++){
        if(plain_split[i] == "a" && quantified_split[i + 1] == "e"){
            plain_split[i] = "æ";
            plain_split[i + 1] = "";
        }
        if(plain_split[i] == "o" && quantified_split[i + 1] == "e"){
            plain_split[i] = "œ";
            plain_split[i + 1] = "";
        }
    }
    with_accents = plain_split.join("");
    return([accentable, with_accents]);
}

// Counts the number of vowels in a word:
function count_vowels(word){
    var num_v = 0;
    for(var i in word){
        if(vowels.indexOf(word[i]) != -1){
            num_v ++;
        }
    }
    return(num_v);
}

// Returns true if the first letter of 'word' is uppercase:
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
    for(var i in this_array){
        if(result.indexOf(this_array[i]) == -1){
            result.push(this_array[i]);
        }
    }
    return(result);
}

// Returns a word with his last vowel long (useful with enclitics):
function last_long(word){
    /(\S*)([aeiouy])([bcdfghjklmnpqrstvxz]*)/.exec(word)
    return(RegExp.$1 + longs[vowels.indexOf(RegExp.$2)] + RegExp.$3);
}








