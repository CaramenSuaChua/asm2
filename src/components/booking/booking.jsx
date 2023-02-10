import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useState } from "react";
import "./booking.css";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";

const Booking = ({ hotel }) => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'))
    const [userInfo, setUserInfo] = useState({
        name: user?.name,
        fullName: user?.fullName,
        phoneNumber: user?.phoneNumber,
        email: user?.email,
        cardId: ''
    })
    const [payment, setPayment] = useState('')
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);
    const [selectRoom, setSelectRoom] = useState({
        rooms: [],
        totalPrice: 0
    })
    const getTime = (d1, d2) => {
        let ms1 = d1.getTime();
        let ms2 = d2.getTime();
        return Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000));
    };
    const startDate = date[0].startDate
    const endDate = date[0].endDate
    let time = getTime(startDate, endDate) === 0 ? '1' : getTime(startDate, endDate);

    const handleCheck = (e, id) => {
        const { value, checked } = e.target;
        const { rooms, totalPrice } = selectRoom;
        const room = hotel.rooms.find(room => room._id === id)
        const priceRoom = room.price;
        if (checked) {

            setSelectRoom({
                rooms: [...rooms, value],
                totalPrice: (totalPrice + priceRoom)
            })
        }
        else {
            setSelectRoom({
                rooms: rooms.filter(e => e !== value),
                totalPrice: (totalPrice - priceRoom)
            })
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleSubmit = () => {
        const reserveData = {
            date: date,
            user: user.name,
            room: selectRoom.rooms,
            totalPrice: selectRoom.totalPrice * time,
            hotel: hotel._id,
            payment: payment
        }
        console.log(reserveData)
        axios.post('/transactions', reserveData)
            .then(res => { return res.data })
            .then(result => {
                if (result.message === 'Transaction Created!') {
                    navigate('/transactions')
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <div className="hotelBooking">
                <div className="bookingDate">
                    <h2>Dates</h2>
                    <DateRange
                        editableDateInputs={true}
                        onChange={(item) => setDate([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={date}
                    // minDate={new Date()}
                    />
                </div>
                <form className="bookingForm">
                    <h2>Reserve info</h2>
                    <div>
                        <div className="bookingText">
                            <label >Your Full Name:</label>
                        </div>
                        <input className="bookingInput" placeholder="Full Name" name="fullName" type="text" value={userInfo.fullName} onChange={handleChange} />
                    </div>
                    <div>
                        <div className="bookingText">
                            <label >Your Email:</label>
                        </div>
                        <input className="bookingInput" placeholder="Email" name="email" type="email" value={userInfo.email} onChange={handleChange} />
                    </div>
                    <div>
                        <div className="bookingText">
                            <label>Your Phone Number:</label>
                        </div>
                        <input className="bookingInput" placeholder="Phone Number" name="phoneNumber" type="number" value={userInfo.phoneNumber} onChange={handleChange} />
                    </div>
                    <div>
                        <div className="bookingText">
                            <label>Your Identity Card Number:</label>
                        </div>
                        <input className="bookingInput" placeholder="Card Number" name="cardID" type="number" value={userInfo.cardId} onChange={handleChange} />
                    </div>
                </form>
            </div>
            <div>
                <h2>Select Rooms</h2>
            </div>
            <div className="hotelBooking">
                {hotel.rooms?.map(room => {
                    const datevalid = new Date(room.createdAt)
                    if (datevalid.getTime() <= date[0].startDate.getTime()) {
                        return (
                            <div className="selectRoom" key={room._id}>
                                <div className="hotelSelect">
                                    <div className="bookingRoom">
                                        <h3>{room.title}</h3>
                                        <p>{room.desc}</p>
                                        <p>Max people: <strong>{room.maxPeople}</strong></p>
                                        <p><strong>${room.price}</strong></p>
                                    </div>
                                    <div className="bookingCheck">
                                        {room.roomNumbers?.map((roomNum) => {
                                            return (
                                                <div key={roomNum}>
                                                    <label>
                                                        Room {roomNum}
                                                    </label>
                                                    <input type="checkbox" value={roomNum} onChange={(e, id = room._id) => handleCheck(e, id)} />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                }
                )}
            </div>
            <h2>Total Bill: ${selectRoom.totalPrice * time}</h2>
            <div className="hotelSelect">
                <div className="select">
                    <select className="selectBoxInput" onChange={(e) => setPayment(e.target.value)}>
                        <option>Select Payment Method</option>
                        <option>Credit Card</option>
                        <option>Cash</option>

                    </select>
                </div>
                <div className="selectButton">
                    <button className="buttonReserve" onClick={handleSubmit} >Reserve Now</button>
                </div>
            </div>
        </div >

    )

}

export default Booking;