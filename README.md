Raspberry Pi - Magic Photo
======
Work on Raspberry Pi use GPIO listen PIR sensor send command through WebSocket, Make photo live to be like as "Harry Potter" magic photo.

## System Environment
Raspberry Pi 3<br>
OS: RASPBIAN STRETCH WITH DESKTOP - 2017-11-29<br>
nodejs: v4.8.2<br>
pigpio: 1.64-1

## Wiring diagram

![Wiring Diagram](/wiring-diagram.png)

## Install
```
$ git clone https://github.com/vincent7128/RaspberryPi-Magic-Photo.git
$ cd RaspberryPi-Magic-Photo
$ npm install --save
$ sudo node index.js
```
*** Open browser http://localhost:8000, it show be done! ***

## Full screen mode
*** before you run under command, close all browser window ***
```
$ chromium-browser --kiosk http://localhost:8000
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
