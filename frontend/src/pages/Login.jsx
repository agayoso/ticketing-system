import { useState } from 'react'
import API from '../api'
import { TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const nav = useNavigate()
  const [email,setEmail]=useState(''); const [password,setPassword]=useState('')

  const onSubmit = async (e)=>{
    e.preventDefault()
    try{
      const { data } = await API.post('/login', { email, password }) // Breeze API
      localStorage.setItem('authToken', data.token) // adjust if your login returns a different shape
      nav('/')
    }catch(e){ alert('Invalid credentials') }
  }

  return (
    <form onSubmit={onSubmit} style={{display:'grid', gap:12, maxWidth:360}}>
      <TextField label="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <TextField label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <Button type="submit" variant="contained">Sign in</Button>
    </form>
  )
}
