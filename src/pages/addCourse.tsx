import {Card,Typography,Button,TextField} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/config";
import { useRouter } from "next/router";
// import { useState } from "react";
function AddCourse() {
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [image, setImage] = useState<string>("")
    const [price, setPrice] = useState<number|null>(null)
    const [published] = useState<boolean>(true)
    const router = useRouter()
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "center",
            justifyContent: "center",
            marginTop: '5rem'
        }}>
            <Typography variant="h4" textAlign={'center'}>Add Course</Typography>
            <Card
                variant="outlined"
                style={{
                    padding: "4rem",
                    border: "1px solid black",
                    borderRadius: "1rem",
                }}
            >
                <div
                    style={{ display: "flex", flexDirection: "column", gap: ".1rem" }}
                >
                    <TextField
                        label="Title"
                        variant="outlined"
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                    <br />
                    <TextField
                        label="Description"
                        variant="outlined"
                        onChange={(e) => { setDescription(e.target.value) }}
                    />
                    <br />
                    <TextField
                        label="Image Lnk"
                        variant="outlined"
                        onChange={(e) => { setImage(e.target.value) }}
                    />
                    <br />
                    <TextField
                        label="Price"
                        variant="outlined"
                        onChange={(e) => { setPrice(parseInt(e.target.value)) }}
                    />
                    <br />
                    <Button variant="contained"
                        onClick={async () => {
                            await axios.post(`${BASE_URL}/api/admin/addcourse`, {
                                title,
                                description,
                                imageLink: image,
                                price,
                                published
                            },
                                {
                                    headers: {
                                        'authorization': localStorage.getItem('token')
                                    }
                                })
                                router.push('/courses')
                        }}
                    >Add Course</Button>
                </div>
            </Card>
        </div>
    )
}

export default AddCourse;
