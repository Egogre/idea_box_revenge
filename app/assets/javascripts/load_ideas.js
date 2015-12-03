function loadIdeas($ideas) {
  $.ajax({
    type: 'GET',
    url:  '/api/v1/ideas',
    success: function(response){
      var $renderedIdeas = response.map(buildIdeaElement).reverse();
      $ideas.html($renderedIdeas);
    }
  });
};

function buildIdeaElement(idea) {
  var showButtons = whichButtons(idea.body.length);
  return $('<div id="'
         + idea.id
         + '" class="idea'
         + idea.id
         + '"><div id ="card1" class="card text-center"><h1 class="idea-title">'
         + idea.title
         + '</h1>'
         + '<button class="upgrade btn btn-success">thumbs up</button>'
         + '<button class="downgrade btn btn-warning">thumbs down</button>'
         + '<h2 class="idea-quality">Current Quality Rank: '
         + idea.quality
         + '</h2><h3 class="idea-body idea-truncated">'
         + idea.body
         + '</h3>'
         + showButtons
         + '</div></div>')
};

function whichButtons(bodyLength) {
  if(bodyLength > 100) {
    return '<button class="expand-toggle btn">show more</button>'
    + '<button class="expand-toggle btn hidden">show less</button>'
    + '<button class="edit-idea btn btn-info">edit</button>'
    + '<button class="delete-button btn btn-danger">delete</button>'
  } else {
    return '<button class="edit-idea btn btn-info">edit</button>'
    + '<button class="delete-button btn btn-danger">delete</button>'
  }
}
