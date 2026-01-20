import React, { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import preguntasData from '../data/preguntas.json';
import ConfigMenu from './ConfigMenu';
import Carta from './Carta';
import { barajarMazo, getColores } from '../utils/gameLogic';

const mazoBase = barajarMazo(preguntasData);

const Preguntero = () => {
  const [jugando, setJugando] = useState(false);
  const [soloATP, setSoloATP] = useState(false);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState(['perspectivas', 'presentacion', 'profundidad', 'picantes', 'random']);
  const [indiceActual, setIndiceActual] = useState(0);

  const mazoFiltrado = useMemo(() => {
    return mazoBase.filter(p => {
      const cumpleATP = soloATP ? p.atp === true : true;
      const cumpleCat = categoriasSeleccionadas.includes(p.categoria);
      return cumpleATP && cumpleCat;
    });
  }, [soloATP, categoriasSeleccionadas]);

  const juegoTerminado = indiceActual >= mazoFiltrado.length && mazoFiltrado.length > 0;

  const siguienteCarta = () => setIndiceActual(prev => prev + 1);
  const anteriorCarta = () => { if (indiceActual > 0) setIndiceActual(prev => prev - 1); };
  const reiniciarJuego = () => { setIndiceActual(0); setJugando(false); };

  const cartaAnterior = indiceActual > 0 ? mazoFiltrado[indiceActual - 1] : null;

  return (
    <div style={styles.appContainer}>
      {!jugando ? (
        <ConfigMenu 
          soloATP={soloATP} setSoloATP={setSoloATP}
          categorias={categoriasSeleccionadas}
          toggleCategoria={(cat) => setCategoriasSeleccionadas(prev => 
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
          )}
          alEmpezar={() => { setIndiceActual(0); setJugando(true); }}
        />
      ) : (
        <div style={styles.gameArea}>
          {!juegoTerminado && (
            <button onClick={() => setJugando(false)} style={styles.btnVolver}>
              ← MENÚ
            </button>
          )}

          <AnimatePresence initial={false}>
            {!juegoTerminado ? (
              mazoFiltrado.slice(indiceActual, indiceActual + 2).reverse().map((p) => {
                const relativoIdx = mazoFiltrado.indexOf(p) - indiceActual;
                return (
                  <Carta 
                    key={p.id}
                    data={p}
                    isTop={relativoIdx === 0}
                    index={relativoIdx}
                    onSwipe={siguienteCarta}
                  />
                );
              })
            ) : (
              <motion.div key="final" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={styles.pantallaFinal}>
                <span style={{ fontSize: '50px' }}>✨</span>
                <h2>¡Mazo completado!</h2>
                <p style={{ color: '#888', fontSize: '14px', marginBottom: '30px' }}>Esperamos que estas preguntas hayan servido para conectar.</p>
                <button onClick={reiniciarJuego} style={styles.btnReiniciar}>VOLVER AL INICIO</button>
              </motion.div>
            )}
          </AnimatePresence>

          <div style={styles.contenedorAnterior}>
            <AnimatePresence>
              {cartaAnterior && (
                <motion.div
                  key="descarte"
                  initial={{ x: -100, opacity: 0, rotate: -30 }}
                  animate={{ x: 0, opacity: 1, rotate: -10 }}
                  exit={{ x: 100, y: -100, opacity: 0 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={anteriorCarta}
                  style={{...styles.mazoDadoVuelta, backgroundColor: getColores(cartaAnterior.categoria)}}
                >
                  <span style={{ fontSize: '20px' }}>↩</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  appContainer: { backgroundColor: '#121212', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', position: 'fixed' },
  gameArea: { position: 'relative', width: '90vw', maxWidth: '350px', height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'visible' },
  contenedorAnterior: { position: 'absolute', bottom: '-40px', left: '10px', zIndex: 999 },
  mazoDadoVuelta: { width: '65px', height: '95px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 8px 15px rgba(0,0,0,0.5)', border: '2.5px solid rgba(255,255,255,0.3)', backfaceVisibility: 'hidden' },
  btnVolver: { position: 'absolute', top: '-60px', left: '0', background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' },
  pantallaFinal: { backgroundColor: '#1a1a1a', width: '100%', padding: '40px 20px', borderRadius: '30px', textAlign: 'center', color: 'white', border: '1px solid #333' },
  btnReiniciar: { padding: '15px 30px', borderRadius: '50px', border: 'none', backgroundColor: 'white', color: 'black', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }
};

export default Preguntero;