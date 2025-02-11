import React from 'react';

import calendrier from '@/assets/calendrier.png';
import carte from '@/assets/carte.png';
import horloge from '@/assets/horloge.png';


interface BoxProps {
  title: string;
  content: string;
  color?: string;
  imageUrl?: string;
}


const Box: React.FC<BoxProps> = ({ title, content, color = 'lightgray' , imageUrl }) => {
    // style des box
    const boxStyle = {
      padding: '20px',
      margin: '10px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: color,
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      flex: '1 1 30%',
    };

    const imageStyle = {
        width: '50px', 
        height: '50px', 
        marginBottom: '10px',
        backgroundColor: 'transparent'
    };

    return (
    <div style={boxStyle}>
      {imageUrl && <img src={imageUrl} alt="Image de la boîte" style={imageStyle} />}
      <h2 className="text-xl font-bold text-black mb-4 mr-auto pr-16">{title}</h2>
      <p>{content}</p>
    </div>
  );
};

const BoxContainer: React.FC = () => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <Box
          title="Réservation simple" 
          content="Réservation rapide
          réservez vos rendez-vous en ligne , quand vous le voulez 24h/24 et 7j/7 !"
          imageUrl={calendrier}
        />
        <Box 
          title="Partout" 
          content="Tous les médecins proche de chez vous !" 
          imageUrl={carte}
        />
        <Box 
          title="Gain de temps" 
          content="Tout est accessible en quelque clic et c'est simple d'utilisation " 
          imageUrl={horloge}
        />
      </div>
    );
  };

export default BoxContainer;