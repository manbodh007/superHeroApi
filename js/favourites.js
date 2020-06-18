
// show the result when user comes on the favourites.js page
 async function showinfo(){
    let i=0;
    let timeout = setInterval(async function(){
     // fetch the superhero ids from the localstorege
        let key = localStorage.key(i);
        let id = localStorage.getItem(key);
        if(i>=localStorage.length){
            clearInterval(timeout);
            setTimeout(deleteHero,3000);
            
        }
        if(id!=null){
        console.log('in xhr');
        var xhrRequest = new XMLHttpRequest();
         // send the request for superhero which is clicked
        xhrRequest.open('get', 'https://www.superheroapi.com/api.php/1143731702657411/' + id);
        xhrRequest.send();
        xhrRequest.onload = async function(){
               
               let response = await JSON.parse(xhrRequest.response);
               let div = document.getElementById('favourites');
               let div1 = document.createElement('div');
               div1.setAttribute('id',`data-id-${id}`);
               div1.setAttribute('class','heros');
               div1.innerHTML = appendheros(response);
               div.appendChild(div1);
          }
        }
        i++;
    },100);
    
   
}
// append result into the body
function appendheros(response){
       return  `
            <div><img src = ${response.image.url}></div>
           <div>${response.name}</div>
           <div>
              <button class = "delete-btn">remove</button>
           </div>
         `
}

showinfo();
// deleting the hero from the favourites page
function deleteHero(){
      let length = localStorage.length;
      console.log(length);
      for(let i=0;i<length;i++){
          let key = localStorage.key(i);
          if(key=='superHero')
            continue;
          let deleteBtn = document.getElementById(key);
          deleteBtn.addEventListener('click',function(){
              document.getElementById(key).remove();
              localStorage.removeItem(key);
          });
      }
      length = localStorage.length;
      if(length==1&&key=='superHero'||length==0){
        let div = document.getElementById('favourites');
        div.innerHTML = '<p> add your favourite heros here </p>';
      }
}





