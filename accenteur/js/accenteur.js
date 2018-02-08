$("document").ready(function(){
    $("#input").keyup(function(e){
        var words = e.target.value.split(/\b/);
        for(var i = 0; i < words.length; i++) {
            if(words[i].length > 2){
                words[i] = accentify(words[i]);
            }
        }
        $("#output").val(words.join(''));
    });
});

function accentify(word){
    // We split the word into 2 splinters, like this:
    // 1|2345, then 12|345, then 123|45, then 1234|5, then 12345,
    // and each time we search if we find these 2 splinters
    // in our roots' and terminations' Objects:
    var accented_word = word;
    var found = false;
    for(var i = 1; i <= word.length; i++){
        var root = word.substring(0, i);
        var term = word.substring(i, word.length);
        if(roots[root] != null && terminations[term] != null){
            found = true;
            for(var sub_root in roots[root]){
                r = roots[root][sub_root]
                var quantified = r[0];
                var model = r[1];
                var num_root = r[2];
                var rate = r[3];
                if(model == "inv"){
                    accented_word = qty_to_accent(word, quantified);
                }
                else{
                    for(var sub_t in terminations[term]){
                        t = terminations[term][sub_t]
                        if(t[0] == model && t[1] == num_root){
                            accented_word = qty_to_accent(word, quantified + t[2]);
                        }
                    }
                }
            }
        }
    }
    if(found){
        return(accented_word);
    }
    else{
        return("$$$" + accented_word + "$$$");
    }
}

function qty_to_accent(plain, quantified){
    var vowels = ["a", "e", "i", "o", "u", "y", "A", "E", "I", "O", "U", "Y"];
    var longs = ["ā", "ē", "ī", "ō", "ū", "ȳ", "Ā", "Ē", "Ī", "Ō", "Ū", "Ȳ"];
    var breves = ["ă", "ĕ", "ĭ", "ŏ", "ŭ", "ў", "Ă", "Ĕ", "Ĭ", "Ŏ", "Ŭ", "Ў"];
    var accented = ["á", "é", "í", "ó", "ú", "ý"];
    var consonants = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "x", "z"];
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








