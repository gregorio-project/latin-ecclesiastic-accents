$("document").ready(function(){
    $("#input").keyup(function(e){
        $("#output").val(e.target.value);
    });
});

