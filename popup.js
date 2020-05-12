$(document).ready(function () {
  window.onload = function () {
    renderData();
  };

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
    var stored = JSON.parse(localStorage.getItem('data'));
    console.log(stored);

    stored.push({ name: name, url: url });

    localStorage.setItem('data', JSON.stringify(stored));

    var result = JSON.parse(localStorage.getItem('data'));

    console.log('result');
  }

  function clearInputFields() {
    $('.name-field').val('');
    const url = $('.url-field').val('');
  }

  $('.saveBtn').click(function () {
    const name = $('.name-field').val().toLowerCase();
    const url = $('.url-field').val();
    // localStorage.clear();

    if (localStorage.getItem('data') === null && name && url) {
      saveData(name, url);
      clearInputFields();
      renderData();
    } else if (name && url) {
      saveNewData(name, url);
      clearInputFields();
      renderData();
    } else alert('Enter All Fields Please. 🙂');

    // for (var i = 0; i < localStorage.length; i++) {
    //   console.log(localStorage.getItem(localStorage.key(i)));
    // }
    // localStorage.removeItem('name');
  });

  function renderData() {
    var allData = JSON.parse(localStorage.getItem('data'));

    // console.log(allData);
    allData.map(d => {
      console.log(d.name, d.url);
      if (d.name !== undefined && d.url !== undefined) {
        $('.flex-container').append(`<div class="flex">
        <a href=${d.url} target="_blank">
        <i class="fa fa-${d.name}" style="color:rgb(190, 96, 65) ">
        </i>
        </a>
        </div>`);
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
