const forPrPros = document.querySelector('.forPrPros')
const prosPrFor = document.querySelector('.prosPrFor')
const resources = document.querySelector('.resources')
const ul_reso = document.querySelector('.ul_reso')
const company = document.querySelector('.company')
const ul_comp = document.querySelector('.ul_comp')
const outerBar = document.querySelector('.outer_bar');
const navbarMenu = document.querySelector('.navbar_menu');

outerBar.addEventListener('click',()=>{
    navbarMenu.classList.toggle('active');
})

document.body.addEventListener('click',(e)=>{
    
    if(e.target.classList.contains('forPrPros')){      
            showForPrPros(e);
    }
    else if(e.target.classList.contains('resources')){   
        showResources();
    }
    else if(e.target.classList.contains('company')){   
        showCompany();
    }else{
        removeClass(); 
    }
})


function showForPrPros(e){
    removeClass(); 
    prosPrFor.classList.add('show')
}

function showResources(){
    removeClass();         
    ul_reso.classList.add('show')    
}

function showCompany(){
        removeClass();    
        ul_comp.classList.add('show')    
}

function removeClass(){
    const subNenus = document.querySelectorAll('.sub_menu');
    subNenus.forEach(subMenu=>{
        subMenu.classList.remove('show')
    })
}

// For Type writer effect
const TypeWriter=function(txtElement,words,wait=3000){
    this.txtElement=txtElement;
    this.words=words;
    this.txt='';
    this.wordIndex=0;
    this.wait=parseInt(wait,10);
    this.type();
    this.isDeleting=false;
}

//Type Method
TypeWriter.prototype.type=function(){
    //Current index of word
    const current=this.wordIndex % this.words.length;

    //Get full text of current word
    const fullTxt=this.words[current];

    //Check if deleting
    if(this.isDeleting){
        //Remove char
        this.txt=fullTxt.substring(0,this.txt.length-1);
    }else{
        //Add char
        this.txt=fullTxt.substring(0,this.txt.length+1);        
    }

    //Insert txt into element
    this.txtElement.innerHTML=`
        <span class="txt">${this.txt}</span>
    `;

    // Initial Type Speed
    let typeSpeed=300;

    if(this.isDeleting){
        typeSpeed /=2;
    }

    //If word is complete
    if(!this.isDeleting && this.txt === fullTxt){
        //Make pause at end
        typeSpeed=this.wait;
        //Set delete to true
        this.isDeleting=true;
    }else if(this.isDeleting && this.txt === ''){
        
        this.isDeleting=false;
        //Move to next word
        this.wordIndex++;
        //Pause before start typing
        typeSpeed=500;
    }

    setTimeout(()=>this.type(),typeSpeed)
}

//Init On DOM Load
document.addEventListener('DOMContentLoaded',init);

//Init App
function init(){
    const txtElement=document.querySelector('.txt-type');
    const words=JSON.parse(txtElement.getAttribute('data-words'));
    const wait=txtElement.getAttribute('data-wait');

    //Init Typewriter
    new TypeWriter(txtElement,words,wait);
}

// for slider

var slider_content=document.getElementById('box');
var buttons=document.querySelectorAll('.btn');
const tabs = document.querySelectorAll('.tabs');

buttons.forEach(btn=>btn.addEventListener('click',nextImage))
var image = ['bg1','bg2','bg3','bg4','bg5'];
var text = ["Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
"It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages",
"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur",
"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here",
"Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident"];

var i = image.length;

//function next slide
function nextImage(){
    clearInterval(myImages)
    if(this.id==='nt'){
    if(i<image.length){
        i=i+1;
    }else{
        i=1;
    }
    tabsAndImage(i);
    }
    else if(this.id==='pv'){
        if(i<image.length+1 && i>1){
        i=i-1;
    }else{
        i=image.length;
    }
    tabsAndImage(i);    
    }
}

function tabsAndImage(i){
    var j = i-1;
    tabs.forEach(tab=>tab.classList.remove('colored'));
    tabs[j].classList.add('colored')
    slider_content.innerHTML=
                            "<figure>"+
                             "<img class=image src=img/"+image[j]+".jpg>"+
                             "<span>"+text[j]+"</span>"+
                             "</figure>"
                             ;
}

function showImage(){
    if(i<image.length){
        i=i+1;
    }else{
        i=1;
    }
    tabsAndImage(i);
}

tabs.forEach(tab=>tab.addEventListener('click',()=>{
    clearInterval(myImages);
    tabs.forEach(tab=>tab.classList.remove('colored'));
    tab.classList.add('colored')

    var id = tab.getAttribute('id');
    var num =id.substr(id.length-1)  
    
    slider_content.innerHTML=
                            "<figure>"+
                            "<img class=image src=img/bg"+num+".jpg>"+
                            "<span>"+text[num-1]+"</span>"+
                            "</figure>";
    
}))

var myImages = setInterval(showImage,5000);