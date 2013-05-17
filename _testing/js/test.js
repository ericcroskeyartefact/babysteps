

function get_random_color() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

function thing() {
  var _i = this;
  
  _i.container = document.createElement("DIV");
  _i.container.className = "blockFloat";
  _i.container.style.width = "300px";
  _i.container.style.height = "100%";
  _i.container.style.backgroundColor = "#FFFFFF";
  _i.container.style.overflowY = "hidden";
  _i.container.style.overflowX = "hidden";
  
  _i.upperContainer = document.createElement("DIV");
  _i.upperContainer.className = "blockFloatNot";
  _i.upperContainer.style.width = "100%";
  _i.upperContainer.style.height = "120px";
  _i.upperContainer.style.backgroundColor = "#000000";
  _i.upperContainer.style.color = "#FFFFFF";
  _i.upperContainer.style.fontFamily = "Arial";
  _i.upperContainer.style.fontSize = "22px";
  _i.upperContainer.innerHTML = "Top container";
  
  _i.lowerContainer = document.createElement("DIV");
  _i.lowerContainer.className = "blockFloatNot";
  _i.lowerContainer.style.left = "0px";
  _i.lowerContainer.style.top = "0px";
  _i.lowerContainer.style.width = "100%";
  _i.lowerContainer.style.height = "500px";
  _i.lowerContainer.style.border = "2px solid #FF0000";
  _i.lowerContainer.style.overflow = "scroll";
  
  _i.addItem = function() {
    var itm = document.createElement("DIV");
    itm.className = "blockFloatNot";
    itm.style.width = "100%";
    itm.style.height = "80px";
    itm.style.backgroundColor = get_random_color();
    _i.lowerContainer.appendChild(itm);
  }
  
  _i.init = function() {
    document.getElementById("mainContainer").appendChild(_i.container);
    _i.container.appendChild(_i.upperContainer);
    _i.container.appendChild(_i.lowerContainer);
    for ( var x = 0; x < 50; x++ ) { _i.addItem(); }
  }();
}
