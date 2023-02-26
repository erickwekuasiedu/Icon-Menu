  /*
ICON-MENU V1.0 a fully customizable fontawsome menu bar with callbacks.
Hey my name is Eric Asiedu, i created this template
for my personal site and thought it might be useful to you.
Donation are welcome on paypal erickwekuasiedu@gmail.com Thank you.
----------------------------------------------------------------------------------------------------
*/

//main function
const makeBar = function(options) {

  //
  const layer = document.querySelector('#'+options.layer);

  //set box propeties and add icon
  const makeBox = function(iconTag, id) {

    //
    const box = document.createElement('div');
    box.classList.add('icon-menu-box');
    box.style.width  = options.boxSize;
    box.style.height = options.boxSize;
    box.style.backgroundColor = options.colorA;

    //
    iconTag.style.color = options.colorB;
    box.appendChild(iconTag);

    //
    box.style.setProperty("--s-pad", options.stretchAmount );

    //
    box.addEventListener('mouseenter', function(evnt) {

      //
      box.style.backgroundColor = options.colorB;

      //
      if ((iconTag = box.querySelector('i') || box.querySelector('svg')) != null) {
        iconTag.style.color = options.colorA;
      };

      //
      this.classList.toggle('icon-menu-stretch-' + options.direction);

    });

    //add mouse out event to box
    box.addEventListener('mouseleave', function(evnt) {

      //
      box.style.backgroundColor = options.colorA;

      //
      if ((iconTag = box.querySelector('i') || box.querySelector('svg')) != null) {
        iconTag.style.color = options.colorB;
      };

      //
      this.classList.toggle('icon-menu-stretch-' + options.direction);

    });

    //call click function for each icon
    if (options.clicks) {
        box.addEventListener('click', function(evnt) {
          options.clicks[id]();
       });
    }

    return box;

  }

  //
  if ((options.direction === 'top' || options.direction === 'bottom')) {
    layer.classList.toggle('icon-menu-flex-row');
  } else {
    layer.classList.toggle('icon-menu-flex-column');
  }

  layer.style.setProperty("--s-alignY", options.direction.replace('top','start').replace('bottom','end'));
  layer.style.setProperty("--s-alignX", options.direction.replace('left','start').replace('right','end'));
  layer.style.setProperty("--s-boxSize", options.boxSize);

  //loop throug icons list and create
  for (let i=0; i<options.icons.length; i++) {

    //link decoration
    const linkTag = document.createElement('a');
    if (options.hrefs) linkTag.href = options.hrefs[i];
    linkTag.style.textDecoration = "none";

    //icon decoration
    const iconTag = document.createElement('i');
    iconTag.style.fontSize = options.fontSize;
    iconTag.style.transition = options.transition;

    //loop through each icon string and add class
    for (let c of options.icons[i].split(" ")) {
      iconTag.classList.add(c);
    }

    //create a box with icon and aling
    const box = makeBox(iconTag, i);
    box.classList.toggle(options.direction);

    //add the box with a link to container
    linkTag.appendChild(box);
    layer.appendChild(linkTag);

  }

}
