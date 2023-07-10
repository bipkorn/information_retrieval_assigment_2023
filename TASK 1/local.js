
function onEnterProcess(event) {
  let value= event.which;
    if(value==13){
        getResult();
    }
}


function getResult(){

    var xhr = new XMLHttpRequest();
          var url = window.location.href; 
    
    xhr.open('POST',url, true);
    // Set the Content-Type header for form data
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            var highlightedHtml=xhr.responseText; 
            $('#search_result').html(highlightedHtml);
            highlightKeywords();
        } else {
            console.error('Request failed with status ' + xhr.status);
        }
      }
    };

    // Create the form data
    var formData = new FormData();
    formData.append('query',$('#search_input').val());
    formData.append('search_type',$('#search_type').val());

    var urlEncodedData = new URLSearchParams(formData).toString();

    xhr.send(urlEncodedData);
    
 }


function highlightKeywords() {
    var keyword = $('#search_input').val().trim();
    var wordsToHighlight = keyword.split(" ")
    var aTags = document.getElementsByTagName("a");

    // Iterate over each <a> tag
    for (var i = 0; i < aTags.length; i++) {
        // Get the text content of the <a> tag
        var text = aTags[i].textContent;

        // Split the text into individual words
        var words = text.split(" ");

        // Iterate over each word and wrap it in a <span> if it matches a word in the array
        for (var j = 0; j < words.length; j++) {
            if (wordsToHighlight.indexOf(words[j]) !== -1) {
                words[j] = "<span class='highlight'>" + words[j] + "</span>";
            }
        }

        // Join the words back together and update the content of the <a> tag
        aTags[i].innerHTML = words.join(" ");
    }
}



$(document).ready(function () {
  $('#dtBasicExample').DataTable();
  $('.dataTables_length').addClass('bs-select');
});