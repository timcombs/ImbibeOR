//map listener
$('area').on('click', function(e) {
  e.preventDefault();
  $('#thread-container').empty();
  var regionClicked = $(this).attr('id');
  console.log(regionClicked);
  superagent
    .get(`/api/threads/region/${regionClicked}`)
    .then((res) => {
      console.log('final threads?', res);
      const source = $('#thread-template').html();
      const template = Handlebars.compile(source);
      const threadObject = {
        thread: res.body
      };
      const newHtml = template(threadObject);
      $('#thread-container').append(newHtml);

      if (!sessionStorage.getItem('storedToken')) {
        $('#thread-container button').hide();
        $('#remark-buttons button').hide();
      }
    })
    .catch((err) => {
      console.log(err);
    });
});