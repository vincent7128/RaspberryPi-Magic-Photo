var photoA, photoB, postFrame, interval;

function animationStart() {
    interval = setInterval(function () {
        if (photoA.style.getPropertyValue('display')) {
            photoA.style.setProperty('display', '');
            photoB.style.setProperty('display', 'block');
        } else {
            photoA.style.setProperty('display', 'block');
            photoB.style.setProperty('display', '');
        }
    }, 300);
}

function animationStop() {
    removeInterval(interval)
}

function adjustPosition() {
    var top = (window.innerHeight - postFrame.height) / 2,
        left = (window.innerWidth - photoA.width) / 2;
    photoA.style.setProperty('top', top + 306 + 'px');
    photoA.style.setProperty('left', left + 'px');
    photoB.style.setProperty('top', top + 306 + 'px');
    photoB.style.setProperty('left', left + 'px');
    postFrame.style.setProperty('top', top + 'px');
}

window.onload = function () {
    photoA = document.querySelector('.photo-a');
    photoB = document.querySelector('.photo-b');
    postFrame = document.querySelector('.poster-frame');
    adjustPosition();
    animationStart();
};

window.onresize = adjustPosition;