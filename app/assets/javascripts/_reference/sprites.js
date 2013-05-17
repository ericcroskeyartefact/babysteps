sprites = {
	expandArrow: { x: 12, y: 7, w: 8, h: 14 },
	collapseArrow: { x: 30, y: 7, w: 8, h: 14 },
	searchIcon: { x: 50, y: 6, w: 19, h: 19 },
	searchClear: { x: 71, y: 6, w: 19, h: 19 },
	dragHandle: { x: 96, y: 7, w: 4, h: 18 },
	downArrow: { x: 108, y: 7, w: 12, h: 9 },
	upArrow: { x: 108, y: 18, w: 12, h: 9 },
	downArrow: { x: 71, y: 6, w: 19, h: 19 },
	cornerMaskSmall: { x: 125, y: 7, w: 11, h: 11 },
	cornerMaskLarge: { x: 143, y: 7, w: 21, h: 21 },
	timeCheck: { x: 170, y: 7, w: 30, h: 32 },
	timeAlert: { x: 204, y: 7, w: 32, h: 32 },
	btnArrowLightLeft: { x: 251, y: 8, w: 7, h: 11 },
	btnArrowLightRight: { x: 274, y: 8, w: 7, h: 11 },
	btnArrowDarkLeft: { x: 251, y: 24, w: 7, h: 11 },
	btnArrowDarkRight: { x: 274, y: 24, w: 7, h: 11 },
	sidebarProjects: { x: 10, y: 38, w: 11, h: 68 },
	sidebarProjects: { x: 32, y: 37, w: 10, h: 21 },
	homeIcon: { x: 53, y: 53, w: 34, h: 28 },
	viewIconExpanded: { x: 99, y: 59, w: 30, h: 20 },
	viewIconCollapsed: { x: 141, y: 59, w: 29, h: 20 },
	freeTimePattern: { x: 188, y: 60, w: 46, h: 46 },
	timelineDragHandle: { x: 265, y: 63, w: 16, h: 47 },
	popupArrowUp: { x: 7, y: 111, w: 14, h: 8 },
	popupArrowDown: { x: 7, y: 129, w: 14, h: 8 },
	headerBarLogo: { x: 161, y: 17, w: 40, h: 40, imageFile: "images/sprites.png" } 
}

spritesTileX = {
	bottomShadow: { x: 0, y: 7, w: 10, h: 19 },
	topShadow: { x: 0, y: 37, w: 10, h: 19 },
	timelineBar: { x: 0, y: 60, w: 10, h: 46 }
}

spritesTileY = {
	rightShadow: { x: 2, y: 0, w: 18, h: 10 },
	leftShadow: { x: 29, y: 0, w: 18, h: 10 }
}

function setBackgroundSprite(el, name, box)
{
  var spriteDef = sprites[name];
  
  if ( sprites[name].imageFile )
  {
    el.style.backgroundImage = "url(" + sprites[name].imageFile + ")";
  }
  else
  {
    el.style.backgroundImage = "url(images/Sprites-01.png)";
  }
  
  el.style.backgroundRepeat = "no-repeat";
  if (box)
  {
    el.style.left = (box.x || 0) + (box.w - spriteDef.w) * 0.5 + "px";
    el.style.top = (box.y || 0) + (box.h - spriteDef.h) * 0.5 + "px";
  }
  el.style.width = spriteDef.w + "px";
  el.style.height = spriteDef.h + "px";
  el.style.backgroundPosition = -spriteDef.x + "px " + -spriteDef.y + "px";
}




