import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function UserForm() {
  const navigate = useNavigate();
  let {id} = useParams();
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    phone: '',
    password: '',
    avatar: null,
    password_confirmation: ''
  })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)

  const {setNotification} = useStateContext()

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/users/${id}`)
        .then(({data}) => {
          setLoading(false)
          setUser(data)
          setUserImage(data.user.avatar);
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = ev => {
    ev.preventDefault()
    if (user.id) {
      const formData = new FormData();

      for( var key in user ) {
          formData.append(key, user[key])
      }
      formData.append('_method', 'patch')

      axiosClient.post(`/users/${user.id}`, formData, {headers: {
        'Content-Type': 'multipart/form-data',
      }})
        .then(() => {
          setNotification('User was successfully updated')
          navigate('/users')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    } else {
      axiosClient.post('/users', user)
        .then(() => {
          setNotification('User was successfully created')
          navigate('/users')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }
  }

  return (
    <>
      {user.id && <h1>Update User: {user.name}</h1>}
      {!user.id && <h1>New User</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
        {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading && (
          <form onSubmit={onSubmit} enctype="multipart/form-data">
            <input value={user.name} onChange={ev => setUser({...user, name: ev.target.value})} placeholder="Name"/>
            <input value={user.email} onChange={ev => setUser({...user, email: ev.target.value})} placeholder="Email"/>
            <input value={user.phone} onChange={ev => setUser({...user, phone: ev.target.value})} placeholder="Phone"/>
            <input type="password" onChange={ev => setUser({...user, password: ev.target.value})} placeholder="Password"/>
            <input type="password" onChange={ev => setUser({...user, password_confirmation: ev.target.value})} placeholder="Password Confirmation"/>
            <input id="uploadBtn" type="file" label="Avatar" name="avatar" onChange={ev => setUser({...user, avatar: ev.target.files[0]})} className="form-control"/>
            <div className="avatar">
              <img src={`http://localhost/storage/${user.avatar}`} alt={user.name} width="100px" height="auto" className="border rounded-circle"/>
            </div>
            <button className="btn">Save</button>
          </form>
        )}
        <div className="profileLink">
          <Link target={'_blank'} className="btn-add" to={'/profile/' + user.custom_id}>Profile Link</Link>
        </div>

      </div>
    </>
  )
}
