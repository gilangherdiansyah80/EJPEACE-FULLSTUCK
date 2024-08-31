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

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('//localhost:3000/api/booking');
        const data = await response.json();

        // Normalisasi data
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

  const goToPreviousWeek = () => setCurrentWeek(prev => Math.max(1, prev - 1));
  const goToNextWeek = () => setCurrentWeek(prev => Math.min(52, prev + 1));

  const timeSlots = useMemo(() => 
    Array.from({ length: 15 }, (_, i) => `${(i + 10).toString().padStart(2, '0')}:00 WIB`),
  []);

  const BookingCard = () => (
    <div className="bg-red-100 p-2 rounded shadow">
      <p className="font-bold text-red-500">Booked</p>
    </div>
  );

  return (
    <div className="w-full">
      <div className="flex w-full justify-between items-center mb-4">
        <div className="flex gap-x-3">
          <div className="flex gap-x-1">
            <button onClick={goToPreviousWeek} className="bg-ejp text-white px-3 py-1 rounded-s-md">
              <ChevronLeft size={20} />
            </button>
            <button onClick={goToNextWeek} className="bg-ejp text-white px-3 py-1 rounded-e-md">
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="bg-ejp text-white justify-center items-center px-3 py-1 md:py-2 rounded-md">
            <h2>Minggu {currentWeek}</h2>
          </div>
          <div>
            <input type="date" />
          </div>
        </div>
        <div className="lg:text-3xl font-semibold">
          {formatDate(new Date())}
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
                  const formattedTimeSlot = timeSlot.split(' ')[0]; // Mengambil HH:MM dari "HH:MM WIB"
                  
                  // Periksa apakah waktu slot saat ini berada dalam rentang waktu pemesanan
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
