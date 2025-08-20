<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Event;

class EventController extends Controller {
    public function index() {
        return Event::with('ticketTypes')->orderBy('starts_at')->get();
    }
    public function show(Event $event) {
        return $event->load('ticketTypes');
    }
}