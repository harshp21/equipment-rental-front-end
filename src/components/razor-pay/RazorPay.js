import React from 'react'
import axiosInstance from '../../axios'
import './razor-pay.css'

function RazorPay({ paymentData, isDisabled = false, onPaymentCallback }) {

    const axios = axiosInstance();

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }


    const displayRazorpay = async () => {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const result = await axios.post("/payment/orders", { totalAmount: paymentData.totalAmount });

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        const { amount, id: orderId, currency } = result.data.order;

        const options = {
            key: "rzp_test_gdi7L1UwIoTkNv",
            amount: amount.toString(),
            currency: currency,
            name: "Rental protal",
            description: "Test Transaction",
            // image: { logo },
            order_id: orderId,
            handler: async function (response) {
                try {
                    console.log(response);
                    const data = {
                        orderCreationId: orderId,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                        paymentData
                    };

                    await axios.post("/payment/verification", data);
                    onPaymentCallback();
                } catch (err) {

                }
            },
            prefill: {
                name: paymentData.name,
                email: paymentData.email,
                contact: "9999999999",
            },
            notes: {
                address: "Equipment rental portal",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }
    return (
        <button className="razor-pay-btn" onClick={displayRazorpay} disabled={isDisabled}>
            Checkout
        </button>
    )
}

export default RazorPay
