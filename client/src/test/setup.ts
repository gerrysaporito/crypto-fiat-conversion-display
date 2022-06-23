import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { createRequest, createResponse, RequestOptions } from 'node-mocks-http';

type TApiRequest = NextApiRequest & ReturnType<typeof createRequest>;
type TAPiResponse = NextApiResponse & ReturnType<typeof createResponse>;

/*
 * Test helper function used to simulate api events.
 * Used to test API endpoints.
 */
export const testHandler = async (
  handler: NextApiHandler,
  options: RequestOptions
) => {
  const req = createRequest<TApiRequest>(options);
  const res = createResponse<TAPiResponse>();

  await handler(req, res);
  return res;
};
