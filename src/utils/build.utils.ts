import { Request } from 'express';

export const buildUrl = async (req : Request , subpath : string) =>
    req.protocol + '://' + req.get('host') + req.baseUrl + '/' + subpath;
  
export const toList = async (data : any) => ({ data: data });