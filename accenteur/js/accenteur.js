var vowels = ["a", "e", "i", "o", "u", "y", "A", "E", "I", "O", "U", "Y"];
var consonants = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "x", "z"];
var longs = ["ā", "ē", "ī", "ō", "ū", "ȳ", "Ā", "Ē", "Ī", "Ō", "Ū", "Ȳ"];
var breves = ["ă", "ĕ", "ĭ", "ŏ", "ŭ", "ў", "Ă", "Ĕ", "Ĭ", "Ŏ", "Ŭ", "Ў"];
var accented = ["á", "é", "í", "ó", "ú", "ý"];
var uppercase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Y", "Z"];
var lowercase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "x", "y", "z"];

$("document").ready(function(){
    $("#input").keyup(function(e){
        var words = e.target.outerText.split(/\b/); // Returns an array of all the words of the input box.
        var is_uppercase = false;
        for(var i = 0; i < words.length; i++) {
            if(words[i].length > 2){
                if(uppercase.indexOf(words[i].charAt(0)) != -1){ // Proper name of beginning of sentence.
                    is_uppercase = true;
                }
                words[i] = accentify(words[i], is_uppercase).join("<span class='red'>||</span>"); // Returns each word accentified.
            }
        }
        $("#output").html(words.join('').replace(/\n/g, "</br>"));
    });
});

// Returns the accentified version(s) of word:
function accentify(word, is_uppercase){
    var found = search_quantified(word);
    if(found.length == 0){
        if(is_uppercase){
            found = search_quantified(to_lowercase(word)); // We lowercase and retry.
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
            found[f] = qty_to_accent(word, found[f]);
        }
    }
    return(reduce(found));
}

// Returns an array of all the combinations of roots and terminations that can give word:
function search_quantified(word){
    // We successively split the word into 2 splinters, like this:
    // 1|2345, then 12|345, then 123|45, then 1234|5, then 12345,
    // and each time we search if we find these 2 splinters
    // in our roots' and terminations' Objects:
    var found = [];
    for(var i = 1; i <= word.length; i++){
        var root = word.substring(0, i);
        var term = word.substring(i, word.length);
        if(roots[root] != null && terminations[term] != null){
            for(var sub_root in roots[root]){
                r = roots[root][sub_root]
                var quantified = r[0];
                var model = r[1];
                var num_root = r[2];
                var rate = r[3];
                if(model == "inv"){
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
    var quantities = [quantified.length];
    var num_syllables = 0;
    var with_accents = plain;
    for(var i in quantified){
        var c = quantified[i];
        if(longs.indexOf(c) != -1){
            quantities[i] = "+";
            num_syllables ++;
        }
        else if(breves.indexOf(c) != -1){
            quantities[i] = "-";
            num_syllables ++;
        }
        else{
            quantities[i] = "0";
        }
    }
    if(num_syllables > 2){
        var count_vowels = 0; // To count the 3 last syllables (antepenult., penult., ult.).
        var accent_pos = 0; // Will contain the position of accent.
        for(var i in quantities){
            var q = quantities[quantities.length -1 - i];
            if(q != "0"){ // Not a consonantic.
                count_vowels ++;
                if(count_vowels == 2 && q == "+"){ // Penult. accented.
                    accent_pos = quantities.length - i;
                }
                else if(count_vowels == 3 && accent_pos == 0){ // Antepenult. accented.
                    accent_pos = quantities.length - i;
                }
            }
        }
        plain_split = plain.split("");
        plain_split[accent_pos - 1] = accented[vowels.indexOf(plain[accent_pos - 1])];
        with_accents = plain_split.join("");
    }
    return(with_accents);
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
    word_split[0] = uppercase[lowercase.indexOf(word[0])];
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





