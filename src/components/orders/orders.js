import React, { useEffect, useContext } from 'react'
import { OrderContext } from '../../context/orders-context/order-context'
import './order.css'

function Orders() {

    const orderContext = useContext(OrderContext);

    useEffect(() => {
        orderContext.fetchOrders();
    }, [])
    return (
        <div className="orders">
            <div className="order__content">
                {orderContext.orderState.orders.length !== 0 ?
                    <div className="order__content_card">
                        <div className="order_id-col">Order Id</div>
                        <div className="order_duration-col">Booked On</div>
                        <div className="order_products-col">Products</div>
                        <div className="order_total-amount-col">Total Amount(Rupees.)</div>
                        <div className="order_status-col">Status</div>
                    </div> : ""
                }

                {orderContext.orderState.orders.length !== 0 ?
                    (orderContext.orderState.orders.map((order) => {
                        console.log(order);
                        return <div key={order.orderId} className="order__content_card">
                            <div className="order_id">{order.orderId}</div>
                            <div className="order_duration">{order.bookedOn}</div>
                            <div className="order_products">{order.products.map(product => <div kwy={product._id}>{product.productName} x {product.quantity}</div>)}</div>
                            <div className="order_total-amount">{order.totalAmount}</div>
                            <div className="order_status">{order.status}</div>
                        </div>
                    })) : <div className="order-description"> No Orders Found</div>}
            </div>
        </div>
    )
}

export default Orders
