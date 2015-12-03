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
