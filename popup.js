$(document).ready(function () {
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

          // console.log('stored', stored);
        });
        localStorage.setItem('data', JSON.stringify(stored));
        // console.log(localStorage.getItem('data'));
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
    // console.log(stored);

    stored.push({ name: name, url: url });

    localStorage.setItem('data', JSON.stringify(stored));
  }

  function clearInputFields() {
    $('.name-field').val('');
    $('.url-field').val('');
  }

  $('.saveBtn').click(function () {
    const name = $('.name-field').val().toLowerCase();
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

  function renderNewData() {
    let allData = JSON.parse(localStorage.getItem('data'));
    da = allData[allData.length - 1];
    // console.log('da', da);
    if (da.name !== undefined && da.url !== undefined) {
      const url = getDomain(da.url);
      $('.flex-container').append(`
      <div class="content" name="${da.name}" url="${da.url}">
          <div class="flex draggable">
            <a href="${da.url}" target="_blank">
              <img class="fa" src="http://www.google.com/s2/favicons?domain=${url}" alt="${da.name}"/><br>
            </a>
          </div>
            <button class="remove-url-btn" url="${da.url}" title="Remove Link">x</button>
            <span class="tooltiptext1">${da.name}</span>
        </div>
        `);
    }
  }
});
