function load() {
    var photoA = document.querySelector('.photo-a');
    var photoB = document.querySelector('.photo-b');
    var intr = setInterval(function() {
        if (photoA.style.getPropertyValue('display')) {
            photoA.style.setProperty('display', '');
            photoB.style.setProperty('display', 'block');
        } else {
            photoA.style.setProperty('display', 'block');
            photoB.style.setProperty('display', '');
        }
    }, 300);
}

window.onload = load;