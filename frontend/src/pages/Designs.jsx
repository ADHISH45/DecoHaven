import React, { useState } from 'react';

// Importing images from the assets folder
import living1 from '../assets/living1.png';
import bedroom1 from '../assets/bedroom1.png';
import kitchen1 from '../assets/kitchen1.png';
import office1 from '../assets/office1.png';
import living2 from '../assets/living2.png';
import kitchen2 from '../assets/kitchen2.png';

// Sample data for designs
const designData = [
  { id: 1, title: 'Modern Living Room', category: 'Living Room', type: 'Modern', img: living1 },
  { id: 2, title: 'Classic Bedroom', category: 'Bedroom', type: 'Classic', img: bedroom1 },
  { id: 3, title: 'Minimalist Kitchen', category: 'Kitchen', type: 'Minimalist', img: kitchen1 },
  { id: 4, title: 'Contemporary Office', category: 'Office', type: 'Contemporary', img: office1 },
  { id: 5, title: 'Rustic Living Room', category: 'Living Room', type: 'Rustic', img: living2 },
  { id: 6, title: 'Modern Kitchen', category: 'Kitchen', type: 'Modern', img: kitchen2 },
];

const Designs = () => {
  const [category, setCategory] = useState('All');
  const [type, setType] = useState('All');

  // Filter designs based on selected category and type
  const filteredDesigns = designData.filter((design) => {
    return (category === 'All' || design.category === category) &&
           (type === 'All' || design.type === type);
  });

  return (
    <div style={{ padding: '20px' }}>
      <h1>Interior Designs</h1>

      {/* Filter Controls */}
      <div style={{ marginBottom: '20px' }}>
        <label>
          <strong>Category:</strong>
          <select onChange={(e) => setCategory(e.target.value)} value={category} style={{ margin: '0 10px' }}>
            <option value="All">All</option>
            <option value="Living Room">Living Room</option>
            <option value="Bedroom">Bedroom</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Office">Office</option>
          </select>
        </label>

        <label>
          <strong>Type:</strong>
          <select onChange={(e) => setType(e.target.value)} value={type} style={{ margin: '0 10px' }}>
            <option value="All">All</option>
            <option value="Modern">Modern</option>
            <option value="Classic">Classic</option>
            <option value="Minimalist">Minimalist</option>
            <option value="Contemporary">Contemporary</option>
            <option value="Rustic">Rustic</option>
          </select>
        </label>
      </div>

      {/* Design List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {filteredDesigns.map((design) => (
          <div key={design.id} style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
            <img
              src={design.img}
              alt={design.title}
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <div style={{ padding: '10px' }}>
              <h3>{design.title}</h3>
              <p><strong>Category:</strong> {design.category}</p>
              <p><strong>Type:</strong> {design.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Designs;
