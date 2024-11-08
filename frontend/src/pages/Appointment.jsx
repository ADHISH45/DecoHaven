import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import RelatedDesigners from '../components/RelatedDesigners';
import { toast } from 'react-toastify'; // Ensure react-toastify is installed
import axios from 'axios';

const Appointment = () => {
  const { desId } = useParams();
  const { designers, backendUrl, token, getDesignersData } = useContext(AppContext);
  const daysofWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const navigate = useNavigate();

  const [desInfo, setDesInfo] = useState(null);
  const [desSlots, setDesSlots] = useState([]);
  const [selectedDateSlots, setSelectedDateSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const fetchDesInfo = () => {
    const desInfo = designers.find(des => des._id === desId);
    setDesInfo(desInfo);
  };

  const getAvailableSlots = () => {
    if (!desInfo || !desInfo.slots_booked) {
      console.warn("Designer information or slots_booked data is not available.");
      return;
    }

    const slots = [];
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = `${day}_${month}_${year}`;
        const slotTime = formattedTime;

        const isSlotAvailable = !(desInfo.slots_booked[slotDate] && desInfo.slots_booked[slotDate].includes(slotTime));
        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 45);
      }
      slots.push(timeSlots);
    }

    setDesSlots(slots);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Please log in to book an appointment');
      navigate('/login');
      return;
    }
  
    try {
      const date = desSlots[slotIndex][0].datetime;
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
  
      const slotDate = `${day}_${month}_${year}`;
      const slotTime = selectedTime; // Make sure selectedTime is defined
  
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { desId, slotDate, slotTime },
        { headers: { token } }
      );
  
      if (data.success) {
        toast.success(data.message);
        getDesignersData();
        navigate('/myappointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while booking the appointment');
    }
  };
  
  useEffect(() => {
    fetchDesInfo();
  }, [designers, desId]);

  useEffect(() => {
    if (desInfo) {
      getAvailableSlots();
    }
  }, [desInfo]);

  const handleDateSelection = (index) => {
    setSlotIndex(index);
    setSelectedDateSlots(desSlots[index]);
    setSelectedTime(null); // Reset selected time when changing date
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 flex flex-col items-center">
      {desInfo ? (
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row p-4">
            <img
              src={desInfo.image}
              alt={desInfo.name || "Designer"}
              className="w-full md:w-1/3 object-cover rounded-lg mb-4 md:mb-0"
            />
            <div className="w-full md:w-2/3 md:pl-6 space-y-3">
              <h2 className="text-2xl font-semibold text-gray-800">{desInfo.name}</h2>
              <p className="text-gray-600 font-medium">{desInfo.speciality}</p>
              <p className="text-gray-500">{desInfo.experience} years of experience</p>
              <p className="text-gray-700 text-sm leading-relaxed">{desInfo.about}</p>
            </div>
          </div>
          <div className="p-4">
            <p className="text-lg font-semibold text-gray-700 mb-3">Select a Date</p>
            <div className="grid grid-cols-4 gap-2 mb-6">
              {desSlots.length > 0 &&
                desSlots.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleDateSelection(index)}
                    className={`cursor-pointer p-2 rounded-lg text-center transition-all 
                      ${slotIndex === index ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'} 
                      hover:bg-blue-200`}
                  >
                    <p className="text-sm font-semibold">{item[0] && daysofWeek[item[0].datetime.getDay()]}</p>
                    <p className="text-lg font-bold">{item[0] && item[0].datetime.getDate()}</p>
                  </div>
                ))}
            </div>
            <p className="text-lg font-semibold text-gray-700 mb-3">Available Time Slots</p>
            {selectedDateSlots.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {selectedDateSlots.map((slot, slotIdx) => (
                  <div
                    key={slotIdx}
                    onClick={() => handleTimeSelection(slot.time)}
                    className={`cursor-pointer p-2 rounded-lg text-center transition-all 
                      ${selectedTime === slot.time ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'} 
                      hover:bg-green-300`}
                  >
                    {slot.time}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Select a date to view available time slots</p>
            )}
            <button
              onClick={bookAppointment}
              className="mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all"
              disabled={!selectedTime}
            >
              Book Appointment
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 font-semibold">Loading...</div>
      )}
      {/* Related Designers component placed here, below the appointment section */}
      {desInfo && (
        <RelatedDesigners desId={desId} speciality={desInfo.speciality} />
      )}
    </div>
  );
};

export default Appointment;
