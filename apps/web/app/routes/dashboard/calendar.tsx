import { useState } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Video,
  User,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Filter,
  Plus,
  ExternalLink,
} from "lucide-react";
import { Button } from "ui/components/button";

// Mock data
const mockCourses = [
  { id: 1, name: "Advanced React", unlocked: true, progress: 75 },
  { id: 2, name: "Node.js Masterclass", unlocked: true, progress: 60 },
  { id: 3, name: "UI/UX Design", unlocked: false, progress: 30 },
];

const mockInstructors = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "👩‍🏫",
    specialties: ["React", "TypeScript"],
    availability: ["2026-02-10", "2026-02-12", "2026-02-15"],
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "👨‍💻",
    specialties: ["Node.js", "MongoDB"],
    availability: ["2026-02-11", "2026-02-13", "2026-02-16"],
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    avatar: "👩‍🎨",
    specialties: ["UI/UX", "Figma"],
    availability: ["2026-02-10", "2026-02-14", "2026-02-17"],
  },
];

const mockScheduledClasses = [
  {
    id: 1,
    title: "React Hooks Deep Dive",
    instructor: "Sarah Johnson",
    date: "2026-02-10",
    time: "10:00 AM",
    duration: "1 hour",
    status: "confirmed",
    meetingUrl: "https://meet.google.com/abc-defg-hij",
    courseId: 1,
  },
  {
    id: 2,
    title: "Node.js Best Practices",
    instructor: "Michael Chen",
    date: "2026-02-13",
    time: "2:00 PM",
    duration: "1 hour",
    status: "pending",
    courseId: 2,
  },
  {
    id: 3,
    title: "Advanced React Patterns",
    instructor: "Sarah Johnson",
    date: "2025-02-15",
    time: "11:00 AM",
    duration: "1.5 hours",
    status: "confirmed",
    meetingUrl: "https://meet.google.com/xyz-uvwx-rst",
    courseId: 1,
  },
];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 8)); 
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [selectedInstructor, setSelectedInstructor] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString("es-MX", { month: "long", year: "numeric" });
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const isDateAvailable = (date: Date) => {
    const dateStr = formatDate(date);
    return mockInstructors.some((inst) => inst.availability.includes(dateStr));
  };

  const hasScheduledClass = (date: Date) => {
    const dateStr = formatDate(date);
    return mockScheduledClasses.some((cls) => cls.date === dateStr);
  };

  const isToday = (date: Date) => {
    const today = new Date(2025, 1, 8); // Current date in mock
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isPast = (date: Date) => {
    const today = new Date(2025, 1, 8);
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleDateClick = (date: Date) => {
    if (isPast(date)) return;
    if (!isDateAvailable(date)) return;
    setSelectedDate(date);
    setIsBookingModalOpen(true);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleBookClass = async () => {
    // TODO: integrate with Cal.com API
    console.log("Booking class:", {
      date: selectedDate,
      course: selectedCourse,
      instructor: selectedInstructor,
      time: selectedTime,
    });
    setIsBookingModalOpen(false);
    // Reset selections
    setSelectedDate(null);
    setSelectedCourse(null);
    setSelectedInstructor(null);
    setSelectedTime("");

    //   // 1. Create event in Cal.com
    //   const calEvent = await fetch('https://api.cal.com/v1/bookings', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       eventTypeId: instructor.calEventTypeId,
    //       start: `${selectedDate}T${selectedTime}`,
    //       responses: {
    //         name: user.name,
    //         email: user.email,
    //         courseId: selectedCourse,
    //       }
    //     })
    //   });

    //   // 2. Save to your DB
    //   await createLiveClass({
    //     userId: user.id,
    //     courseId: selectedCourse,
    //     instructorId: selectedInstructor,
    //     date: selectedDate,
    //     time: selectedTime,
    //     status: 'pending', // Changes to 'confirmed' when instructor accepts
    //     calBookingId: calEvent.id,
    //   });

    //   // 3. Send notifications
    //   await sendNotification(instructor.id, {
    //     type: 'booking_request',
    //     studentName: user.name,
    //     course: courseName,
    //     datetime: `${selectedDate} ${selectedTime}`,
    //   });
  };

  

  // Generate calendar days
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const calendarDays = [];

  // Add empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  // Add actual days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    );
  }

  const unlockedCourses = mockCourses.filter((c) => c.unlocked);
  const upcomingClasses = mockScheduledClasses.filter(
    (cls) => new Date(cls.date) >= new Date(2025, 1, 8)
  )

 return (
   <div className="min-h-screen bg-bg p-6">
     <div className="mx-auto max-w-7xl space-y-6">
       {/* Header */}
       <div className="relative">
         <div className="relative rounded-xl border-4 border-black bg-card p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
           <div className="flex items-center justify-between">
             <div className="flex items-center gap-4">
               <div className="rounded-lg border-4 border-black bg-chart-1 p-2">
                 <CalendarIcon
                   className="h-8 w-8 fill-white stroke-white"
                   strokeWidth={2.5}
                 />
               </div>
               <div>
                 <h1 className="text-3xl font-black">Calendario de Clases</h1>
                 <p className="text-sm text-muted-foreground">
                   Agenda clases en vivo con tus instructores
                 </p>
               </div>
             </div>
           </div>
         </div>
       </div>

       {/* Stats */}
       <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
         {[
           {
             label: "Próximas Clases",
             value: upcomingClasses.length,
             icon: CalendarIcon,
             color: "bg-chart-4/20",
           },
           {
             label: "Confirmadas",
             value: upcomingClasses.filter((c) => c.status === "confirmed")
               .length,
             icon: CheckCircle2,
             color: "bg-chart-2/20",
           },
           {
             label: "Pendientes",
             value: upcomingClasses.filter((c) => c.status === "pending")
               .length,
             icon: AlertCircle,
             color: "bg-chart-3/20",
           },
           {
             label: "Cursos Desbloqueados",
             value: unlockedCourses.length,
             icon: Video,
             color: "bg-chart-1/20",
           },
         ].map((stat) => (
           <div
             key={stat.label}
             className="flex items-center gap-3 rounded-xl border-4 border-black bg-card p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
           >
             <div
               className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-black ${stat.color}`}
             >
               <stat.icon className="h-5 w-5" strokeWidth={2.5} />
             </div>
             <div className="min-w-0">
               <p className="text-2xl font-black tabular-nums leading-none">
                 {stat.value}
               </p>
               <p className="truncate text-xs font-bold text-muted-foreground">
                 {stat.label}
               </p>
             </div>
           </div>
         ))}
       </div>

       <div className="grid gap-6 lg:grid-cols-3">
         {/* Calendar - 2 columns */}
         <div className="space-y-6 lg:col-span-2">
           {/* Calendar Header */}
           <div className="overflow-hidden rounded-xl border-4 border-black bg-card shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
             <div className="flex items-center justify-between border-b-4 border-black bg-main p-4">
               <button
                 type="button"
                 onClick={handlePrevMonth}
                 className="rounded-lg border-2 border-black bg-card p-2 hover:bg-main"
               >
                 <ChevronLeft className="h-5 w-5" />
               </button>
               <h2 className="text-2xl font-black capitalize">
                 {formatMonthYear(currentDate)}
               </h2>
               <button
                 type="button"
                 onClick={handleNextMonth}
                 className="rounded-lg border-2 border-black bg-card p-2 hover:bg-main"
               >
                 <ChevronRight className="h-5 w-5" />
               </button>
             </div>

             {/* Calendar Grid */}
             <div className="p-4">
               {/* Day names */}
               <div className="mb-2 grid grid-cols-7 gap-2">
                 {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map(
                   (day) => (
                     <div
                       key={day}
                       className="text-center text-sm font-bold text-muted-foreground"
                     >
                       {day}
                     </div>
                   ),
                 )}
               </div>

               {/* Days */}
               <div className="grid grid-cols-7 gap-2">
                 {calendarDays.map((date, index) => {
                   if (!date) {
                     return <div key={`empty-${index}`} />;
                   }

                   const available = isDateAvailable(date);
                   const scheduled = hasScheduledClass(date);
                   const past = isPast(date);
                   const today = isToday(date);

                   return (
                     <button
                       key={index}
                       type="button"
                       onClick={() => handleDateClick(date)}
                       disabled={past || !available}
                       className={`relative aspect-square rounded-lg border-2 border-black p-2 text-center font-bold transition-all ${
                         today
                           ? "border-4 border-chart-1 bg-chart-1/20"
                           : scheduled
                             ? "bg-chart-2/20"
                             : available && !past
                               ? "bg-main hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                               : past
                                 ? "cursor-not-allowed bg-muted text-muted-foreground"
                                 : "cursor-not-allowed bg-card"
                       }`}
                     >
                       <span className="text-sm">{date.getDate()}</span>
                       {scheduled && (
                         <div className="absolute bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-chart-2" />
                       )}
                       {available && !scheduled && !past && (
                         <div className="absolute bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-chart-4" />
                       )}
                     </button>
                   );
                 })}
               </div>
             </div>

             {/* Legend */}
             <div className="flex flex-wrap gap-4 border-t-4 border-black bg-muted p-4 text-sm">
               <div className="flex items-center gap-2">
                 <div className="h-3 w-3 rounded-full border-2 border-black bg-chart-2" />
                 <span className="font-bold">Clase Agendada</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="h-3 w-3 rounded-full border-2 border-black bg-chart-4" />
                 <span className="font-bold">Disponible</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="h-3 w-3 rounded-full border-2 border-black bg-muted" />
                 <span className="font-bold">No Disponible</span>
               </div>
             </div>
           </div>
         </div>

         {/* Sidebar - 1 column */}
         <div className="space-y-6">
           {/* Upcoming Classes */}
           <div className="overflow-hidden rounded-xl border-4 border-black bg-card shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
             <div className="border-b-4 border-black bg-chart-2 p-4">
               <h2 className="font-black">Próximas Clases</h2>
             </div>
             <div className="max-h-96 space-y-3 overflow-y-auto p-4">
               {upcomingClasses.length === 0 ? (
                 <div className="py-8 text-center">
                   <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                   <p className="mt-2 font-bold text-muted-foreground">
                     No hay clases agendadas
                   </p>
                 </div>
               ) : (
                 upcomingClasses.map((cls) => (
                   <div
                     key={cls.id}
                     className="rounded-lg border-2 border-black bg-main p-3 space-y-2"
                   >
                     <div className="flex items-start justify-between">
                       <div className="flex-1">
                         <h3 className="font-bold leading-tight">
                           {cls.title}
                         </h3>
                         <p className="text-xs text-muted-foreground">
                           {cls.instructor}
                         </p>
                       </div>
                       <div
                         className={`rounded-full border-2 border-black px-2 py-1 text-xs font-bold ${
                           cls.status === "confirmed"
                             ? "bg-chart-2 text-white"
                             : "bg-chart-3"
                         }`}
                       >
                         {cls.status === "confirmed" ? "✓" : "⏳"}
                       </div>
                     </div>
                     <div className="flex items-center gap-2 text-xs font-bold">
                       <CalendarIcon className="h-3 w-3" />
                       <span>
                         {new Date(cls.date).toLocaleDateString("es-MX", {
                           month: "short",
                           day: "numeric",
                         })}
                       </span>
                       <Clock className="ml-2 h-3 w-3" />
                       <span>{cls.time}</span>
                     </div>
                     {cls.meetingUrl && (
                       <a
                         href={cls.meetingUrl}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="flex items-center gap-1 text-xs font-bold text-chart-1 hover:underline"
                       >
                         <ExternalLink className="h-3 w-3" />
                         Unirse a la clase
                       </a>
                     )}
                   </div>
                 ))
               )}
             </div>
           </div>

           {/* Available Instructors */}
           <div className="overflow-hidden rounded-xl border-4 border-black bg-card shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
             <div className="border-b-4 border-black bg-chart-4 p-4">
               <h2 className="font-black">Instructores Disponibles</h2>
             </div>
             <div className="space-y-3 p-4">
               {mockInstructors.map((instructor) => (
                 <div
                   key={instructor.id}
                   className="rounded-lg border-2 border-black bg-card p-3"
                 >
                   <div className="flex items-center gap-3">
                     <div className="text-3xl">{instructor.avatar}</div>
                     <div className="flex-1">
                       <p className="font-bold">{instructor.name}</p>
                       <p className="text-xs text-muted-foreground">
                         {instructor.specialties.join(", ")}
                       </p>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
           </div>
         </div>
       </div>

       {/* Booking Modal */}
       {isBookingModalOpen && selectedDate && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
           <div className="relative w-full max-w-2xl">
             <div className="absolute inset-0 rotate-1 rounded-xl border-4 border-black bg-main" />
             <div className="relative rounded-xl border-4 border-black bg-card shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
               <div className="border-b-4 border-black bg-main p-6">
                 <h2 className="text-2xl font-black">Agendar Clase en Vivo</h2>
                 <p className="text-sm font-bold">
                   {selectedDate.toLocaleDateString("es-MX", {
                     weekday: "long",
                     year: "numeric",
                     month: "long",
                     day: "numeric",
                   })}
                 </p>
               </div>

               <div className="space-y-6 p-6">
                 {/* Course Selection */}
                 <div>
                   <label className="mb-2 block text-sm font-bold">
                     Selecciona el Curso
                   </label>
                   <div className="space-y-2">
                     {unlockedCourses.map((course) => (
                       <button
                         key={course.id}
                         type="button"
                         onClick={() => setSelectedCourse(course.id)}
                         className={`w-full rounded-lg border-4 border-black p-4 text-left font-bold transition-all ${
                           selectedCourse === course.id
                             ? "bg-chart-2 text-white"
                             : "bg-card hover:bg-main"
                         }`}
                       >
                         {course.name}
                         <span className="ml-2 text-sm">
                           ({course.progress}% completado)
                         </span>
                       </button>
                     ))}
                   </div>
                 </div>

                 {/* Instructor Selection */}
                 {selectedCourse && (
                   <div>
                     <label className="mb-2 block text-sm font-bold">
                       Selecciona el Instructor
                     </label>
                     <div className="space-y-2">
                       {mockInstructors
                         .filter((inst) =>
                           inst.availability.includes(formatDate(selectedDate)),
                         )
                         .map((instructor) => (
                           <button
                             key={instructor.id}
                             type="button"
                             onClick={() =>
                               setSelectedInstructor(instructor.id)
                             }
                             className={`flex w-full items-center gap-3 rounded-lg border-4 border-black p-4 transition-all ${
                               selectedInstructor === instructor.id
                                 ? "bg-chart-2 text-white"
                                 : "bg-card hover:bg-main"
                             }`}
                           >
                             <div className="text-3xl">{instructor.avatar}</div>
                             <div className="flex-1 text-left">
                               <p className="font-bold">{instructor.name}</p>
                               <p className="text-xs opacity-90">
                                 {instructor.specialties.join(", ")}
                               </p>
                             </div>
                           </button>
                         ))}
                     </div>
                   </div>
                 )}

                 {/* Time Selection */}
                 {selectedInstructor && (
                   <div>
                     <label className="mb-2 block text-sm font-bold">
                       Selecciona la Hora
                     </label>
                     <div className="grid grid-cols-3 gap-2">
                       {[
                         "9:00 AM",
                         "10:00 AM",
                         "11:00 AM",
                         "2:00 PM",
                         "3:00 PM",
                         "4:00 PM",
                       ].map((time) => (
                         <button
                           key={time}
                           type="button"
                           onClick={() => setSelectedTime(time)}
                           className={`rounded-lg border-4 border-black p-3 font-bold transition-all ${
                             selectedTime === time
                               ? "bg-chart-2 text-white"
                               : "bg-card hover:bg-main"
                           }`}
                         >
                           {time}
                         </button>
                       ))}
                     </div>
                   </div>
                 )}
               </div>

               <div className="flex justify-end gap-4 border-t-4 border-black p-6">
                 <Button
                   type="button"
                   variant="neutral"
                   onClick={() => {
                     setIsBookingModalOpen(false);
                     setSelectedDate(null);
                     setSelectedCourse(null);
                     setSelectedInstructor(null);
                     setSelectedTime("");
                   }}
                 >
                   Cancelar
                 </Button>
                 <Button
                   type="button"
                   onClick={handleBookClass}
                   disabled={
                     !selectedCourse || !selectedInstructor || !selectedTime
                   }
                 >
                   <Plus className="h-4 w-4" />
                   Agendar Clase
                 </Button>
               </div>
             </div>
           </div>
         </div>
       )}
     </div>
   </div>
 );
}