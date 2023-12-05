import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { useState } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userState } from "@/store/atoms/user";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/config";
function SignUp() {
    const router = useRouter()
    const [username, setUsername] = useState<string | undefined>()
    const [password, setPassword] = useState<string | undefined>()
    const [errMsg, setErrMsg] = useState<boolean>(false)
    const setUser = useSetRecoilState(userState)
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                alignItems: "center",
                justifyContent: "center",
                marginTop: '5rem'
            }}>
            <Typography variant="h5">Welcome To App Please SignUp</Typography>
            <Card
                variant="outlined"
                style={{
                    padding: "4rem",
                    border: "1px solid black",
                    borderRadius: "1rem",
                }}
            >
                <div
                    style={{ display: "flex", flexDirection: "column", gap: ".01rem" }}
                >
                    <TextField
                        id="username"
                        label="User Name"
                        variant="outlined"
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                    />
                    <br />
                    <TextField
                        type={'password'}
                        id="password"
                        label="Password"
                        variant="outlined"
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <br />
                    <Button variant="contained"
                        onClick={async () => {
                            if (username == undefined || password == undefined || username.trim().length === 0 || password.trim().length === 0 ) {
                                setErrMsg(true)
                            }
                            else {
                                const res = await axios.post(`${BASE_URL}/admin/signup`, {
                                    username,
                                    password
                                })
                                const token = res.data.token
                                localStorage.setItem('token', token)
                                setUser({
                                    isLoading: false,
                                    userEmail: username
                                })
                                router.push('/courses')
                            }
                        }}
                    >Sign Up</Button>
                </div>
                {errMsg && <Typography variant="h5" style={{ background: ' rgba(255, 0, 0, 0.5)', marginTop: '1rem', padding: '5px' }}>Please enter all the fields</Typography>}
            </Card>
        </div>
    );
}

export default SignUp;
