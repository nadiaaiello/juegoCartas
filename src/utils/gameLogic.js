export const barajarMazo = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const getColores = (cat) => {
  const paleta = {
    perspectivas: '#4A90E2', 
    presentacion: '#50E3C2', 
    profundidad: '#9B59B6', 
    picantes: '#E74C3C', 
    random: '#F1C40F'
  };
  return paleta[cat] || '#ccc';
};