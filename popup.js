$(document).ready(function () {
  // sort or drag functionality
  $(function () {
    $('.flex-container').sortable({
      cursor: 'grabbing',
      update: function () {
        let stored = [];
        $('.flex-container div').each(function () {
          let name = $(this).attr('name');
          let url = $(this).attr('url');

          localStorage.clear();

          stored.push({ name, url });
        });
        // saving data after re sort
        localStorage.setItem('data', JSON.stringify(stored));
      },
    });
  });

  // get url domain for get website icon
  function getDomain(url) {
    return url.match(/:\/\/(.[^/]+)/)[1];
  }

  let names = new Array();
  let urls = new Array();
  let data = [{}];
  function saveData(name, url) {
    names.push(name);
    urls.push(url);

    data.push({ name: name, url: url });

    localStorage.setItem('data', JSON.stringify(data));
  }

  function saveNewData(name, url) {
    let stored = JSON.parse(localStorage.getItem('data'));

    stored.push({ name: name, url: url });

    localStorage.setItem('data', JSON.stringify(stored));
  }

  function clearInputFields() {
    $('.name-field').val('');
    $('.url-field').val('');
  }

  $('.saveBtn').click(function () {
    const name = $('.name-field').val();
    const url = $('.url-field').val();

    if (localStorage.getItem('data') === null && name && url) {
      saveData(name, url);
      clearInputFields();
      renderNewData();
    } else if (name && url) {
      saveNewData(name, url);
      clearInputFields();
      renderNewData();
    } else alert('Enter All Fields Please. 🙂');
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

  $(document).on('click', '.remove-url-btn', function () {
    const url = $(this).attr('url');
    removeLink(url);
  });

  function renderNewData() {
    let allData = JSON.parse(localStorage.getItem('data'));
    da = allData[allData.length - 1];

    if (da.name !== undefined && da.url !== undefined) {
      const url = getDomain(da.url);
      let imgUrl = '';
      if (url === 'github.com') {
        imgUrl = './icons/github-icon.png';
      } else {
        imgUrl = `http://www.google.com/s2/favicons?domain=${url}`;
      }
      $('.flex-container').append(`
      <div class="content" name="${da.name}" url="${da.url}">
        <div class="flex draggable">
          <a href="${da.url}" target="_blank">
            <img class="fa" src="${imgUrl}" alt="${da.name}"/><br>
          </a>
        </div>
          <button class="remove-url-btn" url="${da.url}"           title="Remove Link">x</button>
          <span class="tooltiptext1">${da.name}</span>
      </div>
        `);
    }
  }
});
