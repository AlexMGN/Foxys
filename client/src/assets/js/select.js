$(document).ready(function(){
    $(".radio-options li").bind("click", function() {
        $(this).siblings(".checked").removeClass("checked");
        $(this).addClass("checked");
    });
});
$(document).ready(function(){
    if (Modernizr.touch) {
        $(".radio-options").bind("click", function(event) {
            if (!($(this).parent('.radio-container').hasClass("active")))	{
                $(this).parent('.radio-container').addClass("active");
                event.stopPropagation();
            }
        });
        $(".toggle").bind("click", function(){
            $(this).parents('.radio-container').removeClass("active");
            return false;
        });
    }
})