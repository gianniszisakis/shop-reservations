"use client";

import { CalendarIcon, Clock3 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface BookingDateTimeProps {
  date?: Date;
  time: string;
  onDateChange: (date: Date | undefined) => void;
  onTimeChange: (time: string) => void;
}

export default function BookingDateTime({
  date,
  time,
  onDateChange,
  onTimeChange,
}: BookingDateTimeProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {/* Date */}
      <div className="space-y-2">
        <Label htmlFor="booking-date">Ημερομηνία</Label>

        <Popover>
          <PopoverTrigger
            render={
              <Button
                id="booking-date"
                type="button"
                variant="outline"
                className="h-12 w-full justify-start rounded-xl px-4 text-left font-normal"
              />
            }
          >
            <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />

            {date
              ? new Intl.DateTimeFormat("el-GR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                }).format(date)
              : "Επιλέξτε ημερομηνία"}
          </PopoverTrigger>

          <PopoverContent align="start" className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={onDateChange}
              disabled={{
                before: new Date(),
              }}
              //initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Time */}
      <div className="space-y-2">
        <Label htmlFor="booking-time">Ώρα</Label>

        <div className="relative">
          <Clock3 className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            id="booking-time"
            type="time"
            value={time}
            onChange={(event) => onTimeChange(event.target.value)}
            className="h-12 rounded-xl pl-11"
          />
        </div>
      </div>
    </div>
  );
}
