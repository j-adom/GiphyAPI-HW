var topics = ['Dougie','Deedee','Red Fraggle','Puppy','Lil D','Tipsy D','Valerie','Big D','Sleepy D','Princess D']
const apiKey = "7J5zGMIzC45gFO3gY45PWNykemQTQpFJ"


function printButtons() {
    $("#button-list").empty()
    for(i=0;i<topics.length;i++){
        let buttonText = topics[i]
        let newButton = $("<button>").text(buttonText)
                        .addClass("gif-button")
        $("#button-list").append(newButton);
    }

    $(".gif-button").on("click", function() {
      let nickname = $(this).text()
      console.log(nickname)
      postGifs(nickname)
    })
}

function postGifs(searchTerm){
    
  $("#gif-display").empty();   
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key="+ apiKey + "&q=" +searchTerm + "&limit=10&lang=en"    
  console.log(queryURL)
  $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      
      for(j=0;j<10;j++){
          let newDiv = $("<div>").addClass("gif")
          let newGif = $('<img>')
          newGif.attr('src', response.data[j].images.fixed_height_still.url)         // ADD gif PROPERTIES.
                .attr('gif-still', response.data[j].images.fixed_height_still.url)
                .attr('gif-animate', response.data[j].images.fixed_height.url)
                .attr('gif-state', 'still')
                .addClass("click-pic")
                .appendTo(newDiv);
          newGif.on("click", animateGif);
          let newRating = $("<p>").html("Gif Rating: " + response.data[j].rating)
          newDiv.append(newRating)
          $("#gif-display").append(newDiv);   
      }
      
     })
  
    
}


printButtons()

$("#add-button").on("click", function(event) {
  event.preventDefault();
  console.log($("#new-nickname").val().trim())
  if($("#new-nickname").val().trim() !== ""){
    topics.push($("#new-nickname").val().trim())
    $("#new-nickname").val("")
    printButtons()
  }  
  
})

function animateGif(){
  
      var state = $(this).attr("gif-state");
      console.log(state)
      if (state === "still") {
        $(this).attr("src", $(this).attr("gif-animate"));
        $(this).attr("gif-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("gif-still"));
        $(this).attr("gif-state", "still");
      }
}

