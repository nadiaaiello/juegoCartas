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
        <div style={{ backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '15px', textAlign: 'left', marginBottom: '30px', fontSize: '14px', lineHeight: '1.5' }}>
        <p><strong>¿Cómo jugar?</strong> Rompé el hielo y conectá. No hay ganadores ni perdedores.</p>
        <p><strong>Inicio:</strong> La persona más joven empieza tomando una carta.</p>
      </div>

      <button 
        onClick={alEmpezar}
        disabled={categorias.length === 0}
        style={{ width: '100%', padding: '20px', borderRadius: '15px', border: 'none', backgroundColor: '#3b82f6', color: 'white', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer' }}
      >
        ¡JUGAR!
      </button>
    </div>
    </div>
  );
};

const styles = {
  menuScrollContainer: {
    width: '100%',
    height: '100%',
    overflowY: 'auto', // Permite scroll solo dentro del menú si el texto es largo
    padding: '40px 20px',
    boxSizing: 'border-box'
  },
  menuContent: {
    maxWidth: '400px',
    margin: '0 auto',
    fontFamily: 'system-ui, sans-serif',
    color: 'white',
    textAlign: 'center'
  },
  titulo: { fontSize: '2.5rem', fontWeight: '800', marginBottom: '30px', letterSpacing: '-1px' },
  labelSeccion: { fontSize: '11px', fontWeight: 'bold', color: '#666', letterSpacing: '1px', marginBottom: '15px' },
  modoSelector: { display: 'flex', gap: '10px', marginBottom: '35px' },
  btnModo: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    padding: '15px 10px',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'left',
    color: 'white'
  },
  emoji: { fontSize: '24px', marginRight: '10px' },
  textoModo: { display: 'flex', flexDirection: 'column' },
  nombreModo: { fontSize: '14px', fontWeight: 'bold' },
  descModo: { fontSize: '10px', opacity: 0.7 },
  gridCategorias: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '35px' },
  btnCat: {
    padding: '12px',
    borderRadius: '12px',
    border: '2px solid',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '11px',
    cursor: 'pointer',
    transition: '0.2s'
  },
  cajaInstrucciones: {
    backgroundColor: '#1a1a1a',
    padding: '20px',
    borderRadius: '20px',
    textAlign: 'left',
    marginBottom: '30px',
    border: '1px solid #333'
  },
  instruccionTitulo: { fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#888' },
  instruccionTexto: { fontSize: '14px', lineHeight: '1.5', margin: 0, color: '#bbb' },
  btnJugar: {
    width: '100%',
    padding: '20px',
    borderRadius: '20px',
    border: 'none',
    backgroundColor: 'white',
    color: 'black',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 10px 20px rgba(255,255,255,0.1)'
  }
};

export default ConfigMenu;