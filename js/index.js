

let timeout;
let timeout2;
let count =0;

function main(){
   window.localStorage.clear();
   // fetching the input value given from user and call the debounce function
   var input = document.getElementById('input');
   if(input!= null)
   input.oninput = debounce;
}

 function showResult(e){
    var superHeroName = e.target.value;
    console.log(superHeroName);
      if(superHeroName.length>2){
        $('#result').empty();
        console.log('in xhr');
        var xhrRequest = new XMLHttpRequest();
        xhrRequest.open('get','https://www.superheroapi.com/api.php/1143731702657411/search/' + superHeroName);
        xhrRequest.send();
        xhrRequest.onload = function(){
         var response = JSON.parse(xhrRequest.response);
          appendHero(response,0);
          appendHero(response,1);
          appendHero(response,2);
         }
      }else{
         $('#result').empty();
         $('#result').append('<p>result not found</p>');
      }
      

       
}
// using this debounce function to minimize the api search request
function debounce(e){
  
  clearTimeout(timeout);
  timeout = setTimeout(function(){
    showResult(e);
  },500);
 
}
// appending the heros into the body
function appendHero(response,i){
         var element = document.createElement('div');
         var a = document.createElement('button');
         var img = document.createElement('img');
         var div = document.createElement('div');
         div.innerText = response.results[i].id;
         div.setAttribute('class','superheroId');
         div.style.display = 'none';
    
         var addToFavoritesButton = document.createElement('button');
         addToFavoritesButton.setAttribute('class','fav-btn')
         a.style.textDecoration = 'none';
         addToFavoritesButton.innerHTML = "add to fav";
         img.setAttribute('src',response.results[i].image.url);
         a.setAttribute('class','link');
         a.innerHTML = response.results[i].name;
         var resultContainer = document.getElementById('result');
         resultContainer.appendChild(element);
         element.appendChild(img);
         element.appendChild(a);
         element.appendChild(addToFavoritesButton);
         element.appendChild(div);
}

main();
superHeroPage();
favouriteList();
// handle the click event to show more information about the hero
function superHeroPage(){
     let id = setInterval(function(){
      var aTag = document.querySelectorAll('.link');
      for(let i=0;i<aTag.length;i++){
        aTag[i].addEventListener('click',function(){
            var name = aTag[i].innerHTML;
            window.localStorage.setItem('superHero',name);
            window.open('superhero.html','_blank');
        });
      }
     },100);
};
// handle the click event to add the favourites hero into a list
function favouriteList(){
 let id = setInterval(function(){
  var favBtn = document.getElementsByClassName('fav-btn');
    for(let i=0;i<favBtn.length;i++){
      favBtn[i].addEventListener('click',function(){
        debounceForClick(i);
      });
    }
 },100);
  
}
// debounce for favourites list function
function debounceForClick(i){
  clearTimeout(timeout2)
  timeout2 = setTimeout(function(){
    var id = document.querySelectorAll('.superheroId');
    var heroId = id[i].innerHTML;
    window.localStorage.setItem(`data-id-${heroId}`,heroId); 
    count++;
  },200);
  
}



