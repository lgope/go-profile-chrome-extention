function getDomain(url) {
  return url.match(/:\/\/(.[^/]+)/)[1];
}

let allData = JSON.parse(localStorage.getItem('data'));
if (allData) {
  allData.map(d => {
    console.log(d.name, d.url);
    if (d.name !== undefined && d.url !== undefined) {
      const url = getDomain(d.url);
      $('.flex-container').append(`
          <div class="flex draggable" name=${d.name} url=${d.url}>
            <a href=${d.url} target="_blank">
              <img class='fa' src="http://www.google.com/s2/favicons?domain=${url}" alt=""/><br>
              <span class="tooltiptext">${d.name}</span>
            </a>
          </div>
        `);
    }
  });
}

// <i class="fa fa-${d.name}" style="color:rgb(190, 96, 65)">
// </i>


// TODO:
// add | remove link css problem