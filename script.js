//Para la página de Historia
    //Para la parte de la barra del video
    // Se hace un if así el código solo se ejecuta si es que video no es NULL.
    const video = document.getElementById('videoHistoria');
    const tiempoDeVideoDiv = document.getElementById('tiempoDeVideo');
    if(video){
        video.addEventListener('loadedmetadata', () => {
            const duration = video.duration;
            const durationRedondear = duration.toFixed(2); 
            tiempoDeVideoDiv.textContent = 'Duración video: ' + durationRedondear + ' segundos';
        })

        const botonPlay = document.getElementById('play');
        const botonPausa = document.getElementById('pausa');
        // Reanudar el video.
        botonPlay.addEventListener('click', () => {
            video.play(); 
        });
        // Pausar el video.
        botonPausa.addEventListener('click', () => {
            video.pause();
        });
    }

// Para la página de Juegos.
    // Para el rompecabezas.
    // Se hace un if así el código solo se ejecuta si es que botonReiniciar no es null.
    const botonReiniciar = document.querySelector('.reiniciar');
    if(botonReiniciar){
        const cajas = document.querySelectorAll('.caja');
        const imagenes = document.querySelectorAll('.imagenCaja');
        const cajasOriginales = Array.from(cajas); // Clonar los elementos .caja originales

        function agregarListeners() {
        imagenes.forEach(imagen => {
            imagen.addEventListener('dragstart', drag);
        });

        cajas.forEach(caja => {
            caja.addEventListener('dragover', permitirDrop);
            caja.addEventListener('drop', drop);
        });
        }

        agregarListeners(); // Agregar listeners al cargar la página

        // Evitar acción predeterminada del navegador para permitir el Drag and Drop.
        function permitirDrop(event) {
        event.preventDefault();
        }

        function drag(event) {
        event.dataTransfer.setData('text/plain', event.target.id);
        }

        function drop(event) {
        event.preventDefault();
        const data = event.dataTransfer.getData('text');
        const imagenDrag = document.getElementById(data);
        const imagenTarget = event.target;
        const imagenCopia = imagenDrag.cloneNode(true);
        imagenTarget.parentNode.replaceChild(imagenCopia, imagenTarget);
        imagenDrag.remove();
        }

        // Para el botón reiniciar.
        botonReiniciar.addEventListener('click', reiniciarRompecabezas);

        function reiniciarRompecabezas() {
        // Restaurar las imágenes a la caja de imágenes
        const cajasActual = document.querySelector('.cajas');
        // Se eliminarán los elementos actuales
        cajasActual.innerHTML = '';

        cajasOriginales.forEach(caja => {
            const cajaClon = caja.cloneNode(true); // Clonar el elemento .caja original
            cajaClon.addEventListener('dragover', permitirDrop); // Agregar listener al clon
            cajaClon.addEventListener('drop', drop); // Agregar listener al clon
            cajasActual.appendChild(cajaClon); // Agregar el clon a la caja
        });

        const cajaImagenes = document.querySelector('.cajaImagenes');
        imagenes.forEach(imagen => {
            cajaImagenes.appendChild(imagen);
        });

        agregarListeners(); // Agregar listeners nuevamente después de reiniciar
        }
    }