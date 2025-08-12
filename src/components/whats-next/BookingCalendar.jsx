
import React, { useState, useEffect } from "react";
import { format, addDays, eachDayOfInterval, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameDay, isSameMonth } from "date-fns";
import { Appointment } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const timeSlots = ["6:00pm", "6:45pm", "7:30pm", "8:15pm", "9:00pm"];

const DaySelector = ({ selectedDate, setSelectedDate }) => {
  const [visibleDates, setVisibleDates] = useState([]);

  useEffect(() => {
    const start = addDays(selectedDate, -3);
    const end = addDays(selectedDate, 3);
    setVisibleDates(eachDayOfInterval({ start, end }));
  }, [selectedDate]);

  const handleNextDay = () => {
    setSelectedDate(addDays(selectedDate, 1));
  };

  const handlePrevDay = () => {
    setSelectedDate(addDays(selectedDate, -1));
  };

  return (
    <div className="flex items-center justify-between">
      <Button variant="ghost" size="icon" onClick={handlePrevDay} className="h-8 w-8">
        <ChevronLeft className="w-5 h-5" />
      </Button>
      <div className="flex-grow flex justify-center items-center gap-2">
        {visibleDates.map(date => (
          <button
            key={date.toString()}
            onClick={() => setSelectedDate(date)}
            className={`flex flex-col items-center justify-center w-12 h-16 rounded-lg transition-colors ${
              isSameDay(date, selectedDate) ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
            }`}
          >
            <span className="text-xs font-medium">{format(date, 'E')[0]}</span>
            <span className="text-xl font-bold">{format(date, 'd')}</span>
          </button>
        ))}
      </div>
      <Button variant="ghost" size="icon" onClick={handleNextDay} className="h-8 w-8">
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default function BookingCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const nextMonth = () => setCurrentMonth(prev => addDays(startOfMonth(prev), 35));
  const prevMonth = () => setCurrentMonth(prev => addDays(startOfMonth(prev), -1));

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentMonth)),
    end: endOfWeek(endOfMonth(currentMonth))
  });

  return (
    <div className="p-3 sm:p-6 md:p-8 bg-white">
      <div className="flex flex-col gap-6 sm:gap-8">
        {/* Header & Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center text-lg font-semibold">
              A
            </div>
            <span className="font-semibold text-gray-800">Ali Shafique</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Book Your Discovery Call</h1>
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/d55a9b677_image.png" alt="Clock" className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
              <span className="text-sm sm:text-base">30 min appointments</span>
            </div>
            <div className="flex items-start gap-3">
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/3f6223245_image.png" alt="Google Meet" className="w-6 h-6 mt-1 flex-shrink-0" />
              <span className="text-sm sm:text-base">Google Meet video conference info added after booking</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 pt-2">
            We empower Canadian businesses with digital strategies that are clear, effective, and tailored for growth.
          </p>
        </div>

        {/* Booking Interface */}
        <div className="border border-gray-200 rounded-lg p-3 sm:p-4">
          <div className="mb-4">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800">Select an appointment time</h2>
            <p className="text-xs sm:text-sm text-gray-500">(GMT+05:00) Pakistan Standard Time</p>
          </div>
          
          {/* Mobile: Stacked Layout, Desktop: Side by Side */}
          <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
            {/* Calendar */}
            <div className="order-2 md:order-1">
              <div className="flex items-center justify-between mb-2 px-2">
                <span className="font-semibold text-sm">{format(currentMonth, 'MMMM yyyy')}</span>
                <div className="flex items-center">
                  <Button variant="ghost" size="icon" onClick={prevMonth} className="h-6 w-6 sm:h-7 sm:w-7">
                    <ChevronLeft className="w-3 sm:w-4 h-3 sm:h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={nextMonth} className="h-6 w-6 sm:h-7 sm:w-7">
                    <ChevronRight className="w-3 sm:w-4 h-3 sm:h-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => <div key={day} className="p-1">{day}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {days.map(day => (
                  <button
                    key={day.toString()}
                    onClick={() => setSelectedDate(day)}
                    className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full text-xs sm:text-sm transition-colors ${
                      !isSameMonth(day, currentMonth) ? 'text-gray-300' : ''
                    } ${
                      isSameDay(day, selectedDate) 
                        ? 'bg-blue-600 text-white' 
                        : 'hover:bg-blue-100'
                    }`}
                  >
                    {format(day, 'd')}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Day Selector & Time Slots */}
            <div className="order-1 md:order-2 md:border-l md:border-gray-200 md:pl-4">
              <DaySelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
              <div className="mt-4 space-y-2 max-h-48 sm:max-h-60 overflow-y-auto">
                {timeSlots.map(time => (
                  <Button key={time} variant="outline" className="w-full justify-center h-8 sm:h-10 border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700 font-semibold text-sm sm:text-base">
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
