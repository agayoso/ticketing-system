<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Event;
use App\Models\OrderItem;
use App\Models\TicketType;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class OrderController extends Controller {
    public function store(Request $request, Event $event) {
        $data = $request->validate([
            'items' => ['required','array','min:1'],
            'items.*.ticket_type_id' => [
                'required','integer',
                Rule::exists('ticket_types','id')->where('event_id', $event->id)
            ],
            'items.*.quantity' => ['required','integer','min:1']
        ]);

        return DB::transaction(function() use ($data, $event) {
            $total = 0;
            $lineItems = [];

            foreach ($data['items'] as $item) {
                $tt = TicketType::lockForUpdate()->find($item['ticket_type_id']);
                // Calculate already sold
                $sold = OrderItem::where('ticket_type_id', $tt->id)->sum('quantity');
                $available = $tt->capacity - $sold;
                abort_if($item['quantity'] > $available, 400, "Insufficient tickets for {$tt->name}");

                $total += $tt->price * $item['quantity'];
                $lineItems[] = ['tt' => $tt, 'qty' => $item['quantity']];
            }

            $order = Order::create([
                'user_id' => auth()->id(),
                'event_id' => $event->id,
                'total_amount' => $total,
                'status' => 'paid', // simulated payment
            ]);

            foreach ($lineItems as $li) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'ticket_type_id' => $li['tt']->id,
                    'quantity' => $li['qty'],
                    'unit_price' => $li['tt']->price,
                ]);
            }

            return response()->json([
                'message' => 'Order confirmed (payment simulated).',
                'order_id' => $order->id,
                'total' => $total
            ]);
        });
    }
}