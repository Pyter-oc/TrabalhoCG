document.addEventListener('DOMContentLoaded', Start);

var cena = new THREE.Scene();
var camara = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth-15, window.innerHeight-15);

document.body.appendChild(renderer.domElement);

var geometria = new THREE.BoxGeometry(3,3,1);

// Mudamos o material do cubo para que este receba luz por parte de uma fonte de luz.
var material = new THREE.MeshStandardMaterial({color: 0xff0000});

//var cubo = new THREE.Mesh(geometria, material);

// Variável que vai guardar que rotação aplicar ao cubo
var cuboCoordRotation;

// Variável que irá guardar para que direções a camara se irá movimentar.
var camaraAndar = {x:0, y:0, z:0};

// Velocidade de movimentação que a camara irá andar.
var velocidadeAndar = 0.05;

var retangulo = new THREE.Mesh(geometria, material);



// Este código adiciona um evento que é deplotado sempre que o rato se mexer
document.addEventListener('mousemove', ev =>{
    // A posição do rato encontra-se de 0 até ao tamanho do ecrã em pixeis. É então
    // necessário converte-lo para a escala de -1 a 1. Para isso utilizamos o código
    // a baixo.
    var x = (ev.clientX - 0) / ( window.innerWidth - 0) * (1 - (-1)) + -1
    var y = (ev.clientY - 0) / ( window.innerHeight - 0) * (1 - (-1)) + -1;

    // Adicionamos a rotação que devemos aplicar na variável coboCoordRotation.
    cuboCoordRotation = {
        x:x,
        y:y
    }
});



// Adicionamos um evento que é desplotado sempre que uma tecla for mantida pressionada.
document.addEventListener('keydown', ev=>{
    // Inicializa a variável de controlo
    var coords = {
        x:0,
        y:0,
        z:0
    };
    // Verifica se a tecla W foi premida e coloca a variável Z do coords para o valor correto
    if(ev.keyCode == 87)
        coords.z -= velocidadeAndar;
    // Verifica se a tecla S foi premida e coloca a variável Z do coords para o valor correto
    if(ev.keyCode == 83)
        coords.z += velocidadeAndar;
    // Verifica se a tecla A foi premida e coloca a variável Z do coords para o valor correto
    if(ev.keyCode == 65)
        coords.x -= velocidadeAndar;
    // Verifica se a tecla D foi premida e coloca a variável Z do coords para o valor correto
    if(ev.keyCode == 68)
        coords.x += velocidadeAndar;  
        
    //objetoAndar = coords;
    // Aplica a variável coords à variável camaraAndar;
    camaraAndar = coords;

});

//Adicionamos um evento que é deplotado sempre que uma tecla deixar de ser premida.
document.addEventListener('keyup', ev=>{
    // Inicializa a variável de controlo
    var coords = {
        x:0,
        y:0,
        z:0
    };

    // Verifica se a tecla W foi levantada
    if(ev.keyCode == 87)
        coords.z += velocidadeAndar;
    // Verifica se a tecla S foi levantada
    if(ev.keyCode == 83)
        coords.z -= velocidadeAndar;
    // Verifica se a tecla A foi levantada
    if(ev.keyCode == 65)
        coords.x += velocidadeAndar;
    // Verifica se a tecla D foi levantada    
    if(ev.keyCode == 68)
        coords.x -= velocidadeAndar;  
        
    // Aplica a variável coords à variável camaraAndar;
    camaraAndar = coords;
    
});


// Variável que guardará o objeto importado
var objetoImportado;

// Variável que irá guardar o controlador de animações do objeto importado
var mixerAnimacao;

// Variável que é responsável por controlar o tempo da aplicação
var relogio = new THREE.Clock();

// Variável com o objeto responsável por importar ficheiros FBX
var importer = new THREE.FBXLoader();
/*
// Função utilizada para importar objetos FBX. O primeiro parâmetro é a localização do .fbx
// e o segundo parâmetro é uma função que apenas é chamada se conseguir importar o objeto.
importer.load('./Objetos/Samba Dancing.fbx', function (object) {

    // O mixerAnimação é inicializado tendo em conta o objeto importado
    mixerAnimacao = new THREE.AnimationMixer(object);

    // object.animations é um array com todas as animações que o objeto trás quando é importado.
    // O que nós fazemos, é criar uma ação de animação tendo em conta a animação que é pretendida.
    // De seguida é inicializada a reprodução da animação
    var action = mixerAnimacao.clipAction(object.animations[0]);
    action.play();

    // object.traverse é uma função que percorre todos os filhos desse mesmo objeto.
    // O que nós fazemos, é criar uma ação de animação tendo em conta a animação que é pretendida.
    // De seguida é inicializada a reprodução da animação.
    object.traverse(function (child) {

        if(child.isMesh) {

            child.castShadow = true;
            child.receiveShadow = true;

        }

    });

    // Adiciona o objeto importado à cena
    cena.add(object);

    // Quando o objeto é importado, este tem uma escala de 1 nos três eixos(XYZ). Uma vez que
    // este é demasiado grande, mudamos a escala deste objeto para ter 0.01 em todos os eixos
    object.scale.x = 0.01;
    object.scale.z = 0.01;
    object.scale.y = 0.01;

    // Mudamos a posição do objeto importado para que este não fique na mesma posição que o cubo.
    object.position.x = 3;

    // Guardamos o objeto importado na variável objetoImportado
    objetoImportado = object;

    
});

*/

function Start(){

    cena.add(retangulo);

    // Criação de um foco de luz com a cor branca (#ffffff) e intensidade a 1 (intensidade normal)
    var light = new THREE.SpotLight('#ffffff', 1);

    // Mudar a posição da luz para ficar 5 unidades a cima de onde a câmara se encontra.
    light.position.y = 5;
    light.position.z = 10;

    // Dizemos a light para a apontar para a posição do cubo
    light.lookAt(retangulo.position);

    //Adicionamos a light à cena
    cena.add(light);

    camara.position.z = 10;

    requestAnimationFrame(update);
}

function update(){

    if(cuboCoordRotation != null)
    {
        retangulo.rotation.x += cuboCoordRotation.y * 0.1;
        retangulo.rotation.y += cuboCoordRotation.x * 0.1;
    }

    if(camaraAndar != null)
    {
       // camara.position.x += camaraAndar.x;
        // camara.position.z += camaraAndar.z;

        camara.position.x += camaraAndar.x;
        camara.position.z += camaraAndar.z;
    }



    // Necessário atualizar o mixerAnimação tendo em conta o tempo desde o ultimo update.
    // relogio.getDelta() indica quanto tempo passou desde o último frame renderizado.

    /*

    if(mixerAnimacao) {
        mixerAnimacao.update(relogio.getDelta());
    }

    */

    camaraAndar = {x:0, y:0, z:0};

    // Renderizamos a cena tendo em conta qual a cena que queremos visualizar e
    // a camara que pretendemos.
    renderer.render( cena, camara);

    // Como já sabes, esta linha de código é responsável por dizer ao browser que
    // pretendemos criar uma animação e que deve chamar a função passada no parâmetro
    // da função.
    requestAnimationFrame(update);
}