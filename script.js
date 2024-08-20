const video = document.createElement('video');
const canvasElement = document.getElementById('canvas');
const canvas = canvasElement.getContext('2d');
const outputData = document.getElementById('outputData');


navigator.mediaDevices.getUserMedia({
    video: {
        facingMode: 'environment' // Sugere o uso da câmera traseira, mas não força
    }
}).then(function(stream) {
    video.srcObject = stream;
    video.setAttribute('playsinline', true); // Evita o fullscreen no iOS
    video.play();
    requestAnimationFrame(tick);
}).catch(function(err) {
    console.error("Erro ao acessar a câmera: ", err);
    alert("Não foi possível acessar a câmera. Verifique as permissões e tente novamente.");
});



function tick() {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvasElement.hidden = false;
        canvasElement.width = video.videoWidth;
        canvasElement.height = video.videoHeight;
        canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
        const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: 'dontInvert',
        });
        if (code) {
            drawLine(code.location.topLeftCorner, code.location.topRightCorner, '#FF3B58');
            drawLine(code.location.topRightCorner, code.location.bottomRightCorner, '#FF3B58');
            drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, '#FF3B58');
            drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, '#FF3B58');
            outputData.innerText = code.data;
            console.log(`Scanned content: ${code.data}`);
        } else {
            outputData.innerText = "No QR code detected.";
        }
    }
    requestAnimationFrame(tick);
}

function drawLine(begin, end, color) {
    canvas.beginPath();
    canvas.moveTo(begin.x, begin.y);
    canvas.lineTo(end.x, end.y);
    canvas.lineWidth = 4;
    canvas.strokeStyle = color;
    canvas.stroke();
}
