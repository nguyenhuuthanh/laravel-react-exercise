import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";

export default function Profile() {

  let {customId} = useParams();
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    phone: '',
    avatar: null,
  })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)

  if (customId) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/profile/${customId}`)
        .then(({data}) => {
          setLoading(false)
          setUser(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  return (
    <>
     <div className="profile">
        <h1>Profile User: {user.name}</h1>
        <div className="avatar">
              <img src={`http://localhost/storage/${user.avatar}`} alt={user.name} width="100px" height="auto" className="border rounded-circle"/>
            </div>
        <ol>
          <li>Phone: {user.phone}</li>
          <li>Email: {user.email}</li>
        </ol>
     </div>
    </>
  )
}
