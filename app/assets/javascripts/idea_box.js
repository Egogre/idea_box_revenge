$(document).ready(function(){
  var $ideas = $('#ideas')
  fetchIdeas($ideas);
  $('#idea-save').on('click', function(){
    createIdea($ideas, this);
  });
  $ideas.on('click', '.delete-button', function(){
    deleteIdea(this);
  });
  $ideas.on('click', '.downgrade', function(){
    downgradeIdea(this);
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
  return $('<div id="'
         + idea.id
         + '" class="idea'
         + idea.id
         + '"><h1>'
         + idea.title
         + '</h1>'
         + '<button class="upgrade">thumbs up</button>'
         + '<button class="downgrade">thumbs down</button>'
         + '<p class="idea-quality"><h2>'
         + idea.quality
         + '</h2></p><p class="idea-body idea-truncated">'
         + idea.body
         + '</p><button class="expand-toggle">show all</button>'
         + '<button class="delete-button">delete</button></div>')
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
    data: { idea: { title: title, body: body } },
    dataType: 'json',
    success: function(response){
      var $ideaElement = buildIdeaElement(response);
      $ideas.prepend($ideaElement);
    }
  });
  //update page (build elements and prepend to ideas)
}

function deleteIdea(deleteButton) {
  var $parent = $(deleteButton).parent();
  var ideaID = $parent.attr('id');

  $.ajax({
    type: 'DELETE',
    url:  '/api/v1/ideas/' + ideaID,
    dataType: 'json',
    success: function(response){
      $parent.remove();
    }
  });
}

function downgradeIdea(downgradeButton) {
  var $parent = $(downgradeButton).parent();
  var ideaID = $parent.attr('id');
  var $quality = $parent.find('#idea-quality');
  var currentQuality = $quality.val();
  var newQuality = lowerQuality(currentQuality);

  $.ajax({
    type: 'PATCH',
    url:  '/api/v1/ideas/' + ideaID,
    data: { idea: {title: "fixed", body: "nonono", quality: newQuality} },
    dataType: 'json',
    success: function(response){
      $quality.val(response.quality);
    }
  });
}

function lowerQuality(currentQuality) {
  if(currentQuality === "genius"){
    return 1
  } else {
    return 0
  }
}

function raiseQuality(currentQuality) {
  if(currentQuality === "swill"){
    return 1
  } else {
    return 2
  }
}
