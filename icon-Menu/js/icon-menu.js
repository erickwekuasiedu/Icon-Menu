/*
ICON-MENU V1.0 a fully customizable fontawsome menu bar with callbacks.
Hey my name is Eric Asiedu, i created this template 
for my personal site and thought it might be useful to you.
Donation are welcome at erickwekuasiedu@gmail.com Thank you
----------------------------------------------------------------------------------------------------

INSTALL-

1. link fontawsome and icon-menu.css in your header
2. link icon-menu.js script at the end of body tag
3. now you can call makeBar() from any where in your script

----------------------------------------------------------------------------------------------------

USAGE - Create an object with the following properties and pass it to makeBar function.

	layer 				: <string,required> 	ID of html element to use as a container.
	icons 				: [<string,required>] Array of fontawsome class string.
  direction			: <string,required> use one of these (left,right,top,bottom).
  hrefs					: [<string>] 	Array of urls to match each icon.
  clicks				: [<callback>] 	Array of callback functions to match each icon.
  fontSize			: <string,optinal> controls the size of the icons. add css units eg. "10pt" or "1.5rem"..
  boxSize				: <string,optinal> controls size of box. add css units eg. "50px" or "10%" ...
  colorA				: <string,optinal> base background color. any css color type
  colorB				: <string,optinal> mouse over background color any css color type
  stretchAmount	: <string,optinal> the amount to stretch button on mouse over. 50px or 10% ...
  transition		: <string,optinal> controls animation speed. eg. "all 500ms ease-out"
  
------------------------------------------------------------------------------------------------

EXAMPLE - using hrefs

const props={
	layer:'bar1', 
	icons:['fab fa-facebook','fab fa-twitter','fab fa-instagram','fab fa-whatsapp'],
  hrefs:['http://facebook.com','http://twitter.com','http://instagram.com','http://whatsup.com'],
  clicks:[back,play,stop,forward],
  direction:'right',
  fontSize:'2rem',
  boxSize:'50px',
  colorA:'red',
  colorB:'white',
  stretchAmount:'50px',
  transition:'all 500ms ease-out'
}

makeBar(props);

----------------------------------------------------------------------------------------------------

EXAMPLE - using callbacks

//bar clicks
const play=function(){alert("play")}
const stop=function(){alert("stop")}
const back=function(){alert("back")}
const forward=function(){alert("forward")}

const props={
	layer:'bar1', 
	icons:['fas fa-fast-backward','fas fa-play','fas fa-stop','fas fa-fast-forward'],
  clicks:[back,play,stop,forward],
  direction:'top',
  fontSize:'1rem',
  boxSize:'50px',
  colorA:'#263238',
  colorB:'#90a4ae',
  stretchAmount:'10px',
  transition:'all 500ms ease-out'
}

makeBar(props);

---------------------------------------------------------------------------------------------------
*/



//main function
const makeBar=function(props){
//get the main container for this bar
  const layer=document.querySelector('#'+props.layer);
  
  //this creates box for the icon
  const makeBox=function(iconTag,id){
  	//set box propeties and add icon
    const box=document.createElement('div');
    box.classList.add('box');
    box.style.width=props.boxSize;
    box.style.height=props.boxSize;
    box.style.backgroundColor=props.colorA;
    iconTag.style.color=props.colorB;
    box.appendChild(iconTag);
    //set the css variable to be use for padding
    const minus=(props.direction==='top' || props.direction==='left') ? '-':'';
    const amount=props.stretchAmount || '50px';
    box.style.setProperty("--s-pad",props.stretchAmount || '50px');
    box.style.setProperty("--s-mag",minus+amount);
    
    //add mouse over the box
    box.addEventListener('mouseenter',function(evnt){
    
    	box.style.backgroundColor=props.colorB;
      iconTag.style.color=props.colorA;
      
      if(props.direction=="left") this.classList.toggle('stretch-left');
      if(props.direction=="right") this.classList.toggle('stretch-right');
      if(props.direction=="top") this.classList.toggle('stretch-top');
      if(props.direction=="bottom") this.classList.toggle('stretch-bottom');
    });
		
    //add mouse out event to box
    box.addEventListener('mouseleave',function(evnt){
    	box.style.backgroundColor=props.colorA;
      iconTag.style.color=props.colorB;
      
      if(props.direction=="left") this.classList.toggle('stretch-left');
      if(props.direction=="right") this.classList.toggle('stretch-right');
      if(props.direction=="top") this.classList.toggle('stretch-top');
      if(props.direction=="bottom") this.classList.toggle('stretch-bottom');
    });
    //call click function for each icon
    if(props.clicks){
        box.addEventListener('click',function(evnt){
        props.clicks[id]();
       })
    }
    
    return box;
  }
	
  const isRow=(props.direction==='top' || props.direction==='bottom');
	if(isRow) layer.classList.toggle('flex-row');
  
   
  //loop throug icons list and create
  for(let i=0;i<props.icons.length;i++){
  	
    
    //link decoration
    const linkTag=document.createElement('a');
    if(props.hrefs) linkTag.href=props.hrefs[i];
   
    linkTag.style.textDecoration="none";
		//icon decoration
    const iconTag=document.createElement('i');
    iconTag.style.fontSize=props.fontSize;
    iconTag.style.transition=props.transition
    
    //loop through each icon string and add class
    for(let c of props.icons[i].split(" ")){
      iconTag.classList.add(c);
    }
		
    //create a box with icon and aling
    const box=makeBox(iconTag,i);
    if(props.direction==='top') box.classList.toggle('top');
    if(props.direction==='bottom') box.classList.toggle('bottom');
    
  	//add the box with a link to container
    linkTag.appendChild(box); 
    layer.appendChild(linkTag);

  }
}


