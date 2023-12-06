import connectToDatabase from "@/utils/db"
import { Course } from "@/utils/model";
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req:NextApiRequest,res:NextApiResponse)
{
    await connectToDatabase()
    if(req.method=='PUT')
    {
        const course = await Course.findByIdAndUpdate(req.query.courseId, req.body, { new: true })
        if (course) {
            res.status(201).json({ message: "Course Updated successfully" });
        }
        else {
            res.status(404).json({ message: "Course Not Found" })
        }
        
    }
    else {
        const course = await Course.findById(req.query.courseId)
        if (course) {
            res.status(201).json({ course })
        }
        else {
            res.status(404).json({ 'message': 'Course Not Found' })
        }
    }
}