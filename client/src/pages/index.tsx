import type { NextPage } from 'next';
import { ConversionDisplay } from '../components/modules/ConversionDisplay/ConversionDisplay';
import { Footer } from '../components/modules/Footer';

const HomePage: NextPage = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <ConversionDisplay />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
