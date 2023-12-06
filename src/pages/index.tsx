import { userState } from "@/store/atoms/user";
import { userEmailState } from "@/store/selectors/userEmail";
import connectToDatabase from "@/utils/db";
import { Card,Typography,Button,Grid } from "@mui/material"
import { useRouter } from "next/router"
import { useRecoilValue } from "recoil";

export default function Home() {
  const router = useRouter();
  const username = useRecoilValue(userEmailState)
  connectToDatabase()
  return (
    <div>
      <Grid container style={{ padding: "5vw" }}>
        <Grid item xs={12} md={6} lg={6}>
          <div style={{ padding: '1rem', textAlign: 'center', marginTop: 85 }}>
            <Typography variant='h3'>Welcome to Coursa Admin Panel</Typography>
            <Typography variant='subtitle1'>Build Your Courses and Let people learn Form it</Typography>
            {
              username && <div>
                <Button variant='contained' size={'large'} style={{ margin: '.5rem' }} onClick={() => {
                  router.push('/courses')
                }}>Courses</Button>
                <Button variant='contained' size={'large'} onClick={() => {
                  router.push('/addCourse')
                }}>AddCourse</Button>
              </div>
            }
            {!username && <Subcontent></Subcontent>}
            
          </div>
        </Grid>
        <Grid item xs={12} md={6} lg={6} style={{ marginTop: 20 }}>
          <Card>
            <img src="https://img.freepik.com/free-vector/empty-classroom-interior-with-chalkboard_1308-65378.jpg" alt="Image" width={'100%'} />
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

function Subcontent() {
  const router = useRouter()
  return (
    <div >
      <Button variant='contained' size={'large'} style={{ margin: '.5rem' }} onClick={() => {
        router.push('/signin')
      }}>Signin</Button>
      <Button variant='contained' size={'large'} onClick={() => {
        router.push('/signup')
      }}>SignUp</Button>
    </div>
  )
}
