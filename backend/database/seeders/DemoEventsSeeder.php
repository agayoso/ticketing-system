<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\TicketType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DemoEventsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $events = [
            ['title' => 'Rock Night', 'description' => 'Live rock bands', 'starts_at' => now()->addDays(7), 'venue' => 'City Arena'],
            ['title' => 'Tech Conference', 'description' => 'Talks & workshops', 'starts_at' => now()->addDays(14), 'venue' => 'Expo Center'],
            ['title' => 'Classical Evening', 'description' => 'Orchestra live', 'starts_at' => now()->addDays(21), 'venue' => 'Grand Theater'],
        ];

        $types = [
            ['name' => 'VIP',        'price' => 150, 'capacity' => 100],
            ['name' => 'Field',      'price' => 80,  'capacity' => 500],
            ['name' => 'Stall',      'price' => 60,  'capacity' => 300],
            ['name' => 'Preference', 'price' => 40,  'capacity' => 400],
        ];

        foreach ($events as $e) {
            $event = Event::create($e);
            foreach ($types as $t) {
                TicketType::create($t + ['event_id' => $event->id]);
            }
        }
    }
}
