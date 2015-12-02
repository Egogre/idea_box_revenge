$(document).ready(function(){
  var $ideas = $('#ideas')
  fetchIdeas($ideas);
  $('#idea-save').on('click', function(){
    createIdea($ideas, this);
  });
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

function createIdea($ideas, saveButton) {
  var $parent = $(saveButton).parent();
  var $ideaTitle = $parent.find('#idea-title');
  var $ideaBody = $parent.find('#idea-body');
  //set var title = idea-title.content
  var title = $ideaTitle.val();
  //set var body = idea-body.content
  var body = $ideaBody.val();
  //clean both fields
  $ideaTitle.val('');
  $ideaBody.val('');
  //send AJAX post to create with title and body as params
  $.ajax({
    type: 'POST',
    url:  '/api/v1/ideas',
    data: {idea: { title: title, body: body }},
    dataType: 'json',
    success: function(response){
      var $ideaElement = buildIdeaElement(response);
      $ideas.prepend($ideaElement);
    }
  });
  //update page (build elements and prepend to ideas)
}
