document.addEventListener("DOMContentLoaded", () => {
    // Obtém referências para os elementos do DOM
    const tripForm = document.getElementById('trip-form');
    const passengerList = document.getElementById('passenger-list');
    const printPassengerList = document.getElementById('print-passenger-list');
    const tripDetails = document.getElementById('trip-details');
    const printTripDetails = document.getElementById('print-trip-details');
    const printButton = document.getElementById('print-button');
    const printArea = document.getElementById('print-area');

    // Array para armazenar os nomes dos passageiros
    const passengers = [];

    // Adiciona um evento de clique ao botão "Adicionar Passageiro"
    document.getElementById('add-passenger').addEventListener('click', () => {
        const passengerName = document.getElementById('passenger-name').value;
        if (passengerName) {
            // Adiciona o nome do passageiro ao array e à lista exibida
            passengers.push(passengerName);
            const listItem = document.createElement('li');

            // Cria o nome do passageiro
            listItem.textContent = passengerName;

            // Cria o botão de exclusão para o passageiro
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.classList.add('delete-passenger');
            deleteButton.addEventListener('click', () => {
                // Remove o passageiro da lista e atualiza a exibição
                const index = passengers.indexOf(passengerName);
                if (index !== -1) {
                    passengers.splice(index, 1);
                    listItem.remove(); // Remove o item da lista visual
                }
            });

            // Adiciona o botão de exclusão ao item da lista
            listItem.appendChild(deleteButton);

            // Adiciona o item à lista de passageiros
            passengerList.appendChild(listItem);

            // Limpa o campo de entrada do nome do passageiro
            document.getElementById('passenger-name').value = '';
        }
    });

    // Adiciona um evento de submissão ao formulário de viagem
    tripForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Previne o comportamento padrão de submissão do formulário
        const tripData = {
            driverName: document.getElementById('driver-name').value,
            plate: document.getElementById('plate').value,
            phone: document.getElementById('phone').value,
            departureDate: document.getElementById('departure-date').value,
            departureTime: document.getElementById('departure-time').value,
            arrivalTime: document.getElementById('arrival-time').value,
            destination: document.getElementById('destination').value,
            passengerCount: document.getElementById('passenger-count').value,
            passengers: passengers
        };
        // Exibe os detalhes da viagem
        displayTripDetails(tripData);
    });

    // Adiciona um evento de clique ao botão "Imprimir Passageiros"
    printButton.addEventListener('click', () => {
        // Copia a lista de passageiros para a área de impressão
        printPassengerList.innerHTML = '';
        passengers.forEach(passenger => {
            const listItem = document.createElement('li');
            listItem.textContent = passenger;
            printPassengerList.appendChild(listItem);
        });
        // Copia os detalhes da viagem para a área de impressão
        printTripDetails.textContent = tripDetails.textContent;
        // Mostra a área de impressão
        printArea.style.display = 'block';
        window.print(); // Chama a função de impressão
        // Esconde a área de impressão após a impressão
        printArea.style.display = 'none';
    });

    // Função para exibir os detalhes da viagem
    function displayTripDetails(tripData) {
        tripDetails.textContent = `
        Nome do Motorista: ${tripData.driverName}
        Placa: ${tripData.plate}
        Telefone: ${tripData.phone}
        Data de Saída: ${tripData.departureDate}
        Horário de Saída: ${tripData.departureTime}
        Horário de Chegada: ${tripData.arrivalTime}
        Destino: ${tripData.destination}
        Passageiros Embarcados (quantidade): ${tripData.passengerCount}
        Passageiros:
        ${tripData.passengers.join('\n')}
        `;
    }
});

