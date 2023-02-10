const Hotel = require('../models/hotel')
const room = require('../models/room')
const Room = require('../models/room')


//getHotel
exports.getHotel = (req, res, next) => {

    Hotel.find().then(hotels => {
        const result = {
            city: [{
                name: 'Ha Noi',
                imageUrl: "https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o=",
                total: hotels.filter(hotel => hotel.city === 'Ha Noi').length || 0
            },
            {
                name: 'Ho Chi Minh',
                imageUrl: "https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o=",
                total: hotels.filter(hotel => hotel.city === 'Ho Chi Minh').length || 0
            },
            {
                name: 'Da Nang',
                imageUrl: "https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o=",
                total: hotels.filter(hotel => hotel.city === 'Da Nang').length || 0
            },
            ],
            type: [
                {
                    name: 'hotel',
                    imageUrl: "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
                    total: hotels.filter(hotel => hotel.type === 'hotel').length || 0
                },
                {
                    name: 'apartments',
                    imageUrl: "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
                    total: hotels.filter(hotel => hotel.type === 'apartments').length || 0
                }, {
                    name: 'resorts',
                    imageUrl: "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
                    total: hotels.filter(hotel => hotel.type === 'resorts').length || 0
                }, {
                    name: 'villas',
                    imageUrl: "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
                    total: hotels.filter(hotel => hotel.type === 'villas').length || 0
                },
                {
                    name: 'cabins',
                    imageUrl: "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
                    total: hotels.filter(hotel => hotel.type === 'cabins').length || 0
                }
            ],
            top_rate: hotels.sort((a, b) => b.rating - a.rating).slice(0, 3)
        }
        res.status(200).send(result)
    })

}

//postSearchHotel

exports.postSearchHotel = (req, res, next) => {
    const dataSearch = req.body
    console.log(req.body)
    const date = new Date(dataSearch.date[0].startDate)
    console.log(date.getTime())
    Hotel.find({ city: dataSearch.destination }).populate('rooms').then(hotels => {
        // res.send(hotels)
        const hotel_Search = hotels
            .filter(hotel => hotel.rooms && hotel.rooms.find(room => room.createdAt.getTime() <= new Date(dataSearch.date[0].startDate).getTime() && room.roomNumbers.length >= dataSearch.options.room
            ))
        res.status(200).send(hotel_Search)
    })
}

//getHotelId
exports.getHotelId = (req, res, next) => {
    const hotelId = req.params.hotelId

    if (hotelId) {
        Hotel.findById(hotelId).populate('rooms').then(hotel => {
            if (hotel) {
                res.status(200).send(hotel)
            }
            else {
                res.status(300).send({ message: 'No Hotel!' })
            }
        })
    }
}