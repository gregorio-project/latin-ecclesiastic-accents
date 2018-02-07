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
    // We split the word into 2 splinters,
    // 1|2345, then 12|345, 123|45, 1234|5, 12345,
    // and each time we search if we find the 2 splinters
    // in our roots' and terminations' Objects:
    for(var i = 1; i <= word.length; i++){
        var root = word.substring(0, i);
        var term = word.substring(i, word.length);
        if(roots[root] != null && terminations[term] != null){
            for(var sub_root in roots[root]){
                r = roots[root][sub_root]
                var r_quantified = r[0];
                var model = r[1];
                var num_root = r[2];
                var rate = r[3];
                if(model == "inv"){
                    word = r_quantified;
                }
                else{
                    for(var sub_t in terminations[term]){
                        t = terminations[term][sub_t]
                        if(t[0] == model && t[1] == num_root){
                            word = r_quantified + t[2];
                        }
                    }
                }
            }
        }
    }
    return(word);
}

