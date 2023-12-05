import { useSetRecoilState } from "recoil"
import { useEffect } from "react"
import axios from "axios"
import { userState } from "@/store/atoms/user"
import { BASE_URL } from "@/config"
function InitUser()
{
  const setUser = useSetRecoilState(userState)
  useEffect(()=>{
    const init = async () => {
      try
      {
        const res = await axios.get(`${BASE_URL}/admin/me`,
          {
            headers: {
              'Content-Type': 'application/json',
              'authorisation': 'bearer ' + localStorage.getItem('token')
            }
          })
          if(res.data.username)
          {
            setUser({
              isLoading:false,
              userEmail:res.data.username
            })
          }
          else
          {
            setUser({
              isLoading:false,
              userEmail:null
            })
          }
      }catch(e)
      {
        setUser({
          isLoading:false,
          userEmail:null
        })
      }
    }
    init()
  },[])
  return<></>
}
export default InitUser