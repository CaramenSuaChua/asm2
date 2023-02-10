import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import MailList from "../../components/mailList/MailList";
import './transaction.css';
import axios from "../../utils/axios";
import { useEffect, useState } from "react";

const Transaction = () => {
    const list = 'list';
    const user = JSON.parse(localStorage.getItem('user'))
    const [trans, setTrans] = useState([]);
    useEffect(() => {
        async function fetchTrans() {
            await axios.get('/transactions?user=' + user.name)
                .then(res => setTrans(res.data))
        }
        fetchTrans();
    }, [])
    console.log(trans)
    return (
        <div>
            <Navbar />
            <Header type={list} />
            <div className="transContainer">
                <h1>Your Transaction</h1>
                <table >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Hotel</th>
                            <th>Room</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Payment Method</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trans?.map((tran, i) => {
                            return (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{tran.hotel.name}</td>
                                    <td>{tran.room.toString()}</td>
                                    <td>{new Date(tran.dateStart).getDate() + "/" + new Date(tran.dateStart).getMonth() + "/" + new Date(tran.dateStart).getFullYear()
                                        + " - " + new Date(tran.dateEnd).getDate() + "/" + new Date(tran.dateEnd).getMonth() + "/" + new Date(tran.dateEnd).getFullYear()
                                    }</td>
                                    <td>${tran.price}</td>
                                    <td>{tran.payment}</td>
                                    <td><span className={tran.status === 'Booked' ? 'statusBooked' : (tran.status === 'Checkin' ? 'statusCheckin' : 'statusCheckout')}>{tran.status}</span></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <MailList />
                <Footer />
            </div>
        </div>
    )
}

export default Transaction;