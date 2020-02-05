        //Reproduz a trilha sónora do jogo infinitamente

        var audio_space = new Audio();
        audio_space.src = "space.mp3";
        audio_space.loop = true;
        audio_space.play();

        //


        // Ajusta a área do jogo dinamicamente //
        var largura = 0;
        var altura = 0;

        function ajustaTamanhoPalcoJogo() {
            altura = window.innerHeight; // A propriedade innerWidth retorna a largura da área de conteúdo de uma janela.
            largura = window.innerWidth; // A propriedade innerHeight retorna a altura da área de conteúdo de uma janela.

            console.log('Área do palco: ', largura, altura);
        }

        ajustaTamanhoPalcoJogo(); //Esta função é chamada no body e aqui pois se o body não for deslocado, a área do jogo será o tamanho atual da tela do usuário;

        //


        //  Gera a posição que o foguete irá ficar na área do jogo randomicamente

        var vidas;
        var score = 0;
        var i = 10;

        function posicaoRandomica() {
                
            //Remover o foguete anterior (caso exista) imediatamente
            if(document.getElementById('foguete')) {
                document.getElementById('foguete').remove();

                //Controle dinamico das vidas
                if(vidas >= 0) {
                  vidas--;  
                  if(vidas < 0){
                         document.getElementById('vida').innerHTML = 0;
                  }else{       
                        document.getElementById('vida').innerHTML = vidas;
                  }
                }else{
                    //Redirecionamento para a página fim de jogo
                    window.location.href = 'fim_de_jogo.html';
                }
            }

            //Remover a explosao anterior (caso exista) após 1.5 segundos
            if(document.getElementById('explosao')) {
                var apagaExplosao = setTimeout(function () {
                    document.getElementById('explosao').remove();
                }, 1500);
            }

            var posicaoX = Math.floor(Math.random() * (largura - 90)); // -90 -> correção barra de rolagem
            var posicaoY = Math.floor(Math.random() * (altura - 90)); // -90 -> correção barra de rolagem

            posicaoX = posicaoX < 0 ? 0 : posicaoX; // correção 0-90
            posicaoY = posicaoY < 0 ? 0 : posicaoY; // correção 0-90

            console.log('Posição do foguete no palco ', posicaoX, posicaoY);

            //


            //Cria o foguete


            var tamanho = tamanhoAleatorio();
            var lado = ladoAleatorio();

            var foguete = document.createElement('img');
            foguete.src = 'foguete.png';
            foguete.className = tamanho + ' ' + lado;
            foguete.style.left = posicaoX + 'px';
            foguete.style.top = posicaoY + 'px';
            foguete.style.position = 'absolute';
            foguete.id = 'foguete';
            foguete.onclick = function() {
                score++;
                document.getElementById('score').innerHTML = score;

                //A cada 10 xp uma vida é adicionada
                if(score === i){

                    vidas++;
                    i += 10;
                    document.getElementById('vida').innerHTML = vidas;
                    //Reproduz o aúdio da adição de vida

                    var audio_vida = new Audio();
                    audio_vida.src = "vida.mp3";
                    audio_vida.play();

                    //
                }

                this.remove();

                //Reproduz o aúdio da explosão

                var audio_explosao = new Audio();
                audio_explosao.src = "explosao.mp3";
                audio_explosao.play();

                //

                //Cria a explosão

                var explosao = document.createElement('img');
                explosao.src = 'explosao.png';
                explosao.className = tamanho + ' ' + lado;
                explosao.style.left = posicaoX + 'px';
                explosao.style.top = posicaoY + 'px';
                explosao.style.position = 'absolute';
                explosao.id = 'explosao';
                document.body.appendChild(explosao); //O elemento se torna filho do body e é inserido no html

                console.log('Explosão gerada: ', explosao);

                //
            }
            document.body.appendChild(foguete); //O elemento se torna filho do body e é inserido no html

            console.log('Foguete gerado: ', foguete);
            console.log(' ');
        }

        //

        //Altera o tamanho do foguete randomicamente


        function tamanhoAleatorio() {

            var classe = Math.floor(Math.random() * 3);
            console.log('Tamanho randomico do foguete: ' + classe);
            switch (classe) {
                case 0:
                    return 'foguete1';
                case 1:
                    return 'foguete2';
                case 2:
                    return 'foguete3';
            }
        }

        console.log('Resultado do tamanho randomico do foguete: ' + tamanhoAleatorio());

        //

        //Altera o lado do foguete randomicamente

        function ladoAleatorio() {

            var classe = Math.floor(Math.random() * 2);
            console.log('Lado randomico do foguete:  ' + classe);
            switch (classe) {
                case 0:
                    return 'ladoA';
                case 1:
                    return 'ladoB';
            }
        }

        //

        console.log('Resultado do lado randomico do foguete: ' + ladoAleatorio())

        //Recebe a dificuldade do jogo escolhida e age de acordo

            var nivel = window.location.search;
            var criaFogueteTempo;

            nivel = nivel.substr('?',3);
            nivel = nivel.replace('?','');

            if(nivel === 'nm'){
                //Tempo de 1500, ou seja, 1 segundo e meio
                criaFogueteTempo = 1500;
                vidas = 5;

            }else if(nivel === 'md'){
                //Tempo de 1000, ou seja, 1 segundo
                criaFogueteTempo = 1000;
                vidas = 15;
            }else if(nivel === 'df'){
                //Tempo de 800, ou seja, 0.80 segundos
                criaFogueteTempo = 800;
                vidas = 200;
            }

            console.log('Velocidade do jogo escolhida', criaFogueteTempo);
        //

        //Recebe o tempo de jogo escolhido

            var tempo_de_jogo = window.location.search;
            var tempo;

            tempo_de_jogo = tempo_de_jogo.substr('?',7);
            tempo_de_jogo =  tempo_de_jogo.replace('?nm?','');
            tempo_de_jogo =  tempo_de_jogo.replace('?md?','');
            tempo_de_jogo =  tempo_de_jogo.replace('?df?','');

           if(tempo_de_jogo === '30'){
                //tempo_de_jogo = 30 segundos
                tempo = 30;
                if(nivel == 'df'){
                    vidas = 30;
                }
            }else if(tempo_de_jogo === '01'){
                //tempo_de_jogo = 1 minuto
                tempo = 60;
                if(nivel == 'df'){
                    vidas = 60;
                }
            }else if(tempo_de_jogo === '02'){
                //tempo de jogo = 2 minutos
                tempo  = 120;
                if(nivel == 'df'){
                    vidas = 120;
                }
            }else if(tempo_de_jogo === '03'){
                //tempo de jogo = 3 minutos
                tempo = 180;
                if(nivel == 'df'){
                    vidas = 180;
                }
            }
        console.log('Tempo de jogo escolhido', tempo);

        //

        //Criação do cronometro.

        setInterval(
            function () { // A cada 1 segundo de espera do setInterval, a variavel tempo perde 1 segundo
                tempo--;

                if(tempo === 0){
                    window.location.href = 'vitoria.html';
                }else{
                    document.getElementById('cronometro').innerHTML = tempo; //InnerHTML = valor presente entre a tag <span> e </span>
                }

            }, 1000)

        //





























































    /* Motivo de usar top e left

        Se adicionarmos os valores top = 10 e left = 10:

    1)Todos os foguetes da fileira de foguetes ficarão 10px abaixo do topo da janela, certo?
    2)E cada foguete ficará 10px separado um do outro.

        Se adicionarmos o valor de 10px no right e no bottom, acontece o seguinte:

    1) A primeira fileira de foguetes se separada 10px do topo da janela
    2)A segunda fileira vai se separar 20px da primeira fileira. (10px do bottom dos foguetes da primeir + 10px do top da segunda fileira, e assim sucessivamente)

    O mesmo aconteceria para se usarmos o right sendo 10px:

        1)O primeiro foguete da fileira se separaria 10px da borda esquerda da janela
        2)O segundo foguete se separaria 20px do primeiro foguete (10px do right do primeiro foguete + 10px do left do segundo foguete e assim sucessivamente)
    */

    /* Motivo de usar position absolute

        Nós podemos utilizar 3 valores para propriedade position: fixed, relative e absolute.

        1) fixed: é utilizado para fixar a posição de um elemento na tela, ou seja, o elemento ficará na posição definida mesmo se a página for rolada, geralmente é utilizado em cabeçalhos.
        2) relative: posiciona o elemento em relação a si mesmo, e as coordenadas serão definidas a partir desse ponto.

        Se a position relative fosse utilizada e vários foguetes fosse criados de uma vez os foguetes não iriam se conter no corpo da janela e começariam a ir para baixo, gerando um scroll infinito devido ao fato da propriedade relative ser relativa a si mesma e não a um elemento pai.

        3) absolute: o elemento é posicionado em relação ao elemento pai, e é exatamente o que precisamos, pois o foguete deve ser inserido em coordenadas aleatórias tendo com base a posição do elemento pai (corpo da janela, ou seja, a window).

     */


