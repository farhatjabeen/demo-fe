import React from 'react';
import './index.scss'
// import { Link } from 'react-router-dom';
import ImageWorkFlow from '../../components/imageWorkFlow';
import OurBrands from '../../components/ourBrands';
import Faq from '../../components/faqs';
import SearchReport from '../../components/searchReport';

const Home = () => {

  const questions = [{ questions: 'How can I report a lost item on BT Zapp?', answers: 'answer1' },
  { questions: 'What should I do if I found an item and want to return it through BT Zapp?', answers: 'answer2' },
  { questions: 'Does BT Zapp charge any fees for reporting lost or found items?', answers: 'answer3' },
  { questions: 'What happens if I recover my lost item after reporting it on BT Zapp?', answers: 'answer4' },
  { questions: 'I have more questions. Who do I reach out to?', answers: 'answer5' }];

  return (
    <div className='flex flex-col items-center'>
      {/* <Link to={"./findMissingItem"}>Find missing</Link> */}
      <div>
        <SearchReport />
      </div>

      <div>
        <ImageWorkFlow />
      </div>

      <div className='w-full'>
        <OurBrands />
      </div>

      <div>
        <Faq questions={questions} />
      </div>
    </div>
  );
};

export default Home;
