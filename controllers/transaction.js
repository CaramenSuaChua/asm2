const Transaction = require('../models/transaction');

exports.postTrans = (req, res, next) => {
    const dataTrans = req.body
    if (dataTrans) {
        const Trans = new Transaction({
            user: dataTrans.user,
            hotel: dataTrans.hotel,
            room: dataTrans.room.map(Number),
            dateStart: dataTrans.date[0].startDate,
            dateEnd: dataTrans.date[0].endDate,
            price: dataTrans.totalPrice,
            payment: dataTrans.payment,
            status: 'Booked'
        })
        Trans.save()
        res.status(201).json({ message: 'Transaction Created!' })
    }
    else {
        res.status(300).json({ message: 'Transaction failed!' })
    }
}

exports.getTrans = (req, res, next) => {
    const user = req.query.user

    if (user) {
        Transaction.find({ user: user }).populate('hotel').then(result => {
            if (result) {
                res.status(200).json(result)
            }
            else {
                res.status(300).json({ message: 'No user found!' })

            }
        })
            .catch(err => console.log(err))
    }
    else {
        res.status(300).json({ message: 'No params user!' })
    }
}