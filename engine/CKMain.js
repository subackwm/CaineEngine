var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var targetFps = 60;
var fps = 0;

var Camera;
var MousePosition;
var MouseLeft = false, MouseRight = false, MouseCenter = false;
var Key = [];

addEventListener('keydown', kd = (e) => {
    Key[e.key] = true;
});

addEventListener('keyup', ku = (e) => {
    Key[e.key] = false;
});

function getKeyCode(char) {
    var keyCode = char.charCodeAt(0);
    if (keyCode > 90) {  
        return keyCode - 32;
    }
    return keyCode;
}

addEventListener('mousedown', md = (e) => {
    if (e.button == 0)
        MouseLeft = true;
    if (e.button == 1)
        MouseCenter = true;
    if (e.button == 2)
        MouseRight = true;
});

addEventListener('mouseup', mu = (e) => {
    if (e.button == 0)
        MouseLeft = false;
    if (e.button == 1)
        MouseCenter = false;
    if (e.button == 2)
        MouseRight = false;

});

addEventListener('mousemove', mm = (e) => {
    if (MousePosition != null) {
        MousePosition.x = e.screenX;
        MousePosition.y = e.screenY;
    }
});

window.onload = () => {
    targetFps = 60;
    Camera = new CKCamera(0, 0);
    MousePosition = new Vector2(0, 0);
    init();
    setInterval(loop, 1000 / targetFps);
}

init = () => {
    PreLoad();
    Init();
}

resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

loop = () => {
    resize();
    _update();
    _render();
}

var RenderObjects = [];

_update = () => {
    Update();
}

let __frames__ = 0, __seconds__ = 0;

_render = () => {

    Render();

    let today = new Date();
    let seconds = today.getSeconds();
    __frames__++;
    if (seconds != __seconds__) {
        __seconds__ = seconds;
        fps = __frames__;
        __frames__ = 0;
    }

    for (var i = 0; i < RenderObjects.length; i++) {
        RenderObjects[i].render();
    }

    RenderObjects = [];
}

class Debug{

    static Log(text){
        console.log(text);
    }

}