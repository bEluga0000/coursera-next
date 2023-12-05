import { useSetRecoilState } from "recoil"
import { useRecoilValue } from "recoil"
import { CircularProgress,Button,Typography } from "@mui/material"
import { useRouter } from "next/navigation"
import { userState } from "@/store/atoms/user"
import { userEmailState } from "@/store/selectors/userEmail"
import { isUserLoading } from "@/store/selectors/isUserLoading"

function AppBar({}) {
    const router = useRouter()
    const setUser = useSetRecoilState(userState)
    const userEmail = useRecoilValue(userEmailState)
    const userLoading = useRecoilValue(isUserLoading)
    if (userLoading) {
        return <CircularProgress />
    }
    if (userEmail) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 5px'
            }}>
                <div style={{ marginLeft: 10, cursor: "pointer" }} onClick={() => {
                    router.push("/")
                }}>
                    <Typography variant={"h3"}>Coursera</Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                    {/* <Typography variant="h6">{username}</Typography> */}
                    <Button variant="outlined"
                        onClick={() => {
                            router.push('/addCourse')
                        }}>Add Course</Button>
                    <Button variant="outlined"
                        onClick={() => {
                            router.push('/courses')
                        }}>Courses</Button>
                    <Button variant="contained"
                        onClick={() => {
                            setUser({
                                isLoading: false,
                                userEmail: null
                            });
                            localStorage.setItem('token', ""); router.push('/')
                        }}>Logout</Button>
                </div>
            </div>
        )
    }
    else {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 5px'
            }}>
                <div style={{ marginLeft: 10, cursor: "pointer" }} onClick={() => {
                    router.push("/")
                }}>
                    <Typography variant={"h3"}>Coursera</Typography>
                </div>
                <div>
                    <Button
                        variant="contained"
                        style={{ marginRight: '5px' }}
                        onClick={() => { router.push("/signup") }}
                    >Sign Up
                    </Button>
                    <Button variant="contained"
                        onClick={() => { router.push('/signin') }}>Sign In</Button>
                </div>
            </div>
        )
    }
}
export default AppBar;