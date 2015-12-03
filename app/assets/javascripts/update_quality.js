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
