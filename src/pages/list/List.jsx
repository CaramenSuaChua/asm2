import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";

import axios from "../../utils/axios";
import { useEffect } from "react";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [resHotels, setResHotels] = useState([]);
  useEffect(() => {
    async function fetchSearchHotel() {
      await axios.post('/search', {
        destination: destination,
        date: date,
        options: options
      })
        .then(res => setResHotels(res.data))
    }
    fetchSearchHotel();
  }, [])
  const handleSubmit = () => {
    axios.post('/search', {
      destination: destination,
      date: date,
      options: options
    })
      .then(res => setResHotels(res.data))
  }
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input type="text" value={destination} onChange={(item) => setDestination(item.target.value)} />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  // minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                    value={options.adult} onChange={(item) => setOptions({ adult: item.target.value, children: options.children, room: options.room })}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                    value={options.children} onChange={(item) => setOptions({ adult: options.adult, children: item.target.value, room: options.room })}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                    value={options.room} onChange={(item) => setOptions({ adult: options.adult, children: options.children, room: item.target.value })}

                  />
                </div>
              </div>
            </div>
            <button type="submit" onClick={handleSubmit}>Search</button>
          </div>
          <div className="listResult">
            {resHotels?.map(hotel => {
              return (
                <SearchItem key={hotel._id} hotel={hotel} />
              )
            })}
            {/* <SearchItem distance={resHotels[0].distance} /> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default List;
