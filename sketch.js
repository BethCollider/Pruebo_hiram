    //Diseño de objetos
    //Agregar imagen de colicion
    var trex ,trex_running, trex_collider;
    var limite;
    var suelo, sueloImg, sueloInv;
    var nubeImg;
    var obs1,obs2,obs3,obs4,obs5,obs6;
    //Puntaje
    var score;
    //Establecer estados de juego GS
    var PLAY = 1;
    var END = 0;
    var GS = PLAY;
    //Definir el objetos de imagen Gameover y reset
    var gameover, reset, gameoverImg, resetImg;
    //Definir varaibles con efectos de sonidos
    var jump, check, die;

    //funcion para precargar imagen y sonido
    function preload(){
    //Cargar animacion
    trex_running = loadAnimation ("trex1.png","trex3.png","trex4.png");
    //Cargar imagen
    sueloImg = loadImage ("ground2.png");
    nubeImg= loadImage ("cloud.png");
    obs1 = loadImage ("obstacle1.png");
    obs2 = loadImage ("obstacle2.png");
    obs3 = loadImage ("obstacle3.png");
    obs4 = loadImage ("obstacle4.png");
    obs5 = loadImage ("obstacle5.png");
    obs6 = loadImage ("obstacle6.png");
    //Cargar imagen de trex colicion
    trex_collider = loadImage ("trex_collided.png");

    //Cargar imagen de Gameover y reset
    gameoverImg = loadImage ("gameOver.png");
    resetImg = loadImage ("restart.png");

    //Cargar efectos de sonido
    jump = loadSound ("jump.mp3");
    check = loadSound ("checkPoint.mp3");
    die = loadSound ("die.mp3");


    }

    //Funcion de configuracion
    function setup(){
    //Area de juego o lienzo de trabajo pixel
    createCanvas(600,200)

    //Mandar mensaje a la consola
    //console.log("trex_runner");
    
    //crear sprite del t-rex.
    trex = createSprite (50,160,20,50);
    //Animar objeto
    trex.addAnimation("runner",trex_running);
    //Agregar imagen de colicion
    trex.addImage ("collider", trex_collider)
    //Cambiar escala y poscision X
    trex.scale = 0.5;
    trex.x = 50;
    //Crear limite
    limite = createEdgeSprites();

    //Diseño del suelo
    suelo = createSprite (200,180,400,20);
    //Animar suelo
    suelo.addImage ("suelo", sueloImg);

    //Diseñar suelo invisible
    sueloInv = createSprite(200,190,400,10);
    //Se define que es invisible
    sueloInv.visible = false;

    //Crear objeto de imagen GameOver y cargar imagen
    gameover = createSprite (300,100);
    gameover.addImage(gameoverImg);
    gameover.scale = 0.5;
    gameover.visible = false;

    //Crear objeto de imagen reset t cargar imagen
    reset = createSprite (300,140);
    reset.addImage (resetImg);
    reset.scale = 0.5;
    reset.visible = false;

    //Establecer numero aleatorio en la consola
    //var ran = Math.round (random (1,100));
    //console.log(ran);
    
    //Puntaje
    score = 0;

    //Establecer grupos
    nubeGrup = new Group();
    obsGrup = new Group();
    }

    //Funcion de dibujo
    function draw(){
    //Fondo
    background(150);

    //Establecer posicion y conteo de puntaje
    text("Puntuacion: "+score,500,50);
    

    //Establecer Estados de juego
    if (GS === PLAY){
        //Establecer movimiento del sulo
    //suelo.velocityX = - 2;

    //Definir aumento de la velocidad conforme aumenta puntuacion
     suelo.velocityX = -(4 + 3*score/100);

    //frameCount 60 cuadros * segundo
    score = score + Math.round(getFrameRate()/60);

    //Establecer condicion de sonido por marcar 100 puntos
    if(score > 0 && score % 100 === 0){
        check.play();
    }

     //Establecer el ciclo infinito del suelo
     if (suelo.x < 0) {
        suelo.x = suelo.width/2;
       }
       //Salto de trex con tecla
       if (keyDown ("space") && trex.y >= 100) {
        //Velocidad de salto
        trex.velocityY = -10;
        //Agregar efecto de sonido
        jump.play();
       }
    //Efecto de gravedad
    trex.velocityY = trex.velocityY + 0.5;
    //Llamar a la funcion de obstaculos
    obs ();
    //Llamar a la funcion nubes
    nubes();

    //Cambiar el estado PLAY a END
    if (obsGrup.isTouching(trex)){ 
        GS = END;
        //Agregar efecto de sonido
        die.play();
        }
    }

    else if (GS === END){
        //Visualixar los mensajes de Gameover y reset despues de pasar a END
        gameover.visible = true;
        reset.visible = true;

        //Establecer movimiento del sulo
    suelo.velocityX = 0;
    //Establer trex estatico
    trex.velocityY =0;

    //Cambiar imagen de trex runner a trex colicion
    trex.changeAnimation ("collider", trex_collider);

    
    //Establecer tiempo de vida de los objetos despues de entrar en GS END
    obsGrup.setLifetimeEach(-1);
    nubeGrup.setLifetimeEach (-1);

    //Velocidad 0 a las nubes y objetos
    obsGrup.setVelocityXEach(0);
    nubeGrup.setVelocityXEach(0);

        //Establecer condicion para reiniciar juego
        if (mousePressedOver(reset)){
            reinicio();
        }
   
    }
     //Evita que el trex caiga con suelo invisible
     trex.collide(sueloInv);

    

//Informacion de fotograma/segundo 
    //console.log(frameCount);    
    //Mandar mensaje a la consola
    //console.log(trex.y);
    //Codigo para proyectar todos los objetos
    drawSprites();
    }

    //Construir la funcion de nubes
    function nubes () {
        //Construir una condicional para mostras solo cada 60 fotogramas nubes
        if(frameCount % 60 === 0){
        nube = createSprite (600,100,40,10);
        //Agregar animacion de nube
        nube.addImage(nubeImg);
        nube.scale = 0.4;
        //Aparicion aleatoria entre y 10 - 60 pixeles
        nube.y = Math.round(random(10,60));
        nube.velocityX = -3;
        //Definir capa de proyeccion de ojeto
        nube.depth = trex.depth;
        trex.depth = trex.depth +1;
        //Definir tiempo de vida
        nube.lifetime = 200;

       //Revisar profundidad imagen
      console.log(trex.depth);
      console.log(nube.depth);

      //Se agrega los grupos a las nubes
      nubeGrup.add(nube);

        }
    }
