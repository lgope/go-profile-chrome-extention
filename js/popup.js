$(document).ready(function () {
  // get url domain for get website icon
  function getDomain(url) {
    let domain = url.match(/:\/\/(.[^/]+)/);

    if (domain) {
      return url.match(/:\/\/(.[^/]+)/)[1];
    } else {
      return 0;
    }
  }

  // rendering all link/url
  function renderData(data) {
    console.log('data', data);
    if (data) {
      data.map(d => {
        if (d.name !== undefined && d.url !== undefined) {
          const url = getDomain(d.url);
          let imgUrl = '';
          if (url === 'github.com') {
            imgUrl = '/images/icons/github-icon.png';
          } else if (url === 'stackexchange.com') {
            imgUrl = '/images/icons/stackexchange.png';
          } else {
            imgUrl = `http://www.google.com/s2/favicons?domain=${url}`;
          }
          $('.flex-container').append(`
          <div class="content" id="${d.id}" name="${d.name}" url="${
            d.url
          }" title="${d.name}">
            <div class="flex draggable">
              <a href="${d.url}" target="_blank">
                <img class="fa" src="${imgUrl}" alt="${d.name}"/><br>
              </a>
            </div>
            <button class="remove-url-btn" id="${
              d.id
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

  // random id generate
  const objectId = function () {
    const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
    return (
      timestamp +
      'bbbbbbbbbbbbbbbb'
        .replace(/[b]/g, function () {
          return ((Math.random() * 16) | 0).toString(16);
        })
        .toLowerCase()
    );
  };

  // 1st time saving data to localstorage
  function saveData(name, url) {
    let data = [];
    if (name && url) {
      data.push({ id: objectId(), name: name, url: url });

      localStorage.setItem('data', JSON.stringify(data));
    }
  }

  // after 1st saving data to localstorage
  function saveNewData(name, url) {
    let stored = JSON.parse(localStorage.getItem('data'));

    if (name && url) {
      stored.push({ id: objectId(), name: name, url: url });

      localStorage.setItem('data', JSON.stringify(stored));
    }
  }

  // clear input fields after saving name and url
  function clearInputFields() {
    $('.name-field').val('');
    $('.url-field').val('');
  }

  // show log message
  function showLog(msg, ms) {
    $('.message-log').empty();
    $('.message-log').append(`${msg}`);
    setTimeout(() => {
      $('.message-log').empty();
    }, ms);
  }

  // save button fire after fill up input fields
  $('.saveBtn').click(function () {
    const name = $('.name-field').val();
    const url = $('.url-field').val();

    // checking name & url
    if (!name || !url) {
      showLog('Enter All Fields Please. 🙂', 4000);
      return;
    }

    // checking valid url
    if (!getDomain(url)) {
      showLog('Please enter valid URL!', 5000);
      return;
    }

    if (localStorage.getItem('data') === null && name && url) {
      saveData(name, url);
      clearInputFields();
      renderData([{ name, url }]);

      // showing added messeage
      showLog('<p class="text-success">URL Added 🎉</p>', 2000);
    } else if (name && url) {
      saveNewData(name, url);
      clearInputFields();
      renderData([{ id: objectId(), name: name, url: url }]);

      // showing added messeage
      showLog('<p class="text-success">URL Added 🎉</p>', 2000);
    }
  });

  // remove link
  function removeLink(id) {
    let oldData = JSON.parse(localStorage.getItem('data'));

    updateData = oldData.filter(el => el.id !== id);

    localStorage.setItem('data', JSON.stringify(updateData));

    $('.flex-container div').each(function () {
      let divId = $(this).attr('id');
      if (id === divId) {
        $(this).remove();
      }
    });
  }

  // remove url button fired. Getting url from btn attribute & passing to removeLink method
  $(document).on('click', '.remove-url-btn', function () {
    const id = $(this).attr('id');
    removeLink(id);
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
      distance: 25,
      scroll: false,
      revert: true,
      update: function () {
        let stored = [];
        $('.flex-container div').each(function () {
          const id = $(this).attr('id');
          const name = $(this).attr('name');
          const url = $(this).attr('url');

          localStorage.clear();
          // empty value not saving at localStorage
          if (id && name && url) {
            stored.push({ id, name, url });
          }
        });
        // saving data after re sort
        localStorage.setItem('data', JSON.stringify(stored));
      },
    });
  });
});
