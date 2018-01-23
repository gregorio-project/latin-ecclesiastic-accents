$("document").ready(function(){
    $.getJSON("data/lemmes.json", function(data){
        alert("OK");
    });
    alert("ready");
});

