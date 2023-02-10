const User = require('../models/user')
const Transaction = require('../models/transaction');
const Hotel = require('../models/hotel');
const Room = require('../models/room');

//Login
exports.postLogin = (req, res, next) => {
    const userData = req.body
    User.findOne({ name: userData.username }).then(user => {
        if (!user) {
            res.json({ message: 'Username not exist!' })
        }
        else {
            if (user.password !== userData.password) {
                res.json({ message: 'Wrong password!' })
            }
            else {
                if (user.isAdmin) {
                    res.json({
                        user: user,
                        message: 'Login successfully!'
                    })
                }
                else {
                    res.json({ message: 'You are not Admin!' })

                }
            }
        }
    })
};


//User
exports.getInfoUser = (req, res, next) => {
    User.find().then(result => {
        res.status(200).json({
            users: result,
            usersCount: result.length
        })
    })
        .catch(err => console.log(err))
}

//Transaction
exports.getInfoTran = (req, res, next) => {
    Transaction.find().populate('hotel').then(result => {
        let earnings = 0;
        result.forEach(tran => {
            return earnings += tran.price;
        })
        res.status(200).json({
            trans: result.sort((a, b) => b.dateStart - a.dateStart),
            orders: result.length,
            earnings: earnings,
            balance: Number((earnings / 12).toFixed())
        })
    })
        .catch(err => console.log(err))

}


//Hotel
exports.getInforHotel = (req, res, next) => {
    Hotel.find().then(result => res.status(200).json(result))
        .catch(err => console.log(err))

}

exports.deleteHotel = (req, res, next) => {
    const hotelId = req.body.hotelId;
    // Hotel.findById({ _id: hotelId }).then(result => res.send(result))
    Transaction.find({ hotel: hotelId }).then(result => {
        if (result.length > 0) {
            const trans = result.find(tran => tran.status !== 'Checkout')
            if (!trans) {
                Hotel.findByIdAndDelete(hotelId)
                    .then(() => res.status(200).json({ message: 'Hotel Deleted!' }))
                    .catch(err => console.log(err))
            }
            res.status(300).json({ message: 'Hotel exists Transaction not Checkout' });
        }
        else {
            Hotel.findByIdAndDelete(hotelId)
                .then(() => res.status(200).json({ message: 'Hotel Deleted!' }))
                .catch(err => console.log(err))
        }
    }).catch(err => console.log(err))

}

exports.addHotel = (req, res, next) => {
    const dataHotel = req.body;
    console.log(parseInt(dataHotel.price))
    Room.find({ title: dataHotel.rooms }).then(data => {
        let rooms = [];
        data.forEach(item => {
            return rooms.push(item._id.toString())
        })
        return rooms;
    }).then(result => {
        const hotel = new Hotel({
            name: dataHotel.name,
            type: dataHotel.type,
            city: dataHotel.city,
            title: dataHotel.title,
            address: dataHotel.address,
            distance: dataHotel.distance,
            photos: dataHotel.photos.split(','),
            desc: dataHotel.description,
            cheapestPrice: parseInt(dataHotel.price),
            featured: dataHotel.feature === "Yes" ? true : false,
            rooms: result
        })
        hotel.save();
        res.status(200).json({ message: 'Hotel created!' })
    })
        .catch(err => console.log(err))
}

exports.editHotel = (req, res, next) => {
    const editHotel = req.body;
    console.log(editHotel);
    Room.find({ title: editHotel.rooms }).then(data => {
        let rooms = [];
        data.forEach(item => {
            return rooms.push(item._id.toString())
        })
        return rooms;
    }).then(result => {
        console.log(result)
        Hotel.findByIdAndUpdate(editHotel._id, {
            name: editHotel.name,
            type: editHotel.type,
            city: editHotel.city,
            address: editHotel.address,
            distance: editHotel.distance,
            title: editHotel.title,
            desc: editHotel.description,
            photos: editHotel.photos.split(','),
            cheapestPrice: parseInt(editHotel.price),
            featured: editHotel.feature === "Yes" ? true : false,
            rooms: result
        }, (err) => {
            if (err) {
                console.log(err)
            }
            else {
                res.status(200).json({ message: "Hotel updated!" })
            }
        })
    }).catch(err => console.log(err))
}


//Room

exports.getInforRoom = (req, res, next) => {
    Room.find().then(result => res.status(200).json(result))
        .catch(err => console.log(err))
}

exports.deleteRoom = (req, res, next) => {
    const roomId = req.body.roomId;
    Room.findOne({ _id: roomId })
        .then(room => {
            Hotel.find({ rooms: room._id.toString() })
                .then(hotel => {
                    let trans = []
                    let tranRoom = [];
                    hotel.forEach(item => {
                        Transaction.find({ hotel: item._id.toString() })
                            .then(tran => {
                                if (tran) {
                                    return trans.concat(tran);
                                }
                            })
                            .then((result) => {
                                room.roomNumbers.forEach(item => {
                                    const tranfil = result.find(e => e.room && e.room.includes(item));
                                    if (tranfil) {
                                        return tranRoom.push(tranfil)
                                    }
                                })
                            })
                            .then(() => {
                                if (tranRoom.length > 0) {
                                    const tranStatus = tranRoom.filter(e => e.status !== 'Checkout');
                                    if (tranStatus.length > 0) {
                                        res.status(400).json({ message: 'Existed Room have transaction not checkout!' })
                                    }
                                    else {
                                        Room.findByIdAndDelete(roomId).then(() => {
                                            res.status(200).json({ message: 'Deleted room!' })
                                        })
                                    }
                                }
                                else {
                                    Room.findByIdAndDelete(roomId).then(() => {
                                        res.status(200).json({ message: 'Deleted room!' })
                                    })
                                }
                            })
                    })
                })
        })
}

exports.addRoom = (req, res, next) => {
    const dataRoom = req.body;
    const rooms = dataRoom.rooms.split(',').map(Number);
    Room.find({ title: dataRoom.title }).then(room => {
        if (room.length > 0) {
            res.status(300).json({ message: 'Room existed!' })
        }
        else {
            const newRoom = new Room({
                title: dataRoom.title,
                price: dataRoom.price,
                maxPeople: dataRoom.maxpeople,
                createdAt: new Date().toISOString(),
                desc: dataRoom.description,
                roomNumbers: rooms
            })
            return newRoom.save()
        }
    }).then((result) => {
        if (result) {
            Hotel.findOneAndUpdate({ name: dataRoom.hotel }).then(hotel => {
                hotel.rooms.push(result._id.toString())
                return hotel.save()
            }).then((newhotel) => {
                res.status(200).json({ message: 'Room created!' })
            })
                .catch(err => console.log(err))
        }
    })
        .catch(err => console.log(err))

}

exports.editRoom = (req, res, next) => {
    const editRoom = req.body;
    console.log(editRoom)
    Room.findByIdAndUpdate(editRoom._id, {
        title: editRoom.title,
        price: editRoom.price,
        maxPeople: editRoom.maxpeople,
        desc: editRoom.description,
        roomNumbers: editRoom.roomNumbers.split(',').map(Number)
    }, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            res.status(200).json({ message: "Room updated!" })
        }
    })
}