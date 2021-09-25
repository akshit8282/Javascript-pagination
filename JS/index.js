let page=1;
let colors={};

function inc() {
    page=page+1;
    callapi();
}
function dec()
{
    page=page-1;
    callapi();
}


function callapi() {
    document.getElementById("page").innerHTML=page;
    var xhttp = new XMLHttpRequest();

    xhttp.open(
      'GET',
      `https://api.thedogapi.com/v1/images/search?limit=10&page=${page}`,
      true
    );

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let data= this.responseText;
        dogdata(JSON.parse(data));
      }
    };
    
    xhttp.send();
}

function dogdata(data)
{
    let ul=document.getElementById("dogs");
    ul.innerHTML="";
    for(let i=0;i<data.length;i++)
    {
        
        let dog=data[i];
        let breed=dog.breeds[0];
        let li = document.createElement('li');

        li.setAttribute('class', 'dog_info');
        if(breed)
        {
            let c_id=breed.id;
            if(!colors[c_id])
            {
                var x = Math.floor(Math.random() * 256);
                var y = 256 - Math.floor(Math.random() * 256);
                var z = 256 - Math.floor(Math.random() * 256);
                colors[c_id] = 'rgb(' + x + ',' + y + ',' + z + ')';
            }

            li.style.color=colors[c_id];
            
        }
        
        
        li.innerHTML = `<img class="dog_image" src="${dog.url}">
                    <div class="info_container">
                        ${
                          breed
                            ? `<h3>Breed:<span>  ${breed.name}</span></h3>`
                            : '--------'
                        }
                        <p>Width:<span> ${dog.width} cm</span></p>
                        <p>Height:<span> ${dog.height} cm</span></p>
                        ${
                          breed
                            ? `<p>Nature: <span>${breed.temperament}</span></p>`
                            : '-------'
                        }
                    </div>`;
        
        ul.appendChild(li);
    }


}