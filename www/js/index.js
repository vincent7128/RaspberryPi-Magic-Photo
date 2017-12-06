var png, gif, frame;

function animationStart() {
    png.style.setProperty('display', '');
    gif.style.setProperty('display', 'block');
}

function animationStop() {
    png.style.setProperty('display', 'block');
    gif.style.setProperty('display', '');
}

function adjustPhotoPosition() {
    var top = (window.innerHeight - frame.height) / 2,
        left = (window.innerWidth - png.width) / 2;
    png.style.setProperty('top', top + 306 + 'px');
    png.style.setProperty('left', left + 'px');
    gif.style.setProperty('top', top + 306 + 'px');
    gif.style.setProperty('left', left + 'px');
    frame.style.setProperty('top', top + 'px');
}

window.onload = function () {
    png = document.querySelector('.png');
    gif = document.querySelector('.gif');
    frame = document.querySelector('.frame');
    adjustPhotoPosition();
    io().on('action', function (action) {
        if (action) {
            animationStart();
        } else {
            animationStop();
        }
    })
};

window.onresize = adjustPhotoPosition;