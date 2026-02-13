;

import { format } from "date-fns";
import type { ReactNode } from "react";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { ScrollArea } from "./scroll-area";

interface TimeSlot {
  time: string;
  available: boolean;
}

export interface AppointmentPickerProps {
  date: Date;
  setDate: (date: Date) => void;
  time: string | null;
  setTime: (time: string | null) => void;
  timeSlots: TimeSlot[];
}

export function AppointmentPicker({ date, setDate, time, setTime, timeSlots }: AppointmentPickerProps): ReactNode {
    const today = new Date();

    return (
      <div>
        <div className="border border-border rounded-lg">
          <div className="flex max-sm:flex-col">
            <Calendar
              className="p-2 sm:pe-5"
              disabled={[
                { before: today }, // Dates before today
              ]}
              mode="single"
              onSelect={(newDate) => {
                if (newDate) {
                  setDate(newDate);
                  setTime(null);
                }
              }}
              selected={date}
            />
            <div className="relative w-full sm:w-40 max-sm:h-48">
              <div className="absolute inset-0 py-4 max-sm:border-t border-border">
                <ScrollArea className="sm:border-s border-border h-full">
                  <div className="space-y-3">
                    <div className="flex items-center px-5 h-5 shrink-0">
                      <p className="font-medium text-sm">{format(date, "EEEE, d")}</p>
                    </div>
                    <div className="gap-1.5 grid max-sm:grid-cols-2 px-5">
                      {timeSlots.map(({ time: timeSlot, available }) => (
                        <Button
                          className="w-full"
                          disabled={!available}
                          key={timeSlot}
                          onClick={() => { setTime(timeSlot); }}
                          size="sm"
                          variant={time === timeSlot ? "default" : "neutral"}
                        >
                          {timeSlot}
                        </Button>
                      ))}
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}