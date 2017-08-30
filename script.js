
//Search (Called on keyUP)
function searchquery(){
    var term = document.getElementById("Termm").value;

    if( term.length > 0  ) {
        $.fn.Search(term,"nonprofit");
        $(".card").remove();
    }
    else{
        $(".card").remove();
    }


}


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
                            // if( this.idd === x.id){
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

                                        document.getElementById("main").appendChild(card);
                                        });
                                    },
                                    error: function(xhr, textStatus, errorThrown){
                                        console.log('Error in Database');
                                    }       
                                });
                            // }
                    });
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log('Error in Database');
                }
        });
   }

});