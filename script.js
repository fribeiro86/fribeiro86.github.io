document.addEventListener("DOMContentLoaded", () => {
    // Obtém referências para os elementos do DOM
    const tripForm = document.getElementById('trip-form');
    const passengerList = document.getElementById('passenger-list');
    const printPassengerList = document.getElementById('print-passenger-list');
    const tripDetails = document.getElementById('trip-details');
    const printTripDetails = document.getElementById('print-trip-details');
    const printButton = document.getElementById('print-button');
    const printArea = document.getElementById('print-area');
    let totalPassageiro = 0; 

    // Array para armazenar os nomes dos passageiros
    const passengers = [];

    // Adiciona um evento de clique ao botão "Adicionar Passageiro"
    document.getElementById('add-passenger').addEventListener('click', () => {
        const passengerName = document.getElementById('passenger-name').value;
        if (passengerName) {
            // Adiciona o nome do passageiro ao array e à lista exibida
            passengers.push(passengerName); 
            const listItem = document.createElement('li');
            
            listItem.style.marginBottom="10px";
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
        // Chama a função de impressão
        window.print();

        // Esconde a área de impressão após a impressão
        
        /*setTimeout(() => {

             
            printArea.style.display = 'none';
            
        }, 4000);
        
        */
        
        
    });

    // Função para exibir os detalhes da viagem
    function displayTripDetails(tripData) {
       
        

        tripDetails.textContent = `
        Nome do Motorista: ${tripData.driverName}\n 
        Placa: ${tripData.plate}\n
        Telefone: ${tripData.phone}\n
        Data de Saída: ${tripData.departureDate}\n
        Horário de Saída: ${tripData.departureTime}\n
        Horário de Chegada: ${tripData.arrivalTime}\n
        Destino: ${tripData.destination}\n
        Passageiros Embarcados: ${passengers.length}\n
                `;
    }

    document.getElementById("restart").addEventListener("click", ()=>{

        location.reload();
    })    

});

