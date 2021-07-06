const macaddress = require('macaddress');
const usbDetect = require('usb-detection');
let cardConnection
let deviceUsb
let targetUsb
usbDetect.startMonitoring()
    macaddress.all().then(
        function (all) {
            cardConnection = all
            // cardConnection = JSON.stringify(all, null, 2)
            
            usbDetect.find().then(function(devices) {
                deviceUsb = devices.filter(usbTarget =>(usbTarget.deviceName == 'USB3.0-CRW'))
                // result here!

                deviceUsb.forEach(sub =>{
                  targetUsb = sub
                 })
              
                const {ipv4,mac} = cardConnection.eno1
                const {deviceName,manufacturer,serialNumber} = targetUsb

                const finalObject = {
                  ipv4,mac,deviceName,manufacturer,serialNumber
                }

                console.log(finalObject)

             
            }).catch(function(err) { 
                console.log(err); 
            });
        }
    );
usbDetect.stopMonitoring()