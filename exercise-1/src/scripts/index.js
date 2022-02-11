if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(["external/handlebars"], function (HandleBars) {
  function generateHTML(users) {
    let rawTemplate = document.getElementById("exercise-1").innerHTML;

    let template = HandleBars.compile(rawTemplate);
    let generatedHTML = template({
      avatar: users.avatar,
      name: users.name,
      createdAt: new Date(users.createdAt).toDateString(),
      id: users.id,
    });

    let mainContainer = document.getElementById("main");
    mainContainer.innerHTML += generatedHTML;
  }

  const users = fetch("https://615485ee2473940017efaed3.mockapi.io/assessment")
    .then((res) => res.json())
    .then((users) => {
      for (let i = 0; i < users.length; i++) {
        generateHTML(users[i]);
      }
    });
});

function showDetails(id, btn) {
  let ulElement = document.getElementById("user" + id);
  let createdAt = ulElement.getElementsByClassName("user-created-at")[0];
  let userId = ulElement.getElementsByClassName("user-id")[0];
  if (createdAt.hidden) {
    createdAt.hidden = false;
    userId.hidden = false;
    btn.innerText = 'Hide details'
  } else {
    createdAt.hidden = true;
    userId.hidden = true;
    btn.innerText = 'Show details'
  }
}
