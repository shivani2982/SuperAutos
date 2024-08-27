import React from 'react';


const Home = ({ filterItemsByCategory }) => {
  return (
    <main className='HomePage'>
      <div className="homeButton" onClick={() => filterItemsByCategory("66ab8b896c3188240265d717")}>
        <img src="/MobilOil.JPG" alt="Mobile Oil" className="itemImage" />
        <div className="itemDetails">
          <h3>Mobil Oil</h3>
        </div>
      </div>
      <div className="homeButton" onClick={() => filterItemsByCategory("66ab8b686c3188240265d714")}>
        <img src="/Auto-Parts.JPG" alt="Auto Parts" className="itemImage" />
        <div className="itemDetails">
          <h3>Auto Parts</h3>
        </div>
      </div>
      <div className="homeButton" onClick={() => filterItemsByCategory("66abbdbbba37bcf5ff4cd293")}>
        <img src="/Filters.jpeg" alt="Filters" className="itemImage" />
        <div className="itemDetails">
          <h3>Air & Oil Filters</h3>
        </div>
      </div>
    </main>
  );
};

export default Home;
