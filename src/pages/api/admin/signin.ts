import { Admin } from "@/utils/model";
import { NextApiRequest, NextApiResponse } from "next";
import  jwt from "jsonwebtoken";
import { adminsecretKey } from "@/utils/secretKeys";
import connectToDatabase from "@/utils/db";
export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    await connectToDatabase()
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username, password });
    if (admin) {
        const token = jwt.sign({ username, role: 'admin' }, adminsecretKey, { expiresIn: '1h' });
        res.status(201).json({ message: "Logged in successfully", token })
    }
    else {
        res.status(404).send({ message: "Amin not Found" })
    }
}