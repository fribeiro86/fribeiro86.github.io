// Inicia a câmera e o processo de captura de vídeo
function startScanner() {
    const video = document.getElementById('preview');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    // Solicita permissão para usar a câmera traseira
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
            video.srcObject = stream;
            video.setAttribute("playsinline", true); // Para iOS
            video.play();
            requestAnimationFrame(tick);
        })
        .catch(err => {
            console.error("Erro ao acessar a câmera:", err);
        });

    // Função que processa cada frame do vídeo
    function tick() {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvas.hidden = false;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, canvas.width, canvas.height, {
                inversionAttempts: "dontInvert",
            });

            if (code) {
                // Se encontrar um QR Code ou Código de Barras, exibe o resultado
                drawLine(code.location.topLeftCorner, code.location.topRightCorner, "red");
                drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "red");
                drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "red");
                drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "red");

                document.getElementById('result-text').innerText = code.data;
            } else {
                // Continua a escanear se nenhum código foi encontrado
                requestAnimationFrame(tick);
            }
        } else {
            // Continua a tentar capturar os frames do vídeo
            requestAnimationFrame(tick);
        }
    }

    // Função para desenhar a linha ao redor do QR Code/Código de Barras detectado
    function drawLine(begin, end, color) {
        context.beginPath();
        context.moveTo(begin.x, begin.y);
        context.lineTo(end.x, end.y);
        context.lineWidth = 4;
        context.strokeStyle = color;
        context.stroke();
    }
}

// Inicia o scanner assim que a página estiver carregada
window.addEventListener('load', startScanner);
