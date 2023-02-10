import "./searchItem.css";
import { useNavigate } from "react-router-dom";

const SearchItem = ({ hotel }) => {
  const navigate = useNavigate();
  return (
    <div className="searchItem">
      <img
        src={hotel.photos[0]}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{hotel.name}</h1>
        <span className="siDistance">{hotel.distance} from center</span>
        <span className="siSubtitle">
          {hotel.description}
        </span>
        <span className="siFeatures">
          {hotel.type}
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <button>{hotel.rating}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">${hotel.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="siCheckButton" onClick={() => navigate(`/hotels/${hotel._id}`)}>See availability</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
