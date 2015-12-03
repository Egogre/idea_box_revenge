$(document).ready(function(){
  var $ideas = $('#ideas')
  fetchIdeas($ideas);
  $('#idea-save').on('click', function(){
    createIdea($ideas, this);
  });
  $ideas.on('click', '.delete-button', function(){
    deleteIdea(this);
  });
  $ideas.on('click', '.edit-idea', function(){
    editWindow(this);
  });
  $ideas.on('click', '.edit-update', function(){
    editIdea(this);
  });
  $ideas.on('click', '.downgrade', function(){
    downgradeIdea(this);
  });
  $ideas.on('click', '.upgrade', function(){
    upgradeIdea(this);
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
         + '"><div id ="card1" class="card text-center"><h1 class="idea-title">'
         + idea.title
         + '</h1>'
         + '<button class="upgrade btn btn-success">thumbs up</button>'
         + '<button class="downgrade btn btn-warning">thumbs down</button>'
         + '<h2 class="idea-quality">Current Quality Rank: '
         + idea.quality
         + '</h2><h3 class="idea-body idea-truncated">'
         + idea.body
         + '</h3><button class="expand-toggle">show more</button>'
         + '<button class="edit-idea btn btn-info">edit</button>'
         + '<button class="delete-button btn btn-danger">delete</button></div></div>')
};

function createIdea($ideas, saveButton) {
  var $parent = $(saveButton).parent().parent();
  var $ideaTitle = $parent.find('#new-idea-title');
  var $ideaBody = $parent.find('#new-idea-body');
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

function editWindow(editElement) {
  var $parent = $(editElement).parent().parent();
  var ideaTitle = $parent.find('.idea-title').text();
  var ideaBody = $parent.find('.idea-body').text();
  var ideaQuality = $parent.find('.idea-quality').text();

  $parent.find('#card1').hide();
  $parent.append(buildEditArea(ideaQuality));
  $parent.find('#edit-idea-title').val(ideaTitle);
  $parent.find('#edit-idea-body').val(ideaBody);
}

function buildEditArea(ideaQuality) {
  return '<div id ="card2" class="card text-center"><br>'
          + '<input type="text" class="form-control text-center" style="font-size:35px" id="edit-idea-title">'
          + '<br><h2 class="idea-quality">'
          + ideaQuality
          + '</h2><textarea class="form-control text-center" style="font-size:25px" id="edit-idea-body"></textarea>'
          + '<button class="edit-update btn btn-info">update</button></div>'
}

function editIdea(editElement) {
  var $parent = $(editElement).parent().parent();
  var ideaID = $parent.attr('id');
  var title = $parent.find('#edit-idea-title').val();
  var body = $parent.find('#edit-idea-body').val();

  $.ajax({
    type: 'PATCH',
    url:  '/api/v1/ideas/' + ideaID,
    data: { idea: { title: title, body: body } },
    dataType: 'json',
    success: function(response){
      $parent.find('#card1').show();
      $parent.find('.idea-title').text(title);
      $parent.find('.idea-body').text(body);
      $parent.find('#card2').remove();
    }
  });
}

function deleteIdea(deleteButton) {
  var $parent = $(deleteButton).parent().parent();
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
  var $parent = $(downgradeButton).parent().parent();
  var ideaID = $parent.attr('id');
  var $quality = $parent.find('.idea-quality');
  var currentQuality = $quality.text();
  var newQuality = lowerQuality(currentQuality);

  $.ajax({
    type: 'PATCH',
    url:  '/api/v1/ideas/' + ideaID,
    data: { idea: {quality: newQuality} },
    dataType: 'json',
    success: function(response){
      $quality.text(addQuality(newQuality));
    }
  });
}

function upgradeIdea(upgradeButton) {
  var $parent = $(upgradeButton).parent().parent();
  var ideaID = $parent.attr('id');
  var $quality = $parent.find('.idea-quality');
  var currentQuality = $quality.text();
  var newQuality = raiseQuality(currentQuality);

  $.ajax({
    type: 'PATCH',
    url:  '/api/v1/ideas/' + ideaID,
    data: { idea: {quality: newQuality} },
    dataType: 'json',
    success: function(response){
      $quality.text(addQuality(newQuality));
    }
  });
}

function lowerQuality(currentQuality) {
  if(currentQuality === "Current Quality Rank: genius"){
    return 1
  } else {
    return 0
  }
}

function raiseQuality(currentQuality) {
  if(currentQuality === "Current Quality Rank: swill"){
    return 1
  } else {
    return 2
  }
}

function addQuality(newQualityInt) {
  if(newQualityInt === 0){
    return "Current Quality Rank: swill"
  } else if(newQualityInt === 1) {
    return "Current Quality Rank: plausible"
  } else {
    return "Current Quality Rank: genius"
  }
}
