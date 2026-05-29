/**
 * LÓGICA PRINCIPAL - ADMINISTRADOR DE TAREAS SPA
 * Módulo 3: DOM, LocalStorage y Fetch API
 */

// URL base para JSON Server
const API_URL = 'http://localhost:3000/tasks';

// TASK 4: Arreglo global para almacenar el estado de los datos
let localTasks = [];

// Referencias al DOM
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const messageContainer = document.getElementById('message-container');

// ==========================================
// 1. INTERACCIÓN Y VALIDACIÓN (TASK 2)
// ==========================================

/**
 * Muestra un mensaje dinámico temporal en el DOM (Éxito/Error)
 * @param {string} text - Mensaje a mostrar
 * @param {string} type - 'success' o 'error'
 */
function showMessage(text, type) {
    messageContainer.textContent = text;
    messageContainer.className = `message ${type}`;
    
    setTimeout(() => {
        messageContainer.textContent = '';
        messageContainer.className = '';
    }, 3000);
}

// Escuchador del formulario (POST / Agregar)
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const taskName = taskInput.value.trim();

    // Validación de campos vacíos
    if (!taskName) {
        showMessage('⚠️ El campo no puede estar vacío.', 'error');
        return;
    }

    const newTask = {
        title: taskName,
        completed: false
    };

    // Intentar guardar en el servidor
    const savedTask = await apiCreateTask(newTask);

    if (savedTask) {
        localTasks.push(savedTask); // Guardamos en el arreglo global
        updateLocalStorage();       // Sincronizamos localmente
        renderTaskElement(savedTask); // Modificamos el DOM dinámicamente
        taskForm.reset();
        showMessage('✅ Tarea agregada con éxito.', 'success');
    }
});

// ==========================================
// 2. MANIPULACIÓN DINÁMICA DEL DOM (TASK 3)
// ==========================================

/**
 * Crea y renderiza un elemento <li> en el DOM usando appendChild()
 * @param {Object} taskObject 
 */
function renderTaskElement(taskObject) {
    // Crear el elemento li de forma dinámica
    const li = document.createElement('li');
    li.id = `task-${taskObject.id}`;
    li.className = taskObject.completed ? 'completed' : '';

    // Crear el texto contenedor
    const span = document.createElement('span');
    span.textContent = taskObject.title;
    
    // Evento para simular un PUT (Actualizar estado completado) al hacer clic en el texto
    span.addEventListener('click', async () => {
        const updatedStatus = !taskObject.completed;
        const updated = await apiUpdateTask(taskObject.id, { ...taskObject, completed: updatedStatus });
        
        if (updated) {
            taskObject.completed = updatedStatus;
            li.classList.toggle('completed');
            updateLocalStorage();
            showMessage('🔄 Tarea actualizada.', 'success');
        }
    });

    // Crear el botón de eliminar de forma dinámica
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.className = 'delete-btn';
    
    // Evento para el DELETE (Eliminar elemento)
    deleteBtn.addEventListener('click', async () => {
        const success = await apiDeleteTask(taskObject.id);
        if (success) {
            // Remoción usando removeChild desde el nodo padre
            taskList.removeChild(li); 
            
            // Actualizar arreglo global y LocalStorage
            localTasks = localTasks.filter(t => t.id !== taskObject.id);
            updateLocalStorage();
            showMessage('❌ Tarea eliminada correctamente.', 'success');
        }
    });

    // Unir componentes usando appendChild
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

/**
 * Limpia el contenedor y renderiza todas las tareas del arreglo global
 */
function renderAllTasks() {
    taskList.innerHTML = '';
    localTasks.forEach(task => renderTaskElement(task));
}

// ==========================================
// 3. PERSISTENCIA EN LOCAL STORAGE (TASK 4)
// ==========================================

function updateLocalStorage() {
    localStorage.setItem('myTasksBackup', JSON.stringify(localTasks));
}

function loadFromLocalStorage() {
    const backup = localStorage.getItem('myTasksBackup');
    return backup ? JSON.parse(backup) : null;
}

// ==========================================
// 4. INTEGRACIÓN CON FETCH API / CRUD (TASK 5)
// ==========================================

/**
 * GET: Obtener tareas del servidor
 */
async function apiGetTasks() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error al obtener datos del servidor.');
        const data = await response.json();
        console.log('GET Response:', data); // Log para TASK 6
        return data;
    } catch (error) {
        console.error('Fetch GET Error:', error);
        return null;
    }
}

/**
 * POST: Crear una nueva tarea
 */
async function apiCreateTask(taskData) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData)
        });
        if (!response.ok) throw new Error('Error al enviar datos.');
        const data = await response.json();
        console.log('POST Response:', data); // Log para TASK 6
        return data;
    } catch (error) {
        console.error('Fetch POST Error:', error);
        showMessage('🔴 No se pudo sincronizar con el servidor.', 'error');
        return null;
    }
}

/**
 * PUT: Actualizar un elemento existente
 */
async function apiUpdateTask(id, updatedData) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });
        if (!response.ok) throw new Error('Error al actualizar datos.');
        const data = await response.json();
        console.log('PUT Response:', data); // Log para TASK 6
        return data;
    } catch (error) {
        console.error('Fetch PUT Error:', error);
        return null;
    }
}

/**
 * DELETE: Eliminar un elemento de la API
 */
async function apiDeleteTask(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Error al eliminar datos de la API.');
        console.log(`DELETE Successful for ID: ${id}`); // Log para TASK 6
        return true;
    } catch (error) {
        console.error('Fetch DELETE Error:', error);
        return false;
    }
}

// ==========================================
// 5. INICIALIZACIÓN DE LA APP (TASK 6)
// ==========================================

window.addEventListener('DOMContentLoaded', async () => {
    // Intentar cargar desde la API primero (Sincronización en tiempo real)
    const serverTasks = await apiGetTasks();

    if (serverTasks) {
        localTasks = serverTasks;
        updateLocalStorage();
    } else {
        // Fallback: Si el servidor está apagado, cargamos del LocalStorage
        console.warn('Servidor offline. Cargando copia de respaldo local...');
        const backup = loadFromLocalStorage();
        if (backup) localTasks = backup;
    }

    // Renderizado automático inicial
    renderAllTasks();
    console.log('Contenido inicial de LocalStorage:', localStorage.getItem('myTasksBackup'));
});
