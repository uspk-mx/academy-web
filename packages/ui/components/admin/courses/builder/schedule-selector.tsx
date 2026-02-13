import { format } from "date-fns";
import { CalendarIcon, Clock, PenSquare, Trash2 } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { cn } from "ui/lib/utils";
import type { AppointmentPickerProps } from "ui/components/appointment-picker";
import { AppointmentPicker } from "ui/components/appointment-picker";
import { Button } from "ui/components/button";
import { Card, CardContent } from "ui/components/card";
import { Popover, PopoverContent, PopoverTrigger } from "ui/components/popover";
import { Switch } from "ui/components/switch";

interface ScheduledTime {
  date: Date;
  time: string;
}

type ScheduleSelectorProps = AppointmentPickerProps;

export function ScheduleSelector({
  date,
  setDate,
  time,
  setTime,
  timeSlots,
}: ScheduleSelectorProps): ReactNode {
  const [isScheduleEnabled, setIsScheduleEnabled] = useState(false);
  const [scheduledTime, setScheduledTime] = useState<ScheduledTime | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(date);
  const [tempTime, setTempTime] = useState<string | null>(time);

  const handleSchedule = (): void => {
    if (tempDate && tempTime) {
      setScheduledTime({ date: tempDate, time: tempTime });
      setDate(tempDate);
      setTime(tempTime);
      setIsScheduleEnabled(true);
      setIsEditing(false);
    }
  };

  const handleEdit = (): void => {
    if (scheduledTime) {
      setTempDate(scheduledTime.date);
      setTempTime(scheduledTime.time);
      setIsEditing(true);
    }
  };

  const handleDelete = (): void => {
    setScheduledTime(null);
    setDate(new Date());
    setTime("");
    setTempDate(new Date());
    setTempTime("");
    setIsScheduleEnabled(true);
    setIsEditing(true);
  };

  const handleCancel = (): void => {
    if (scheduledTime) {
      setTempDate(scheduledTime.date);
      setTempTime(scheduledTime.time);
      setIsEditing(false);
    } else {
      setIsScheduleEnabled(false);
      setIsEditing(false);
    }
  };

  const timeOptions = Array.from({ length: 24 * 4 }, (_, i) => {
    const hour = Math.floor(i / 4);
    const minute = (i % 4) * 15;
    const period = hour >= 12 ? "PM" : "AM";
    // eslint-disable-next-line no-nested-ternary -- required for correct display of 12:00 AM
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return {
      value: `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`,
      label: `${displayHour}:${minute.toString().padStart(2, "0")} ${period}`,
    };
  });

  return (
    <Card className="w-full max-w-md">
      <CardContent className="pt-6">
        <div
          className={cn(
            "flex justify-between items-center",
            isEditing && "mb-4"
          )}
        >
          <h2 className="font-semibold text-sm">Programado</h2>
          <Switch
            checked={isScheduleEnabled}
            onCheckedChange={(checked) => {
              setIsScheduleEnabled(checked);
              if (!checked) {
                setScheduledTime(null);
                setIsEditing(false);
              } else if (!scheduledTime) {
                setIsEditing(true);
              }
            }}
          />
        </div>

        {isScheduleEnabled && (isEditing || !scheduledTime) ? (
          <div className="space-y-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className={cn(
                    "w-full p-0 h-auto hover:bg-transparent",
                    !tempDate && "text-muted-foreground"
                  )}
                  variant="neutral"
                >
                  <div className="grid grid-cols-2 w-full">
                    <div className="flex items-center gap-2 px-3 py-2 border-r">
                      <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                      <span
                        className={cn(
                          "text-left font-normal",
                          !tempDate && "text-muted-foreground"
                        )}
                      >
                        {tempDate
                          ? format(tempDate, "MMM d, yyyy")
                          : "Select date"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span
                        className={cn(
                          "text-left font-normal",
                          !tempTime && "text-muted-foreground"
                        )}
                      >
                        {tempTime
                          ? format(
                              new Date(`2000/01/01 ${tempTime}`),
                              "hh:mm a"
                            )
                          : "hh:mm A"}
                      </span>
                    </div>
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-auto">
                <AppointmentPicker
                  date={tempDate}
                  setDate={setTempDate}
                  setTime={setTempTime}
                  time={tempTime}
                  timeSlots={timeSlots}
                />
              </PopoverContent>
            </Popover>

            <div className="flex justify-end gap-2">
              <Button onClick={handleCancel} variant="neutral">
                Cancel
              </Button>
              <Button
                disabled={!tempDate || !tempTime}
                onClick={handleSchedule}
              >
                Ok
              </Button>
            </div>
          </div>
        ) : null}

        {scheduledTime && !isEditing ? (
          <div className="flex flex-col items-start gap-2 w-full">
            <div className="flex justify-between items-center gap-2 mt-2 w-full">
              <span className="text-sm">Programado para</span>
              <div className="flex items-center gap-1">
                <Button
                  className="hover:bg-white p-0 w-8 h-8 text-gray-700 hover:text-blue-800"
                  onClick={handleEdit}
                  size="icon"
                  variant="ghost"
                >
                  <PenSquare className="w-4 h-4" />
                </Button>
                <Button
                  className="hover:bg-white p-0 w-8 h-8 text-gray-700 hover:text-blue-800"
                  onClick={handleDelete}
                  size="icon"
                  variant="ghost"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg w-full">
              <div className="flex justify-center items-center">
                <p className="text-center text-green-900 text-sm">
                  {format(scheduledTime.date, "MMM d, yyyy")} at{" "}
                  {format(
                    new Date(`2000/01/01 ${scheduledTime.time}`),
                    "hh:mm a"
                  )}
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
