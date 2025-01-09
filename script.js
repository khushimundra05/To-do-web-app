let input_field=document.querySelector('#input-box');
let add_button=document.querySelector('#add');
let listContainer=document.querySelector("#list-container");

window.onload = getQuote;
const addTask=()=>{
    if(input_field.value === '')
        alert('You must type something!');
    else{
        let li= document.createElement('li');
        li.innerHTML=input_field.value;
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML="\u00d7";
        li.appendChild(span);
    }
    input_field.value='';
    saveData();
}


listContainer.addEventListener('click',(e)=>{
    if(e.target.tagName === 'LI')
        e.target.classList.toggle('checked');
    else if(e.target.tagName === 'SPAN')
        e.target.parentElement.remove();
    saveData();
},false);


const saveData=()=>{
    localStorage.setItem('data',listContainer.innerHTML);
}

const showTasks=()=>{
    listContainer.innerHTML=localStorage.getItem('data');
}
showTasks();

let quote_text=document.querySelector('#quote');
let author=document.querySelector('#author');
let btn=document.querySelector('#btn');

btn.addEventListener('click',getQuote);

function getQuote(){
    fetch("https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/random")
        .then(response => response.json())
        .then(data => {
            const quoteData = data[0];
            quote_text.innerText = `"${quoteData.q}"`;
            author.innerText = `- ${quoteData.a}`;
        })
        .catch(error => {
            quote_text.innerText = "Failed to load quote. Please try again!";
            author.innerText = "";
            console.error("Error fetching quote:", error);
        });
}