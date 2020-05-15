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

          console.log('stored', stored);
        });
        localStorage.setItem('data', JSON.stringify(stored));
        console.log(localStorage.getItem('data'));
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
    console.log(stored);

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
    // localStorage.clear();

    if (localStorage.getItem('data') === null && name && url) {
      saveData(name, url);
      clearInputFields();
      // $('.flex-container').empty();
      renderNewData();
    } else if (name && url) {
      saveNewData(name, url);
      clearInputFields();
      // $('.flex-container').empty();
      renderNewData();
    } else alert('Enter All Fields Please. 🙂');

    // for (var i = 0; i < localStorage.length; i++) {
    //   console.log(localStorage.getItem(localStorage.key(i)));
    // }
    // localStorage.removeItem('name');
  });

  function renderNewData() {
    let allData = JSON.parse(localStorage.getItem('data'));
    da = allData[allData.length - 1];
    console.log('da', da);
    if (da.name !== undefined && da.url !== undefined) {
      const url = getDomain(da.url);
      $('.flex-container').append(`
      <div class="flex draggable" name=${da.name} url=${da.url}>
          <a href=${da.url} target="_blank">
            <img class='fa' src="http://www.google.com/s2/favicons?domain=${url}" alt=""/><br>
            <span class="tooltiptext">${da.name}</span>
          </a>
        </div>
        `);
    }
  }
  // <img class='fa' src="https://www.google.com/s2/favicons?domain_url=${da.url}" alt=""/>
  // <i class="fa fa-${da.name}" style="color:rgb(190, 96, 65)" aria-hidden="true"></i>

  // <i class="fa fa-${d.name}" style="color:rgb(190, 96, 65)">
  // </i>

  // display all names
  $('.removeBtn').click(function () {
    $('.name-list').empty();
    let data = JSON.parse(localStorage.getItem('data'));
    data.map(d => {
      if (d.name !== undefined) {
        $('.name-list').append(`${d.name},`);
      }
    });
  });

  // remove link
  $('.RemoveSaveBtn').click(function () {
    let oldData = JSON.parse(localStorage.getItem('data'));
    console.log('object1', oldData);

    const removeName = $('.remove-field').val().toLowerCase();
    if (!removeName) {
      alert('Enter name Please. 🙂');
    } else {
      updateData = oldData.filter(el => el.name !== removeName);

      localStorage.setItem('data', JSON.stringify(updateData));

      $('.remove-field').val('');

      $('.flex-container div').each(function () {
        let name = $(this).attr('name');
        if (name === removeName) {
          $(this).remove();
        }
      });
    }
  });

  function renderData() {
    let allData = JSON.parse(localStorage.getItem('data'));
    allData.map(d => {
      console.log(d.name, d.url);
      if (d.name !== undefined && d.url !== undefined) {
        const url = getDomain(d.url);
        $('.flex-container').append(`
          <div class="flex draggable" name=${d.name} url=${d.url}>
            <a href=${d.url} target="_blank">
              <img class='fa' src="http://www.google.com/s2/favicons?domain=${url}" alt=""/>
              <span class="tooltiptext">${d.name}</span>
            </a>
        </div>
        `);
      }
    });
  }
  // $('.addBtn').click(function () {
  //   console.log($('.flex-container div').length % 3);

  //   $('.flex-container').append(`<div class="flex">
  //     <a href="https://www.youtube.com/traversymedia" target="_blank">
  //     <i class="fa fa-youtube" style="color:rgb(190, 96, 65) "></i>
  //     </a>
  //     </div>`);
  // });

  // const ptag = document.getElementById('pTag');
  // $('#myButton').click(function () {
  //   if (ptag.style.display === 'none') {
  //     ptag.style.display = 'block';
  //   } else {
  //     ptag.style.display = 'none';
  //   }
  // });
});
