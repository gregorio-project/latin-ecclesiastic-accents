var vowels = ["a", "e", "i", "o", "u", "y", "A", "E", "I", "O", "U", "Y"];
var consonants = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "x", "z"];
var longs = ["ā", "ē", "ī", "ō", "ū", "ȳ", "Ā", "Ē", "Ī", "Ō", "Ū", "Ȳ"];
var breves = ["ă", "ĕ", "ĭ", "ŏ", "ŭ", "ў", "Ă", "Ĕ", "Ĭ", "Ŏ", "Ŭ", "Ў"];
var accented = ["á", "é", "í", "ó", "ú", "ý"];
var uppercase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Y", "Z"];
var lowercase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "x", "y", "z"];

$("document").ready(function(){
    $("#input").keyup(function(e){
        var words = e.target.outerText.split(/([a-zA-Z0-9_\u0027\u00DF-\u00EA\u00EC-\u00EF\u00F1-\u00F6\u00F8-\u00FD\u0101\u0103\u0105\u0107\u0109\u010D\u010F\u0111\u0113\u0117\u0119\u011B\u011D\u011F\u0123\u0125\u012B\u012F\u0131\u0135\u0137\u013C\u013E\u0142\u0144\u0146\u0148\u0151\u0153\u0155\u0159\u015B\u015D\u015F\u0161\u0165\u016B\u016D\u016F\u0171\u0173\u017A\u017C\u017E\u017F\u0219\u021B\u02BC\u0390\u03AC-\u03CE\u03F2\u0401\u0410-\u044F\u0451\u0454\u0456\u0457\u045E\u0491\u0531-\u0556\u0561-\u0587\u0902\u0903\u0905-\u090B\u090E-\u0910\u0912\u0914-\u0928\u092A-\u0939\u093E-\u0943\u0946-\u0948\u094A-\u094D\u0982\u0983\u0985-\u098B\u098F\u0990\u0994-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BE-\u09C3\u09C7\u09C8\u09CB-\u09CD\u09D7\u0A02\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A14-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A82\u0A83\u0A85-\u0A8B\u0A8F\u0A90\u0A94-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABE-\u0AC3\u0AC7\u0AC8\u0ACB-\u0ACD\u0B02\u0B03\u0B05-\u0B0B\u0B0F\u0B10\u0B14-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3E-\u0B43\u0B47\u0B48\u0B4B-\u0B4D\u0B57\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB5\u0BB7-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C02\u0C03\u0C05-\u0C0B\u0C0E-\u0C10\u0C12\u0C14-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3E-\u0C43\u0C46-\u0C48\u0C4A-\u0C4D\u0C82\u0C83\u0C85-\u0C8B\u0C8E-\u0C90\u0C92\u0C94-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBE-\u0CC3\u0CC6-\u0CC8\u0CCA-\u0CCD\u0D02\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D28\u0D2A-\u0D39\u0D3E-\u0D43\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D60\u0D61\u0D7A-\u0D7F\u1F00-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB2-\u1FB4\u1FB6\u1FB7\u1FBD\u1FBF\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD2\u1FD3\u1FD6\u1FD7\u1FE2-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u200D\u2019]+)/g); // Returns an array of all the words of the input box.
        var is_uppercase = false;
        for(var i = 0; i < words.length; i++) {
            if(words[i].length > 2){
                if(uppercase.indexOf(words[i].charAt(0)) != -1){ // Proper name or beginning of sentence.
                    is_uppercase = true;
                }
                words[i] = words[i].replace(/æ/g, 'ae');
                words[i] = words[i].replace(/Æ/g, 'Ae');
                words[i] = words[i].replace(/œ/g, 'oe');
                words[i] = accentify(words[i], is_uppercase).join("<span class='red'>/</span>"); // Returns each word accentified.
            }
        }
        var output = words.join('');
        output = output.replace(/\n/g, "</br>").replace(/\s\s*/g, " "); // Linebreaks, multiple spaces.
        $("#output").html(output);
    });
});

// Returns the accentified version(s) of word:
function accentify(word, is_uppercase){
    var found = search_quantified(word);
    if(found.length == 0){
        if(is_uppercase){
            found = search_quantified(to_lowercase(word)); // If uppercase, we lowercase and retry.
            for(var f in found){
                found[f] = to_uppercase(found[f]);
            }
        }
    }
    if(found.length == 0){
        if(word.search(/[!?:;]/) == -1){
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
                if(root == word){
                    found.push(quantified);
                }
                else{
                    for(var sub_t in terminations[term]){
                        t = terminations[term][sub_t]
                        if(t[0] == model && t[1] == num_root){
                            found.push(quantified + t[2]);
                        }
                    }
                }
            }
        }
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
        if(vowels.indexOf(c) != -1){ // Vowel without quantity is considered as a breve, unless it is the final letter of the word (but not after an other vowel, except a final "ae").
            if(i == quantified.length - 1){
                if(vowels.indexOf(plain[plain.length - 2]) != -1 && (c == "e" && plain[plain.length - 2] == "a") == false){
                    quantities[i] = "-";
                }
                else{
                    quantities[i] = "0";
                }
            }

            else{
                quantities[i] = "-";
            }
            if((["e", "u"].indexOf(plain[i]) != -1 && ["a", "e", "A", "E"].indexOf(plain[i - 1]) != -1) == false){ // If c is not the second letter of "au", "eu", "ae", "oe".
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
                if(count_vowels == 2 && q == "+"){ // Penult. accented.
                    accent_pos = quantities.length - i;
                }
                else if(count_vowels == 3 && accent_pos == 0){ // Antepenult. accented.
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

// Word => word:
function to_lowercase(word){
    word_split = word.split("");
    word_split[0] = lowercase[uppercase.indexOf(word[0])];
    return(word_split.join(""));
}

// word => Word:
function to_uppercase(word){
    word_split = word.split("");
    
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










