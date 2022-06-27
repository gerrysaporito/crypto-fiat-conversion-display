import { NextPage } from 'next';
import { useRouter } from 'next/router';

import useSWR from 'swr';
import PrintObject from '../components/ui/PrintObject';
import { fetchGetJSON } from '../utils/utility/api-helpers';

const ResultPage: NextPage = () => {
  const router = useRouter();
  console.log(router.query);

  // Fetch CheckoutSession from static page via
  // https://nextjs.org/docs/basic-features/data-fetching#static-generation
  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/v1/stripe/checkout_sessions/${router.query.session_id}`
      : null,
    fetchGetJSON
  );
  console.log(data, error);

  if (error) return <div>failed to load</div>;

  return (
    <div className="page-container">
      <h1>Checkout Payment Result</h1>
      <h2>Status: {data?.payment_intent?.status ?? 'loading...'}</h2>
      <h3>CheckoutSession response:</h3>
      <PrintObject content={data ?? 'loading...'} />
    </div>
  );
};

export default ResultPage;
