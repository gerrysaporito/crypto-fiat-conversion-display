import type { NextPage } from 'next';
import { ConversionDisplay } from '../components/modules/ConversionDisplay/ConversionDisplay';

const Home: NextPage = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <ConversionDisplay />
    </div>
  );
};

export default Home;
