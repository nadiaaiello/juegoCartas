import React from 'react';
import { getColores } from '../utils/gameLogic';

const ConfigMenu = ({ soloATP, setSoloATP, categorias, toggleCategoria, alEmpezar }) => {
  const listaCats = ['perspectivas', 'presentacion', 'profundidad', 'picantes', 'random'];

  return (
    <div style={styles.menuScrollContainer}>
      <div style={styles.menuContent}>
        <h1 style={styles.titulo}>En Palabras</h1>
        
        {/* EXPLICACIÓN DE MODOS */}
        <p style={styles.labelSeccion}>1. ELEGÍ TU MODO DE JUEGO</p>
        <div style={styles.modoSelector}>
          <button 
            onClick={() => setSoloATP(true)}
            style={{
              ...styles.btnModo,
              backgroundColor: soloATP ? '#22c55e' : '#1e1e1e',
              border: soloATP ? '2px solid #22c55e' : '2px solid #333'
            }}
          >
            <span style={styles.emoji}>🍃</span>
            <div style={styles.textoModo}>
              <span style={styles.nombreModo}>Familiar</span>
              <span style={styles.descModo}>Solo preguntas ATP</span>
            </div>
          </button>

          <button 
            onClick={() => setSoloATP(false)}
            style={{
              ...styles.btnModo,
              backgroundColor: !soloATP ? '#E74C3C' : '#1e1e1e',
              border: !soloATP ? '2px solid #E74C3C' : '2px solid #333'
            }}
          >
            <span style={styles.emoji}>🔥</span>
            <div style={styles.textoModo}>
              <span style={styles.nombreModo}>Completo</span>
              <span style={styles.descModo}>Incluye +18</span>
            </div>
          </button>
        </div>

        {/* SELECTOR DE CATEGORÍAS */}
        <p style={styles.labelSeccion}>2. SELECCIONÁ LAS SECCIONES</p>
        <div style={styles.gridCategorias}>
          {listaCats.map(cat => (
            <button 
              key={cat}
              onClick={() => toggleCategoria(cat)}
              style={{
                ...styles.btnCat, 
                opacity: categorias.includes(cat) ? 1 : 0.25,
                borderColor: getColores(cat),
                backgroundColor: categorias.includes(cat) ? `${getColores(cat)}22` : 'transparent'
              }}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* INSTRUCCIONES ESTILO MANUAL */}
        <div style={styles.cajaInstrucciones}>
          <p style={styles.instruccionTitulo}>¿CÓMO JUGAR?</p>
          <p style={styles.instruccionTexto}>
            Rompé el hielo y conectá. No hay ganadores ni perdedores. 
            La persona <b>más joven</b> empieza tomando una carta.
          </p>
        </div>

        <button 
          onClick={alEmpezar}
          disabled={categorias.length === 0}
          className="btn-jugar-pulse"
          style={{
            ...styles.btnJugar,
            opacity: categorias.length === 0 ? 0.5 : 1,
            cursor: categorias.length === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          ¡JUGAR!
        </button>
      </div>
    </div>
  );
};

const styles = {
  menuScrollContainer: {
    width: '100vw',
    height: '100vh',
    overflowY: 'auto',
    backgroundColor: '#121212',
    padding: '20px',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center'
  },
  menuContent: {
    width: '100%',
    maxWidth: '400px',
    fontFamily: 'system-ui, sans-serif',
    color: 'white',
    textAlign: 'center',
    paddingBottom: '40px' // Espacio para que el botón no quede pegado abajo
  },
  titulo: { 
    fontSize: 'clamp(2rem, 8vw, 2.5rem)', 
    fontWeight: '800', 
    margin: '30px 0', 
    letterSpacing: '-1px' 
  },
  labelSeccion: { 
    fontSize: '11px', 
    fontWeight: 'bold', 
    color: '#666', 
    letterSpacing: '1px', 
    marginBottom: '15px',
    textAlign: 'left'
  },
  modoSelector: { 
    display: 'flex', 
    gap: '10px', 
    marginBottom: '35px' 
  },
  btnModo: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    padding: '12px 10px',
    borderRadius: '16px',
    transition: 'all 0.2s ease',
    textAlign: 'left',
    color: 'white'
  },
  emoji: { fontSize: '20px', marginRight: '8px' },
  textoModo: { display: 'flex', flexDirection: 'column' },
  nombreModo: { fontSize: '13px', fontWeight: 'bold' },
  descModo: { fontSize: '9px', opacity: 0.7 },
  gridCategorias: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(2, 1fr)', 
    gap: '10px', 
    marginBottom: '35px' 
  },
  btnCat: {
    padding: '12px 5px',
    borderRadius: '12px',
    border: '2px solid',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '10px',
    transition: '0.2s'
  },
  cajaInstrucciones: {
    backgroundColor: '#1e1e1e',
    padding: '20px',
    borderRadius: '15px',
    textAlign: 'left',
    marginBottom: '30px',
    border: '1px solid #333'
  },
  instruccionTitulo: { 
    fontSize: '12px', 
    fontWeight: 'bold', 
    marginBottom: '8px', 
    color: '#888' 
  },
  instruccionTexto: { 
    fontSize: '14px', 
    lineHeight: '1.5', 
    margin: 0, 
    color: '#bbb' 
  },
  btnJugar: {
    width: '100%',
    padding: '20px',
    borderRadius: '20px',
    border: 'none',
    backgroundColor: '#3b82f6',
    color: 'white',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    boxShadow: '0 10px 20px rgba(59, 130, 246, 0.3)'
  }
};

export default ConfigMenu;