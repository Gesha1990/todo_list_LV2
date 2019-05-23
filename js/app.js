
var listElements = document.querySelector('.list');
var date = document.querySelector('.date');
var input = document.querySelector('input');
var clear = document.querySelector('.fa-refresh');
var addButton = document.querySelector('.fa-plus');

const CHECK = 'fa-check-circle' ;
const UNCHEK = 'fa-circle-thin';
const LINE_THROUGH = 'lineThrough';


var list = [];
var id = 0;

let data = localStorage.getItem("TODO");

if(data){
	list = JSON.parse(data);
	id = list.length;
	console.log(id)
	loadList(list);
}else{
	list = [];
	id = 0;
}

function loadList(array){
	array.forEach(item => addTodo(item.name, item.id, item.done, item.trash))
}

clear.addEventListener('click', function(event){
	localStorage.clear();
	location.reload();
})

function addTodo(todo, id, done,  trash){

if (trash) {return;}
	var  DONE = done ? CHECK : UNCHEK;
	var  COMPLETE = done ? LINE_THROUGH : ""

	var item = ` <li class="list-item">
	<i class="fa co ${DONE}" data-job="complete" id="${id}"></i>
	<p class="text ${COMPLETE}">${todo}</p>
	<i class="fa fa-trash" data-job="delete" id="${id}"></i>
</li>`

	var position = 'beforeend';
	listElements.insertAdjacentHTML(position, item);
}

var today = new Date();
var options = {weekday: 'long', month: 'short', day: 'numeric'};
date.innerHTML = today.toLocaleDateString('en-US', options);

document.addEventListener("keyup",  bindEvent);
addButton.addEventListener("click", bindEvent);

function bindEvent (event){
	var elementJob = event.target.dataset.job;
	if (event.keyCode == 13 || elementJob == "add") {
		var todo = input.value;
		if (todo){
			addTodo(todo, id, false, false);
			input.value = ""
			list.push({
				name: todo, 
				id: id, 
				done: false,
				trash: false
			})
			localStorage.setItem('TODO', JSON.stringify(list));
			id++;
		} 
	
	}
}
listElements.addEventListener('click', function(event){
	var element = event.target;
	var elementJob = element.dataset.job;
	
	if (elementJob == "complete"){
		
		element.classList.toggle('fa-check-circle');
		element.classList.toggle(UNCHEK);
		element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);
		list[element.id].done = list[element.id].done ? false : true;
		
	} else if (elementJob == "delete") {
		list[element.id].trash = true;
		element.parentNode.remove();
	}
	localStorage.setItem('TODO', JSON.stringify(list));
})
