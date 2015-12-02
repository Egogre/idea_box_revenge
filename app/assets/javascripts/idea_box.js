$(document).ready(function(){
  var $ideas = $('#ideas')
  fetchIdeas($ideas);
});

function fetchIdeas($ideas) {
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
  return $('<div><h1>'
         + idea.title
         + '</h1><p><h2>'
         + idea.quality
         + '</h2></p><p class="idea-body idea-truncated">'
         + idea.body
         + '</p><a href="#" class="expand-toggle">show all</a></div>')
};
