import { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DynamicWeekCalendar = () => {
  const [currentWeek, setCurrentWeek] = useState(() => {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const days = Math.floor((today - startOfYear) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + startOfYear.getDay() + 1) / 7);
  });

  const [bookings, setBookings] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('//localhost:3000/api/booking');
        const data = await response.json();

        const normalizedBookings = data.payload.datas.map((booking) => {
          const date = new Date(booking.date);
          const localDate = date.toISOString().split('T')[0];
          return {
            ...booking,
            tanggal: localDate,
            start_time: booking.time_start.substring(0, 5),
            end_time: booking.time_end.substring(0, 5),
          };
        });
        setBookings(normalizedBookings);
      } catch (error) {
        console.error('Gagal memuat data booking:', error);
      }
    };

    fetchBookings();
  }, [currentWeek]);

  const dates = useMemo(() => {
    const startOfYear = new Date(new Date().getFullYear(), 0, 1);
    const weekStart = new Date(startOfYear.getTime() + (currentWeek - 1) * 7 * 24 * 60 * 60 * 1000);
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      return date;
    });
  }, [currentWeek]);

  const formatDate = (date) => {
    const options = { weekday: 'long', day: 'numeric', month: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
  };

  const goToPreviousWeek = () => {
    if (currentWeek === 1) {
      const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const newDate = new Date(new Date().getFullYear(), previousMonth + 1, 0);
      const lastWeekOfPreviousMonth = Math.ceil(newDate.getDate() / 7);

      setCurrentWeek(lastWeekOfPreviousMonth);
      setCurrentMonth(previousMonth);
    } else {
      setCurrentWeek(prev => prev - 1);
    }
  };

  const goToNextWeek = () => {
    const newDate = new Date(new Date().getFullYear(), currentMonth + 1, 0);
    const lastWeekOfMonth = Math.ceil(newDate.getDate() / 7);

    if (currentWeek === lastWeekOfMonth) {
      const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;

      setCurrentWeek(1);
      setCurrentMonth(nextMonth);
    } else {
      setCurrentWeek(prev => prev + 1);
    }
  };

  const goToWeekOfSelectedDate = (selectedDate) => {
    const date = new Date(selectedDate);
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000));
    const weekOfYear = Math.ceil((days + startOfYear.getDay() + 1) / 7);
    const month = date.getMonth();

    setCurrentWeek(weekOfYear);
    setCurrentMonth(month);
  };

  useEffect(() => {
    if (date) {
      goToWeekOfSelectedDate(date);
    }
  }, [date]);

  const timeSlots = useMemo(() => 
    Array.from({ length: 15 }, (_, i) => `${(i + 10).toString().padStart(2, '0')}:00 WIB`),
  []);

  const BookingCard = () => (
    <div className="bg-red-100 p-2 rounded shadow">
      <p className="font-bold text-red-500">Booked</p>
    </div>
  );

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10);
    setDate(formattedDate);
  }, []);

  return (
    <div className="w-full">
      <div className="flex w-full justify-between items-center mb-4">
        <div className="flex gap-x-3">
          <div className="flex gap-x-1">
            <button onClick={goToPreviousWeek} className="bg-ejp text-white w-10 h-10 lg:px-3 lg:py-1 flex justify-center items-center rounded-s-md">
              <ChevronLeft size={20} />
            </button>
            <button onClick={goToNextWeek} className="bg-ejp text-white w-10 h-10 lg:px-3 lg:py-1 rounded-e-md flex justify-center items-center">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        <div>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className='rounded-md p-2'
            />
          </div>
      </div>
      <div className="overflow-x-auto lg:overflow-hidden lg:w-full">
        <table className="border-collapse lg:w-full border border-slate-500">
          <thead className="bg-ejp">
            <tr className="p-3 text-white">
              <th className="p-3"></th>
              {dates.map((date, index) => (
                <th key={index} className="p-3">{formatDate(date)}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {timeSlots.map((timeSlot, index) => (
              <tr key={index} className="border-collapse border border-slate-500 p-3 text-center">
                <td className="border-collapse border border-slate-500 p-3">{timeSlot}</td>
                {dates.map((date, dayIndex) => {
                  const bookingDate = date.toISOString().split('T')[0];
                  const formattedTimeSlot = timeSlot.split(' ')[0];
                  
                  const isBooked = bookings.some(
                    (b) => b.tanggal === bookingDate &&
                           formattedTimeSlot >= b.start_time &&
                           formattedTimeSlot < b.end_time
                  );

                  return (
                    <td
                      key={dayIndex}
                      className="border-collapse border border-slate-500 p-3"
                    >
                      {isBooked ? <BookingCard /> : null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DynamicWeekCalendar;
