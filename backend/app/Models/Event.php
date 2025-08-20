<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    public function ticketTypes(){ return $this->hasMany(TicketType::class); }
    public function orders(){ return $this->hasMany(Order::class); }

}
