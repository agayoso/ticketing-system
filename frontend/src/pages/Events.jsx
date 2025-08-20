import { useEffect, useState } from 'react'
import API from '../api'
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Events(){
  const [events, setEvents] = useState([])
  useEffect(()=>{ API.get('/events').then(r=>setEvents(r.data)) },[])
  return (
    <div style={{display:'grid', gap:16, gridTemplateColumns:'repeat(auto-fill, minmax(280px,1fr))'}}>
      {events.map(e=>(
        <Card key={e.id}>
          <CardContent>
            <Typography variant="h6">{e.title}</Typography>
            <Typography variant="body2">{new Date(e.starts_at).toLocaleString()}</Typography>
            <Typography variant="body2" color="text.secondary">{e.venue}</Typography>
          </CardContent>
          <CardActions>
            <Button component={Link} to={`/events/${e.id}`} size="small">View details</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  )
}
