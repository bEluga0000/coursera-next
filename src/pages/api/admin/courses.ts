import { authhandler } from "@/middleware/auth";
import { Course } from "@/utils/model";
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
export default async function (req: NextApiRequest, res: NextApiResponse) {
    await authhandler(req,res)
    const courses = await Course.find();
    if (courses) {
        res.status(201).json({ courses });
    }
    else {
        res.status(403).json({ message: "No courses are added" })
    }
}