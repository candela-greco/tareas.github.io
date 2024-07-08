        const listaDeTareas = document.querySelector("#tareas tbody");
        const tareaInput = document.querySelector("#nuevaTarea");
        const buscadorInput = document.querySelector("#buscarTarea");
        const btnAgregar = document.querySelector("#agregarTarea");
        const btnBuscar = document.querySelector("#btnBuscarTarea");
        const cuentaTareas = document.querySelector("#cuentaTareas");
        const tareasRealizadas  = document.querySelector("#tareasRealizadas");

        const tareas = [];
        let idTareas = 0;

        btnAgregar.addEventListener("click", () => {
            const tarea = tareaInput.value;
            const idAleatorio = Math.floor(Math.random() * 1000);
            tareas.push({id: idAleatorio, tarea: tarea, realizada: false});
            tareaInput.value = "";
            renderList(tareas);
        });

        function renderList(tareas){
            let html = "";
            for (let tarea of tareas) {
                html += `<tr>
                            <td>${tarea.id}</td>
                            <td>${tarea.tarea}</td>
                            <td>
                                <input type="checkbox" ${tarea.realizada ? "checked" : ""} onchange="toggleRealizada(${tarea.id}, this.checked)">
                                <i onclick="borrar(${tarea.id})" class="fa-solid fa-x"></i>
                            </td>
                        </tr>`;
            }
            listaDeTareas.innerHTML = html;
            cuentaTareas.textContent = `Total: ${tareas.length}`;
            actualizarTareasRealizadas();
        }

        function toggleRealizada(id, checked) {
            const tarea = tareas.find(t => t.id === id);
            if (tarea) {
                tarea.realizada = checked;
                actualizarTareasRealizadas();
            }
        }

        function actualizarTareasRealizadas() {
            const realizadas = tareas.filter(t => t.realizada).length;
            tareasRealizadas.textContent = `Realizadas: ${realizadas}`;
        }

        function borrar(id){
            const index = tareas.findIndex((ele) => ele.id == id);
            tareas.splice(index, 1);
            renderList(tareas);
        }

        btnBuscar.addEventListener("click", () => {
            const tareaBuscada = buscadorInput.value;
            const tareasFiltradas = tareas.filter(
                (tarea) => tarea.tarea.includes(tareaBuscada)
            );
            renderList(tareasFiltradas);
        });
        actualizarTareasRealizadas();