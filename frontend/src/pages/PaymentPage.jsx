import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PaymentPage = () => {
  const FIXED_AMOUNT = 500; // Fixed amount in INR
  const { appointmentId } = useParams();
  const { backendUrl, token } = useContext(AppContext);
  const [appointment, setAppointment] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/user/appointments/${appointmentId}`, {
          headers: { token },
        });
        if (response.data.success) {
          setAppointment(response.data.appointment);
        } else {
          toast.error('Failed to load appointment details.');
        }
      } catch (error) {
        console.error("Error fetching appointment details:", error);
        toast.error('An error occurred while fetching appointment details.');
      }
    };
    fetchAppointmentDetails();
  }, [appointmentId, backendUrl, token]);

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/payment/create-order`,
        { amount: FIXED_AMOUNT * 100, appointmentId },
        { headers: { token } }
      );

      if (response.data.success) {
        const { orderId, amount } = response.data;
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,  // for Vite-based projects

          amount,
          currency: 'INR',
          name: 'Payment for Appointment',
          description: `Payment for appointment ${appointmentId}`,
          order_id: orderId,
          handler: async (response) => {
            const paymentDetails = {
              appointmentId,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
            };
            try {
              await axios.post(`${backendUrl}/api/payment/verify-payment`, paymentDetails, {
                headers: { token },
              });
              toast.success('Payment successful!');
              setPaymentStatus('completed');
              navigate('/appointments');
            } catch (error) {
              console.error("Error verifying payment:", error);
              toast.error('An error occurred during payment verification.');
            }
          },
          prefill: {
            name: appointment.userData?.name || '',
            email: appointment.userData?.email || '',
            contact: appointment.userData?.phone || '',
          },
          theme: { color: '#528FF0' },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        toast.error('Failed to create payment order.');
      }
    } catch (error) {
      console.error("Error creating payment order:", error);
      toast.error('An error occurred while initiating payment.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="p-6 bg-white shadow-md rounded-lg max-w-md">
        <h2 className="text-2xl font-bold mb-4">Payment for Appointment</h2>
        {appointment ? (
          <div>
            <p>Appointment with <strong>{appointment.desData.name}</strong></p>
            <p>Scheduled for <strong>{appointment.slotDate} at {appointment.slotTime}</strong></p>
            <p>Amount to Pay: ₹{FIXED_AMOUNT}</p>
            {paymentStatus === 'completed' ? (
              <p className="text-green-600 font-semibold">Payment Completed Successfully!</p>
            ) : (
              <button
                onClick={handlePayment}
                className="bg-blue-600 text-white px-6 py-3 mt-4 rounded-lg hover:bg-blue-700"
              >
                Proceed to Pay Online
              </button>
            )}
          </div>
        ) : (
          <p>Loading appointment details...</p>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
