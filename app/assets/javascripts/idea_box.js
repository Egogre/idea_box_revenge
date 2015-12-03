$(document).ready(function(){
  var $ideas = $('#ideas')
  loadIdeas($ideas);
  $('#idea-save').on('click', function(){
    createIdea($ideas, this);
  });

  $('#search').keyup(function() {
    var $cards = $ideas.children();
    var searchValue = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

    $cards.show().filter(function() {
        var cardText = $(this).text().replace(/\s+/g, ' ').toLowerCase();
        return !~cardText.indexOf(searchValue);
    }).hide();
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

  $ideas.on('click', '.expand-toggle', function(){
    toggleFullBody(this);
  });
});

function toggleFullBody(toggleButton) {
  var $body = $(toggleButton).parent().find('.idea-body');
  $body.toggleClass('idea-truncated')
  var $toggleButtons = $(toggleButton).parent().find('.expand-toggle');
  $toggleButtons.toggleClass('hidden')
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
