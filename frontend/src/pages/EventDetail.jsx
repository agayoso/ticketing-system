import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import API from '../api'
import { Button, Typography, TextField } from '@mui/material'

export default function EventDetail(){
  const { id } = useParams()
  const nav = useNavigate()
  const [event, setEvent] = useState(null)
  const [qty, setQty] = useState({}) //{ ticketTypeId: number }

  useEffect(()=>{ API.get(`/events/${id}`).then(r=>setEvent(r.data)) },[id])

  const buy = async ()=>{
    const items = Object.entries(qty)
      .filter(([_,q]) => Number(q) > 0)
      .map(([ticket_type_id, quantity]) => ({ ticket_type_id:Number(ticket_type_id), quantity:Number(quantity) }))
    if(items.length===0){ alert('Select at least one ticket.'); return }
    try{
      const { data } = await API.post(`/events/${id}/orders`, { items })
      alert(`Success! Order #${data.order_id} • Total: $${data.total}`)
      nav('/')
    }catch(e){
      alert(e.response?.data?.message || 'Purchase failed')
    }
  }

  if(!event) return <p>Loading…</p>
  return (
    <div style={{display:'grid', gap:12}}>
      <Typography variant="h5">{event.title}</Typography>
      <Typography>{new Date(event.starts_at).toLocaleString()} — {event.venue}</Typography>
      <Typography color="text.secondary">{event.description}</Typography>

      {event.ticket_types?.map(tt=>(
        <div key={tt.id} style={{display:'flex', alignItems:'center', gap:12}}>
          <div style={{minWidth:180}}><b>{tt.name}</b> — ${tt.price}</div>
          <TextField
            type="number" size="small" label="Qty"
            inputProps={{ min:0 }}
            value={qty[tt.id] ?? 0}
            onChange={e=>setQty({...qty, [tt.id]: e.target.value})}
          />
        </div>
      ))}

      <Button variant="contained" onClick={buy}>Buy (payment simulated)</Button>
    </div>
  )
}
