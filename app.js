$(document).ready(function () {
  function getDomain(url) {
    return url.match(/:\/\/(.[^/]+)/)[1];
  }

  let allData = JSON.parse(localStorage.getItem('data'));
  // allData.map((el, key) => console.log(key));
  // console.log(allData);
  if (allData) {
    allData.map((d, key) => {
      // console.log(d.name, d.url, key);
      if (d.name !== undefined && d.url !== undefined) {
        const url = getDomain(d.url);
        $('.flex-container').append(`
        <div class="content" name="${d.name}" url="${d.url}">
          <div class="flex draggable">
            <a href="${d.url}" target="_blank">
              <img class="fa" src="http://www.google.com/s2/favicons?domain=${url}" alt="${d.name}"/><br>
            </a>
          </div>
            <button class="remove-url-btn" url="${d.url}" title="Remove Link">x</button>
            <span class="tooltiptext1">${d.name}</span>
        </div>
          `);
      }
    });
  }

  $('.remove-url-btn').click(function () {
    const url = $(this).attr('url');
    // console.log('url', url);
    removeLink(url);
  });
});

// remove link
function removeLink(url) {
  let oldData = JSON.parse(localStorage.getItem('data'));

  updateData = oldData.filter(el => el.url !== url);

  localStorage.setItem('data', JSON.stringify(updateData));

  $('.flex-container div').each(function () {
    let divUrl = $(this).attr('url');
    if (url === divUrl) {
      $(this).remove();
    }
  });
}

