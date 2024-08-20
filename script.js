// Inicia a leitura do QR Code
function onScanSuccess(decodedText, decodedResult) {
    // Mostra o texto decodificado na página
    document.getElementById('result-text').innerText = decodedText;
}

// Configura o leitor de QR Code
function startScanner() {
    const html5QrCode = new Html5Qrcode("qr-reader");

    // Inicia a leitura da câmera traseira
    html5QrCode.start(
        { facingMode: "environment" }, // Configura para usar a câmera traseira
        {
            fps: 10, // Frames por segundo para melhorar o desempenho
            qrbox: 250 // Tamanho da caixa onde o QR Code será lido
        },
        onScanSuccess
    ).catch(err => {
        console.error("Erro ao iniciar o leitor de QR Code:", err);
    });
}

// Inicia o scanner assim que a página estiver carregada
window.addEventListener('load', startScanner);
