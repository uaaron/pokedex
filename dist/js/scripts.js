let pokemonRepository=function(){let t=[];function e(e){"object"==typeof e&&null!==e?t.push(e):console.error("Invalid input")}function n(){return t}function i(t){return fetch(t.detailsUrl).then(function(t){return t.json()}).then(function(e){t.imageUrlFront=e.sprites.front_default,t.imageUrlBack=e.sprites.back_default,t.height=e.height,t.types=e.types.map(function(t){return t.type.name})}).catch(function(t){console.error(t)})}return{add:e,getAll:n,loadList:function t(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function(t){return t.json()}).then(function(t){t.results.forEach(function(t){e({name:t.name,detailsUrl:t.url})})}).catch(function(t){console.error(t)})},loadDetails:i,addListItem:function t(e){let n=document.querySelector("ul"),o=document.createElement("li"),a=document.createElement("button");o.classList.add("list-group-item","bg-warning"),a.innerText=e.name,a.classList.add("btn","btn-primary","btn-lg","btn-block"),a.setAttribute("data-toggle","modal"),a.setAttribute("data-target","#modal-container"),o.appendChild(a),n.appendChild(o),a.addEventListener("click",function(){(function t(e){i(e).then(()=>{var t;let n,i,o,a,r,l,p;t=e,n=$(".modal-body"),i=$(".modal-title"),i.empty(),n.empty(),o=$("<h1>"+t.name+"</h1>"),a=$('<img class="modal-img" style="width:50%">'),a.attr("src",t.imageUrlFront),r=$('<img class="modal-img" style="width:50%">'),r.attr("src",t.imageUrlBack),l=$("<p>Height: "+t.height+"</p>"),p=$("<p>Types: "+t.types.join(", ")+"</p>"),i.append(o),n.append(a),n.append(r),n.append(l),n.append(p)})})(e)})}}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(t){pokemonRepository.addListItem(t)})});