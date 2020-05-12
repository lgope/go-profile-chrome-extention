
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
