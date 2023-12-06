import { authhandler } from "@/middleware/auth";
import connectToDatabase from "@/utils/db";
import { Course } from "@/utils/model";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    await connectToDatabase();
    authhandler(req,res)
    try{
    const course = new Course(req.body);
    await course.save();
    res.status(201).send({ message: "Course Added succesfully", courseId: course.id })
    }
    catch(err)
    {
        res.status(403).json({err})
    }
}