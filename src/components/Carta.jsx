import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { getColores } from '../utils/gameLogic';

const Carta = ({ data, onSwipe, isTop, index }) => {
  const x = useMotionValue(0);
  const [direccionSalida, setDireccionSalida] = useState(0);

  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

  return (
    <motion.div
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      // En el onDragEnd de Carta.jsx:
onDragEnd={(_, info) => {
  // Cualquier swipe fuerte (izq o der) avanza a la siguiente carta
  if (Math.abs(info.offset.x) > 100 || Math.abs(info.velocity.x) > 500) {
    setDireccionSalida(info.offset.x > 0 ? 800 : -800);
    onSwipe(); // Llama a siguienteCarta()
  }
}}
// Dentro de Carta.jsx, actualiza el objeto estiloCarta:
    style={{
  position: 'absolute',
  // Cambiamos px por 100%
  width: '100%', 
  height: '100%',
  backgroundColor: 'white',
  borderRadius: '30px', // Un poco menos de radio para que no se vea raro en pantallas chicas
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10%', // Padding porcentual para el texto
  textAlign: 'center',
  boxSizing: 'border-box',
  zIndex: 10 - index,
  borderTop: `10px solid ${getColores(data.categoria)}`,
  boxShadow: isTop ? '0 10px 30px rgba(0,0,0,0.4)' : 'none',
  willChange: 'transform, opacity',
  touchAction: 'none',

      }}
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ 
        scale: 1 - index * 0.05, 
        y: index * -10, 
        opacity: 1 
      }}
      exit={{ 
        x: direccionSalida, 
        opacity: 0, 
        rotate: direccionSalida > 0 ? 45 : -45,
        transition: { duration: 0.3 } 
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <div style={{ position: 'absolute', top: '40px', color: '#aaa', fontSize: '11px', fontWeight: 'bold' }}>
        {data.categoria.toUpperCase()}
      </div>
      <h2 style={{ color: '#222', fontSize: '1.7rem', margin: 0 }}>{data.pregunta}</h2>
      <div style={{ position: 'absolute', bottom: '40px', color: '#eee', fontSize: '12px', fontWeight: 'bold' }}>
        {data.atp ? "ATP" : "+18"}
      </div>
    </motion.div>
  );
};

export default Carta;