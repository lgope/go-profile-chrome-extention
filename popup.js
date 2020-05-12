$(document).ready(function () {
  // $('#copyright').appendChild(document.createTextNode(new Date().getFullYear()))

  // window.onload = function () {
  //   renderData();
  // };

  let names = new Array();
  let urls = new Array();
  let data = [{}];
  function saveData(name, url) {
    if (name == 'stackoverflow') {
      name = 'stack-overflow';
    }

    if (name == 'messenger') {
      name = 'facebook-messenger';
    }


    names.push(name);
    urls.push(url);

    data.push({ name: name, url: url });

    localStorage.setItem('data', JSON.stringify(data));
  }

  function saveNewData(name, url) {
    var stored = JSON.parse(localStorage.getItem('data'));
    console.log(stored);

    if (name == 'stackoverflow') {
      name = 'stack-overflow';
    }

    if (name == 'messenger') {
      name = 'facebook-messenger';
    }


    stored.push({ name: name, url: url });

    localStorage.setItem('data', JSON.stringify(stored));

    var result = JSON.parse(localStorage.getItem('data'));

    // console.log('result');
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
      $('.flex-container').append(`<div class="flex">
        <a href=${da.url} target="_blank">
        <i class="fa fa-${da.name}" style="color:rgb(190, 96, 65)" aria-hidden="true">
        </i>
        </a>
        </div>`);
    }
  }

  function renderData() {
    let allData = JSON.parse(localStorage.getItem('data'));
    allData.map(d => {
      console.log(d.name, d.url);
      if (d.name !== undefined && d.url !== undefined) {
        $('.flex-container').append(`<div class="flex">
        <a href=${d.url} target="_blank" name=${d.name}>
        <i class="fa fa-${d.name}" style="color:rgb(190, 96, 65)">
        </i>
        </a>
        </div>`);
      }
    });
  }

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
    updateData = oldData.filter(el => el.name !== removeName);

    localStorage.setItem('data', JSON.stringify(updateData));

    $('.remove-field').val('')
    $('.flex-container').empty();
    renderData();

    console.log('object2', updateData);
  });

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
