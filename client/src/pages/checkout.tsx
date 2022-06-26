import type { NextPage } from 'next';
import { Checkout } from '../components/modules/Checkout/Checkout';
import { ConversionDisplay } from '../components/modules/ConversionDisplay/ConversionDisplay';
import { Footer } from '../components/modules/Footer';

const CheckoutPage: NextPage = () => {
  return (
    <div className="w-full sm:h-full flex flex-col justify-center items-center">
      <div className="w-full h-screen sm:h-full flex flex-col justify-center items-center">
        <Checkout />
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
