requirejs(['external/handlebars'], function(HandleBars){
    const users = fetch("https://615485ee2473940017efaed3.mockapi.io/assessment")
    .then((res) => res.json())
    .then((data) => console.log(data));
  
  var template = HandleBars.compile("Handlebars <b>{{doesWhat}}</b>");

  console.log(template({ doesWhat: "rocks" }));
  
})