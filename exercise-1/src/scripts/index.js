requirejs(["external/handlebars"], function (HandleBars) {

  function showDetails(id){
    let ulElement = document.getElementById(id);
    let createdAt = ulElement.getElementsByClassName('user-created-at')
    let userId = ulElement.getElementsByClassName('user-id')
  }

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
