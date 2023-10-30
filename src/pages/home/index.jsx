import React from 'react';
import './index.scss'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <Link to={"./findMissingItem"}>Find missing</Link>

    </div>
  );
};

export default Home;
