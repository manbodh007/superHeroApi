function showInfo(){
      superHeroName = window.localStorage.getItem('superHero');
      console.log(superHeroName);
       var xhrRequest = new XMLHttpRequest();
        xhrRequest.open('get','https://www.superheroapi.com/api.php/1143731702657411/search/' + superHeroName);
       xhrRequest.send();
      xhrRequest.onload = function(){
          var response = JSON.parse(xhrRequest.response);
          appendElement(response);
      }
}

function appendElement(response){
       var result = response.results[0];
       var powerstats = result.powerstats;
       var name = result.name;
        var biography = result.biography;
          var body = document.querySelector("#container");
          var ul = document.createElement('ul');
          ul.setAttribute('id','superhero');
          ul.innerHTML = 
          `<div>
          <img src = ${result.image.url}>
          </div>
      <li>
          <h2>name</h2>
          <h4>${name}</h4>
      </li>
      <li>
          <h2>full name</h2>
          <h4>${biography['full-name']}</h4>
      </li>
      <li>
          <h2>place-of-birth</h2>
          <h4>${biography['place-of-birth']}</h4>
      </li>
      <li>
          <h2>Intelligence</h2>
          <h4>${powerstats.intelligence}</h4>
      </li>
      <li>
          <h2>speed</h2>
          <h4>${powerstats.speed}</h4>
      </li>
      <li>
          <h2>strength</h2>
          <h4>${powerstats.strength}</h4>
      </li> `
      body.appendChild(ul);
          
}

showInfo();