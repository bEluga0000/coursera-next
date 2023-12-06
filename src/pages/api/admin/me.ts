import { authhandler } from "@/middleware/auth"
import { User } from "@/utils/model"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req:NextApiRequest,res:NextApiResponse)
{
   await authhandler(req,res)
   const admin = req.headers['admin']
   if(!admin)
   {
      res.status(403).json({ mssg: 'ADmin Doest exist' })
   }
   else
   {
      
      if (Array.isArray(admin)) {
         return res.status(403).json({ msg: 'Invalid user' });
      }
      else {
         res.status(201).send({ username: admin })
      }
   }
   
   
}