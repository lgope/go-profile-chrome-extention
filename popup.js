$(document).ready(function () {
  // get url domain for get website icon
  function getDomain(url) {
    return url.match(/:\/\/(.[^/]+)/)[1];
  }

  // rendering all link/url
  function renderData(data) {
    if (data) {
      data.map(d => {
        if (d.name !== undefined && d.url !== undefined) {
          const url = getDomain(d.url);
          let imgUrl = '';
          if (url === 'github.com') {
            imgUrl = './icons/github-icon.png';
          } else if (url === 'stackexchange.com') {
            imgUrl = './icons/stackexchange.png';
          } else {
            imgUrl = `http://www.google.com/s2/favicons?domain=${url}`;
          }
          $('.flex-container').append(`
          <div class="content" name="${d.name}" url="${d.url}" title="${
            d.name
          }">
            <div class="flex draggable">
              <a href="${d.url}" target="_blank">
                <img class="fa" src="${imgUrl}" alt="${d.name}"/><br>
              </a>
            </div>
            <button class="remove-url-btn" url="${
              d.url
            }" title="Remove Link">x</button>
            <span class="tooltiptext1">${
              d.name.length > 10 ? d.name.slice(0, 9) + '...' : d.name
            }</span>
          </div>
            `);
        }
      });
    }
  }

  // 1st time saving data to localstorage
  function saveData(name, url) {
    let data = [{}];
    if (name && url) {
      data.push({ name: name, url: url });

      localStorage.setItem('data', JSON.stringify(data));
    }
  }

  // after 1st saving data to localstorage
  function saveNewData(name, url) {
    let stored = JSON.parse(localStorage.getItem('data'));

    if (name && url) {
      stored.push({ name: name, url: url });

      localStorage.setItem('data', JSON.stringify(stored));
    }
  }

  // clear input fields after saving name and url
  function clearInputFields() {
    $('.name-field').val('');
    $('.url-field').val('');
  }

  // save button fire after fill up input fields
  $('.saveBtn').click(function () {
    const name = $('.name-field').val();
    const url = $('.url-field').val();

    if (localStorage.getItem('data') === null && name && url) {
      saveData(name, url);
      clearInputFields();
      renderData([{ name, url }]);
    } else if (name && url) {
      saveNewData(name, url);
      clearInputFields();
      renderData([{ name, url }]);
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

  // remove url button fired. Getting url from btn attribute & passing to removeLink method
  $(document).on('click', '.remove-url-btn', function () {
    const url = $(this).attr('url');
    removeLink(url);
  });

  // rendering data onload
  $(function () {
    let allData = JSON.parse(localStorage.getItem('data'));
    if (allData) {
      renderData(allData);
    }
  });

  // sort or drag functionality
  $(function () {
    $('.flex-container').sortable({
      cursor: 'grabbing',
      tolerance: 'pointer',
      distance: 15,
      scrollSensitivity: 20,
      scroll: false,
      revert: true,
      update: function () {
        let stored = [];
        $('.flex-container div').each(function () {
          let name = $(this).attr('name');
          let url = $(this).attr('url');

          localStorage.clear();
          // empty value not saving at localStorage
          if (name && url) {
            stored.push({ name, url });
          }
        });
        // saving data after re sort
        localStorage.setItem('data', JSON.stringify(stored));
      },
    });
  });
});
