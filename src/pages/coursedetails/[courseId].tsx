import { Card, TextField, Button, Typography, Grid } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { BASE_URL } from "@/config";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { courseState } from "@/store/atoms/course";
import { courseImage, coursePrice, courseTitle, isCourseLoading } from "@/store/selectors/course";
import { useRouter } from "next/router";

function CourseDetail() {
    const router = useRouter()
    let { courseId } = router.query;
    const setCourse = useSetRecoilState(courseState)
    const courseLoading = useRecoilValue(isCourseLoading)
    useEffect(() => {
        const getCourseDetails = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/admin/course/${courseId}`, {
                    method:'GET',
                    headers: {
                        'authorization':localStorage.getItem('token')
                    }
                })
                if (res.data.course) {
                    setCourse({
                        isLoading: false,
                        course: res.data.course
                    })
                }
                else {
                    setCourse({
                        isLoading: false,
                        course: null
                    })
                }
            }
            catch (e) {
                setCourse({
                    isLoading: false,
                    course: null
                })
            }

        }
        getCourseDetails()
    }, [courseId])
    if (courseLoading) {
        return (
            <CircularProgress />
        )
    }
    return (
        <div>
            <GrayTopper />
            <Grid container>
                <Grid item lg={4} md={12} sm={12}>
                    <UpdateCourse />
                </Grid>
                <Grid item lg={4} md={12} sm={12}>
                    <CourseCard />
                </Grid>
            </Grid>
        </div>
    )
}

function GrayTopper() {
    const title = useRecoilValue(courseTitle);
    return <div style={{ height: 250, background: "#212121", top: 0, width: "100vw", zIndex: 0, marginBottom: -250 }}>
        <div style={{ height: 250, display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <div>
                <Typography style={{ color: "white", fontWeight: 600 }} variant="h3" textAlign={"center"}>
                    {title && title}
                    {!title && "NO Ttitle"}
                    
                </Typography>
            </div>
        </div>
    </div>
}

function UpdateCourse() {
    const [courseDetails, setCourse] = useRecoilState(courseState)
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [courseid,setCourseId] =useState('') 
    useEffect(() => {
        if (courseDetails.course) {
            setTitle(courseDetails.course.title);
            setDescription(courseDetails.course.description);
            setImage(courseDetails.course.imageLink);
            setPrice(courseDetails.course.price);
            setCourseId(courseDetails.course._id)
        }
    }, [courseDetails]);
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Card variant="outlined" style={{ maxWidth: 600, marginTop: 200 }}>
                <div style={{ padding: 20 }}>
                    <TextField value={title} label="Title" variant="outlined" onChange={(e) => { setTitle(e.target.value) }}
                        style={{ marginBottom: 10 }}
                        fullWidth={true} />
                    <TextField label="Description" variant="outlined" onChange={(e) => { setDescription(e.target.value) }} value={description}
                        style={{ marginBottom: 10 }}
                        fullWidth={true} />
                    <TextField label="Image Link" variant="outlined" onChange={(e) => { setImage(e.target.value) }} value={image}
                        style={{ marginBottom: 10 }}
                        fullWidth={true} />
                    <TextField label="Price" variant="outlined" onChange={(e) => { setPrice(e.target.value) }} value={price}
                        style={{ marginBottom: 10 }}
                        fullWidth={true} />
                    <Button variant="contained"
                        onClick={async () => {
                            axios.put(`${BASE_URL}/api/admin/course/${courseid}` ,
                                {
                                    title: title,
                                    description: description,
                                    imageLink: image,
                                    price,
                                    published: true
                                },
                                {
                                    headers: {
                                        'authorisation': localStorage.getItem('token')
                                    }
                                }

                            )
                            let updateCourse = {
                                _id:  courseid,
                                title: title,
                                description: description,
                                imageLink: image,
                                price
                            }
                            setCourse({
                                isLoading: false,
                                course: updateCourse
                            })
                        }}
                    >Update Course</Button>
                </div>
            </Card>
        </div>
    )
}
function CourseCard() {
    const title = useRecoilValue(courseTitle)
    const price = useRecoilValue(coursePrice)
    const image = useRecoilValue(courseImage)
    return (
        <div style={{ display: "flex", marginTop: 50, justifyContent: "center", width: "100%" }}>
            <Card style={{
                margin: 10,
                width: 350,
                minHeight: 200,
                borderRadius: 20,
                marginRight: 50,
                paddingBottom: 15,
                zIndex: 2
            }}>
                <img src={image} alt="Image" style={{ width: 350 }} />
                <div style={{ marginLeft: 10 }}>
                    <Typography variant="h5">{title}</Typography>
                    <Price />
                </div>

            </Card>
        </div>
    )
}
function Price() {
    const price = useRecoilValue(coursePrice)
    return <>
        <Typography variant="subtitle2" style={{ color: "gray" }}>
            Price
        </Typography>
        <Typography variant="subtitle1">
            <b>Rs {price} </b>
        </Typography>

    </>
}
export default CourseDetail