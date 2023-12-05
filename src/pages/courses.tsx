import { CSSProperties, useEffect } from "react"
import { useState } from "react"

import { CircularProgress } from "@mui/material";
// import '../styles/showcourses.css'
import axios from "axios";
import { Course } from "@/store/atoms/course";
import { BASE_URL } from "@/config";
import { useRouter } from "next/router";

function Courses() {
    const [courses, setCourses] = useState([])
    useEffect(() => {
        const getCourses = async () => {
            const res = await axios.get(`${BASE_URL}/admin/courses`, {
                headers: {
                    'authorisation': 'bearer ' + localStorage.getItem('token')
                }
            })
            setCourses(res.data.courses)
        }
        getCourses()
    }, [])
    if (!courses) {
        return (
            <CircularProgress />
        )
    }
    else {
        return (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginTop: '5rem' }}>
                {
                    courses.map((course) => {
                        return (
                            <ShowCourse course={course}></ShowCourse>
                        )
                    })
                }
            </div>
        )
    }
}

export function ShowCourse({ course }: { course: Course }) {
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter()
    const cardStyle: CSSProperties = {
        width: 300,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        alignItems: 'center',
        transition: 'transform 0.3s'
    };
    const cardHoverStyle = {
        transform: 'scale(1.1)',
    };

    const textContentStyle: CSSProperties = {
        padding: '15px',
        position: 'absolute',
        zIndex: 10,
        bottom: '0', // Adjust bottom property when hovered
        transform: isHovered ? 'translateY(0)' : 'translateY(39%)', // Adjust the transform property
        backgroundColor: isHovered ? 'rgba(255,255,255,0.705)' : 'transparent', // Adjust background color when hovered
        width: '100%',
        transition: '0.3s',
    };

    return (
        <div
            style={{ ...cardStyle, ...(isHovered ? cardHoverStyle : {}), margin: '2rem' }}
            className="card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={()=>{router.push(`/coursedetails/${course._id}`)}}
        >
            <img
                src={course.imageLink}
                alt="Image"
                style={{
                    borderTopLeftRadius: '.5rem',
                    borderTopRightRadius: '.5rem',
                    width: '100%',
                }}
            />
            <div style={textContentStyle} >
                <div style={{ fontSize: '2rem', lineHeight: '2rem' }}>{course.title}</div>
                <div style={{ fontSize: '1rem', lineHeight: '1.25rem', paddingTop: '1rem' }} className="textchild">
                    {course.description}
                </div>
            </div>
        </div>
    );
}
export default Courses