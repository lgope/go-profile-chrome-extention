$(document).ready(function () {
  function getDomain(url) {
    return url.match(/:\/\/(.[^/]+)/)[1];
  }

  let allData = JSON.parse(localStorage.getItem('data'));

  if (allData) {
    allData.map(d => {
      if (d.name !== undefined && d.url !== undefined) {
        const url = getDomain(d.url);
        let imgUrl = '';
        if (url === 'github.com') {
          imgUrl = './icons/github-icon.png';
        } else {
          imgUrl = `http://www.google.com/s2/favicons?domain=${url}`;
        }
        $('.flex-container').append(`
        <div class="content" name="${d.name}" url="${d.url}">
          <div class="flex draggable">
            <a href="${d.url}" target="_blank">
              <img class="fa" src="${imgUrl}" alt="${d.name}"/><br>
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
    removeLink(url);
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
});
