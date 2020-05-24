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
    if (data) {
      data.map(d => {
        if (d.id !== null && d.name !== null && d.url !== null) {
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
              d.name.length > 10 ? d.name.slice(0, 7) + '...' : d.name
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

  // Save data to localstorage
  function saveNewData(id, name, url) {
    let stored = JSON.parse(localStorage.getItem('data'));

    if (id && name && url) {
      stored.push({ id: id, name: name, url: url });

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
    const id = objectId();

    // checking name & url
    if (!name || !url) {
      return showLog('Enter All Fields Please. 🙂', 4000);
    }

    // checking valid url
    if (!getDomain(url)) {
      return showLog('Please enter valid URL!', 5000);
    }

    // check values and save
    if (id && name && url) {
      saveNewData(id, name, url);
      clearInputFields();
      renderData([{ id: id, name: name, url: url }]);

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
