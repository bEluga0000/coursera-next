import { adminsecretKey } from "@/utils/secretKeys";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken'
// import connectToDatabase from "@/utils/db";
export async function authhandler(req:NextApiRequest,res:NextApiResponse)
{
    // await connectToDatabase()
    const authHeader = req.headers.authorization;
    if (authHeader){
        if (Array.isArray(authHeader)) {
            return res.status(403).json({ msg: 'Invalid authorization header' });
        }
        const token = authHeader.split(" ")[1];
        jwt.verify(token, adminsecretKey, (err:any, admin:any) => {
            if (err) {
                return res.status(403).json({error:err});
            }
            else {
                req.headers['admin'] = admin.username
                // console.log(admin)
            }
        })
    }
    else
    {return res.status(401).json({message:'Unauthorised'})}

}