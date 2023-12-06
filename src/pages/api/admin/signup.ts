import { Admin } from "@/utils/model";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken';
import { adminsecretKey } from "@/utils/secretKeys";
import connectToDatabase from "@/utils/db";
import mongoose from "mongoose";
export default async function handler(req:NextApiRequest,res:NextApiResponse)
{
    await connectToDatabase();
    const { username, password } = req.body
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
        res.status(403).send({ message: "Admin already exist" })
    }
    else
    {
        const newAdmin = new Admin({username,password})
        await newAdmin.save()
        const token = jwt.sign({ username, role: 'admin' }, adminsecretKey, { expiresIn: '1h' })
        res.status(201).send({ message: "Admin Created successfully", token });
    }
}