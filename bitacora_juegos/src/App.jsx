import { useState } from 'react';
import './App.css';

function App() {
  // --- Estados ---
  const [juegos, setJuegos] = useState(['The Witcher 3', 'Cyberpunk 2077']);
  const [juego, setJuego] = useState('');

  // Nuevos estados para la edición:
  const [editingIndex, setEditingIndex] = useState(null); // Índice del juego que se está editando (null si ninguno)
  const [editText, setEditText] = useState(''); // Texto temporal mientras se edita

  // --- Handlers (Manejadores de eventos) ---

  // Handler para el input de AÑADIR juego
  const handleInputChange = (event) => {
    setJuego(event.target.value);
  };

  // Handler para AÑADIR juego
  const agregarJuego = () => {
    if (juego.trim() === '') {
      alert('Ingresa un nombre de juego válido.');
      return;
    }
    if (juegos.includes(juego.trim())) {
        alert('Ese juego ya está en la lista.');
        return;
    }
    setJuegos([...juegos, juego.trim()]);
    setJuego('');
  };

  // Handler para BORRAR juego
  const borrarJuego = (juegoABorrar) => {
    // Si estamos editando el juego que queremos borrar, cancelamos la edición primero
    if (juegos[editingIndex] === juegoABorrar) {
        setEditingIndex(null);
        setEditText('');
    }
    setJuegos(juegos.filter(item => item !== juegoABorrar));
  };

  // Handler para iniciar la EDICIÓN
  const handleEditClick = (index) => {
    setEditingIndex(index); // Guarda el índice del juego a editar
    setEditText(juegos[index]); // Pone el nombre actual en el input de edición
  };

  // Handler para el input MIENTRAS SE EDITA
  const handleEditTextChange = (event) => {
    setEditText(event.target.value);
  };

  // Handler para GUARDAR la edición
  const handleSaveEdit = () => {
    if (editText.trim() === '') {
      alert('El nombre del juego no puede estar vacío.');
      return;
    }
    // Verifica si el nuevo nombre (editado) ya existe en OTRO índice
    if (juegos.some((item, index) => item === editText.trim() && index !== editingIndex)) {
        alert('Ese nombre de juego ya existe en la lista.');
        return;
    }

    // Crea un nuevo array basado en el original
    const juegosActualizados = juegos.map((item, index) => {
      // Si el índice coincide con el que estamos editando, devuelve el nuevo texto
      if (index === editingIndex) {
        return editText.trim();
      }
      // Si no, devuelve el item original
      return item;
    });

    setJuegos(juegosActualizados); // Actualiza el estado con el nuevo array
    setEditingIndex(null); // Termina el modo edición
    setEditText(''); // Limpia el texto de edición
  };

  // Handler para CANCELAR la edición
  const handleCancelEdit = () => {
    setEditingIndex(null); // Simplemente sale del modo edición
    setEditText('');
  };


  // --- Renderizado (Lo que se ve en pantalla) ---
  return (
    <div className="App">
      <h1>Mi Lista de Juegos</h1>

      {/* Input y Botón para agregar */}
      <div>
        <input
          type="text"
          placeholder="Añade un juego..."
          value={juego}
          onChange={handleInputChange}
          // Opcional: Añadir al presionar Enter
          onKeyDown={(e) => e.key === 'Enter' && agregarJuego()}
        />
        <button onClick={agregarJuego}>Agregar</button>
      </div>

      {/* Lista para mostrar los juegos */}
      <h2>Juegos Agregados:</h2>
      <ul>
        {juegos.map((item, index) => (
          <li key={index}> {/* Usar index como key aquí es aceptable si la lista no se reordena */}
            {editingIndex === index ? (
              // --- VISTA DE EDICIÓN ---
              <> {/* Fragmento para agrupar elementos sin añadir un div extra */}
                <input
                  type="text"
                  value={editText}
                  onChange={handleEditTextChange}
                  // Opcional: Guardar al presionar Enter mientras se edita
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
                  autoFocus // Pone el foco automáticamente en el input al aparecer
                />
                <button onClick={handleSaveEdit} style={{ marginLeft: '5px' }}>Guardar</button>
                <button onClick={handleCancelEdit} style={{ marginLeft: '5px' }}>Cancelar</button>
              </>
            ) : (
              // --- VISTA NORMAL ---
              <>
                {item} {/* Muestra el nombre del juego */}
                <button onClick={() => handleEditClick(index)} style={{ marginLeft: '10px' }}>
                  Editar
                </button>
                <button onClick={() => borrarJuego(item)} style={{ marginLeft: '5px' }}>
                  Borrar
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      {juegos.length === 0 && <p>¡Aún no has agregado ningún juego!</p>}
    </div>
  );
}

export default App;