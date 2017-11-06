
//****************** Global Variables *****************//

var sportsTeams = ["Barcelona", "Real Madrid", "Liverpool", "PSG", "Club America", "Lakers",];


//****************** List of functions *****************//

function showcontent() {
      $("#gifArea").empty();
      var team = $(this).attr("teamName");
      var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=IelN2EsP53lCGIzF6kjIakIkgXbSa3bL&q="
                     + team + "&limit=10&offset=0&rating=G&lang=en";

       console.log(queryURL);              

      $.ajax({

        url: queryURL,
        method: "GET"

      }).done(function(response){

        
        //Creating the gifs and rating for each gif
        for (var i = 0; i < 10; i++) {

          var rating = ("<p> Rating: " + response.data[i].rating + "</p>");
          var image = $("<img>").attr("src", response.data[i].images.original_still.url);
          image.attr("data-state","still");
          image.attr("data-still",response.data[i].images.original_still.url);
          image.attr("data-animate",response.data[i].images.original.url);


          image.addClass("gif");
          var newDiv = $("<div>")
          newDiv.addClass("col-xs-4 col-xs-12 gifs");
          newDiv.append(rating, image);

          $("#gifArea").append(newDiv);
        };

    });

};

$(document).on("click", ".gif", function(){

        var state = $(this).attr("data-state");

        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate")  );
          $(this).attr("data-state", 'animate' );
        }
        else if ( state === "animate" ) {
          $(this).attr("src", $(this).attr("data-still")  );
          $(this).attr("data-state", 'still' )

        }


});



function renderButtons() {

      $("#buttonArea").empty();
      $("#userInput").val("");

      for (var i = 0; i < sportsTeams.length; i++) {

            var newTeam = $("<button>");
            newTeam.addClass("teams");
            newTeam.attr("teamName", sportsTeams[i]);
            newTeam.text(sportsTeams[i]);
            $("#buttonArea").append(newTeam);

      }

};


$("#addButton").on("click", function(event) {
      
    if( $("#userInput").val()=="" || sportsTeams.indexOf( $("#userInput").val()  )  > -1   ){

      return false;

    } 
    else {

        sportsTeams.push($("#userInput").val());
        $("#buttonArea").append(sportsTeams);
        event.preventDefault();
        renderButtons();

    }    


});

$(document).on("click", ".teams", showcontent);

renderButtons();


