import { Response, NextFunction, Request } from 'express';

type RequestInputs = {
  params?: Record<string, string>;
  query?: Record<string, string>;
  body?: any;
};

export function mockRequestInputs(inputs: RequestInputs): Request {
  const req = {} as unknown as Request;
  req.params = inputs.params ? inputs.params : {};
  req.query = inputs.query ? inputs.query : {};
  req.body = inputs.body ? inputs.body : undefined;
  return req;
}

export const mockResponse = () => {
  const res = {} as unknown as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.setHeader = jest.fn();
  return res;
};

export const mockNextFunction = (res: Response): NextFunction => {
  return (error: any): void => {
    res.status(error?.status || 500);
  };
};
