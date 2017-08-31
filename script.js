//Search (Called on keyUP)
function searchquery(){
    var term = document.getElementById("Termm").value;
    var t = document.getElementById("Term").value;

        if( term.length > 0  ) {
            $.fn.Search(term);
            $(".card").remove();
        }
        else if( t.length > 0){
            $.fn.Search(t);
            $(".card").remove();
        }
        else{
            $(".card").remove();
        }
}

$(".search-icon").click(function(){
    $('.mobile-top-search').css("display","inline-block");
    $('.t-search').css("display","inline-block");
})

$(".arrow").click(function(){
    $('.mobile-top-search').css("display","none");
    $('.t-search').css("display","none");
})


$(document).ready(function(){

    $.fn.Search = function(x){
        $.ajax({
                url:  x ,
                type: 'GET',
                dataType: 'json',
                success: function (data, textStatus, xhr) {
                    data.response.docs.forEach(function(x) {
                        let idd = x.id;
                        console.log(idd);
                            $.ajax({
                                url: 'https://staging.letzchange.org/api/nonprofits/'+ idd ,
                                type: 'GET',
                                dataType: 'json',
                                success: function (data, textStatus, xhr) {
                                    data.members.forEach(function(d,i) {
                                    card = document.createElement('div');
                                    card.className = 'card';
                                    card.id = "CARD"+i;

                                    titlewrapper = document.createElement('div');
                                    titlewrapper.className = 'title-wrapper';
                                    titlewrapper.id = "Title"+i;
                                    titlewrapper.innerHTML = d.name;
                                    card.appendChild(titlewrapper);

                                    contentwrapper = document.createElement('p');
                                    contentwrapper.className = 'content-wrapper';
                                    contentwrapper.id = "Content"+i;
                                    contentwrapper.innerHTML = d.email;
                                    card.appendChild(contentwrapper);
                                    
                                    cwrapper = document.createElement('p');
                                    cwrapper.className = 'content-wrapper';
                                    cwrapper.id = "c"+i;
                                    cwrapper.innerHTML = d.designation;
                                    card.appendChild(cwrapper);

                                    document.getElementById("main").appendChild(card);
                                    });
                                },
                                error: function(xhr, textStatus, errorThrown){
                                    console.log('Error in Database');
                                }       
                            });
                    });
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log('Error in Database');
                }
        });
    }

});