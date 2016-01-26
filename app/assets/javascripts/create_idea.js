function createIdea($ideas, saveButton) {
  var $parent = $(saveButton).parent().parent();
  var $ideaTitle = $parent.find('#new-idea-title');
  var $ideaBody = $parent.find('#new-idea-body');
  var title = $ideaTitle.val();
  var body = $ideaBody.val();
  $ideaTitle.val('');
  $ideaBody.val('');
  postNewIdea($ideas, title, body);
}

function postNewIdea($ideas, title, body) {
  $.ajax({
    type: 'POST',
    url:  '/api/v1/ideas',
    data: { idea: { title: title, body: body } },
    dataType: 'json',
    success: function(response){
      var ideaElement = buildIdeaElement(response);
      $ideas.prepend(ideaElement);
    }
  });
}
