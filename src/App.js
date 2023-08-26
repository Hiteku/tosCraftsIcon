import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const App = () => {
  const [selectedStar, setSelectedStar] = useState('3星');
  const [selectedDragon, setSelectedDragon] = useState('轉動龍印');
  const [uploadedImage, setUploadedImage] = useState(null);
  const canvasRef = useRef(null);

  const stars = ['1星', '2星', '3星'];
  const dragons = [
    '連鎖龍紋', '轉動龍印', '破碎龍咒', '映照龍符', '疾走龍玉',
    '裂空龍刃', '落影龍璃', '擴散龍結', '鏡像龍丸', '節奏龍弦', '全部'
  ];

  const handleStarChange = (event) => {
    setSelectedStar(event.target.value);
  };

  const handleDragonChange = (event) => {
    setSelectedDragon(event.target.value);
  };

  const handleImageUpload = (event) => {
    const uploadedFile = event.target.files[0];
    
    if (uploadedFile) {
      setUploadedImage(URL.createObjectURL(uploadedFile));
    } else {
      setUploadedImage(null);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (selectedStar && selectedDragon) {
      const bgImage = new Image();
      bgImage.src = process.env.PUBLIC_URL + `/images/frame_${selectedStar}.png`;
      bgImage.onload = () => {
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
        
        if (uploadedImage) {
          const img = new Image();
          img.src = uploadedImage;
          img.onload = () => {
            const imgWidth = 120;
            const imgHeight = (imgWidth / img.width) * img.height;
            const x = (canvas.width / 2) - (imgWidth / 2);
            const y = (canvas.height / 2) - (imgHeight / 2);
            
            ctx.drawImage(img, x, y, imgWidth, imgHeight);
          };
        }

        const starImage = new Image();
        starImage.src = process.env.PUBLIC_URL + `/images/pos_${selectedStar}.png`;
        starImage.onload = () => {
          ctx.drawImage(starImage, 0, canvas.height - starImage.height);
        }

        const dragonImage = new Image();
        dragonImage.src = process.env.PUBLIC_URL + `/images/${selectedDragon}.png`;
        dragonImage.onload = () => {
          ctx.drawImage(dragonImage, canvas.width - dragonImage.width, canvas.height - dragonImage.height);
        }
      };
    }
  }, [uploadedImage, selectedStar, selectedDragon]);

  return (
    <div className="App">
      <div className="controls">
        <select value={selectedStar} onChange={handleStarChange}>
          {stars.map((star) => (
            <option key={star} value={star}>{star}</option>
          ))}
        </select>
        <select value={selectedDragon} onChange={handleDragonChange}>
          {dragons.map((dragon) => (
            <option key={dragon} value={dragon}>{dragon}</option>
          ))}
        </select>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>
      <canvas ref={canvasRef} width={160} height={160} />
    </div>
  );
};

export default App;