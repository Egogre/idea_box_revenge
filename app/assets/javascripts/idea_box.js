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
