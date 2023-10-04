let botaoRevelarClicado = false; // Variável de controle

function gerarCodigo() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let codigo = '';
    for (let i = 0; i < 36; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres.charAt(indice);
    }
    return codigo;
}

function criarTabuleiro() {
    const tabuleiro = document.querySelector('.board');
    tabuleiro.innerHTML = '';
    for (let i = 0; i < 25; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        tabuleiro.appendChild(cell);
    }
}

function mostrarJogadasAleatorias() {
    const quantity = parseInt(document.getElementById('quantity-input').value);

    if (quantity >= 1 && quantity <= 12) {
        const cells = document.querySelectorAll('.cell');
        const totalCells = cells.length;
        const jogadasAleatorias = [];
        
        while (jogadasAleatorias.length < quantity) {
            const indiceAleatorio = Math.floor(Math.random() * totalCells);
            if (!jogadasAleatorias.includes(indiceAleatorio)) {
                jogadasAleatorias.push(indiceAleatorio);
            }
        }
        
        cells.forEach((cell, index) => {
            if (jogadasAleatorias.includes(index)) {
                cell.classList.add('green');
            } else {
                cell.classList.remove('green');
            }
        });
    } else {
        alert('A quantidade de jogadas deve estar entre 1 e 12.');
    }
}

function reiniciarJogo() {
    criarTabuleiro();
    document.getElementById('code-input').value = '';
    document.getElementById('quantity-input').value = '';
    document.getElementById('reveal-button').classList.add('hidden');
    document.getElementById('reset-button').classList.add('hidden');
    document.getElementById('concluir-button').removeAttribute('disabled'); // Habilitar o botão "Concluir"
    botaoRevelarClicado = false; // Resetar a variável de controle
    document.querySelector('.percentage-container').classList.add('hidden'); // Ocultar a porcentagem
    document.getElementById('code-input').removeAttribute('disabled');
    document.getElementById('quantity-input').removeAttribute('disabled');
}

function calcularChanceDeAcerto() {
    const chance = Math.floor(Math.random() * (87 - 40 + 1) + 40); // Gerar uma porcentagem aleatória entre 40% e 87%
    return chance + '%';
}

// Evento de clique no botão "Concluir"
document.getElementById('concluir-button').addEventListener('click', function () {
    const codigo = document.getElementById('code-input').value;
    if (codigo.length !== 36) {
        alert('O código deve ter exatamente 36 caracteres.');
    } else {
        criarTabuleiro();
        document.querySelector('.board').style.visibility = 'visible'; // Mostrar o tabuleiro
        document.getElementById('reveal-button').classList.remove('hidden');
        document.getElementById('reset-button').classList.remove('hidden');
        document.getElementById('concluir-button').setAttribute('disabled', 'true'); // Desabilitar o botão "Concluir"
        botaoRevelarClicado = false; // Resetar a variável de controle

        // Exibir a porcentagem de chance de acerto
        const chanceDeAcerto = calcularChanceDeAcerto();
        const porcentagemElement = document.getElementById('percentage');
        porcentagemElement.textContent = `Chance de Acerto: ${chanceDeAcerto}`;
        document.querySelector('.percentage-container').classList.remove('hidden');
        
        // Ocultar outros elementos
        document.getElementById('code-input').setAttribute('disabled', 'true');
        document.getElementById('quantity-input').setAttribute('disabled', 'true');
    }
});

// Evento de clique no botão "Revelar Melhores Jogadas"
document.getElementById('reveal-button').addEventListener('click', function () {
    if (!botaoRevelarClicado) { // Verificar se o botão ainda não foi clicado
        mostrarJogadasAleatorias();
        botaoRevelarClicado = true; // Definir como true após o clique
    }
});

// Evento de clique no botão "Usar Outro Código"
document.getElementById('reset-button').addEventListener('click', function () {
    reiniciarJogo();
});

// Inicialização do jogo
reiniciarJogo();
