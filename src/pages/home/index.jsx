import React from 'react';
import './index.scss'
import { Link } from 'react-router-dom';
import TopBase from '../../components/topBase';

const Home = () => {
  return (
    <div>
      {/* <Link to={"./findMissingItem"}>Find missing</Link> */}
      <div >
      <TopBase />
      </div>
    </div>
  );
};

export default Home;