//Constriur la funcion de obstaculos
function obs () {
    //Establecer la creacion de objeto obstaculo
    if (frameCount % 60 == 0 ){
        var obstaculo = createSprite ( 600, 165,10,40);
        //Definir complejidad al transcurrir el juego
        obstaculo.velocityX = -(6 + score/100);
        //obstaculo.velocityX = -6;
        
        //Se define la aleatoriedad de paricion de los obstaculos
    var rand = Math.round (random(1,6));
    switch (rand) {
        case 1: obstaculo.addImage(obs1);
        break;
        case 2: obstaculo.addImage(obs2);
        break;
        case 3: obstaculo.addImage(obs3);
        break;
        case 4: obstaculo.addImage(obs4);
        break;
        case 5: obstaculo.addImage(obs5);
        break;
        case 6: obstaculo.addImage(obs6);
        break;
        default: break;
    }
    //Establecer escala y tiempo de vida
    obstaculo.scale = 0.5;
    obstaculo.lifetime = 300;

    //agregar grupo a los obstaculos
    obsGrup.add(obstaculo);
    }
}
function reinicio () {
    //Establecer el cambio de GS
    GS = PLAY;
    //Definir visiviliodad de mensajes
    gameover.visible = false;
    reset.visible = false;

    //Establecer destruccion de obstaculos y nubes
    obsGrup.destroyEach();
    nubeGrup.destroyEach();

    //Cambiar imagen trex
    trex.changeAnimation("runner",trex_running);

    //Puntacion 0
    score = 0;

}