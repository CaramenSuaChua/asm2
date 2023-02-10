import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";

import { useState } from "react";
import axios from "../../utils/axios";
import { useEffect } from "react";

const Home = () => {
  const [hotels, setHotels] = useState([])
  useEffect(() => {
    async function fetchHotel() {
      await axios.get('/hotel')
        .then(res => setHotels(res.data))
    }
    fetchHotel();
  }, [])
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured city={hotels.city} />
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList type={hotels.type} />
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties top_rate={hotels.top_rate} />
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
