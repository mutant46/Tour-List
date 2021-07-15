import React, { useState, useEffect } from "react";
import "./stylesheet/App.css";

// import components
import Tours from "./Tour-Wrapper";
import Loading from "./Loading";
import Error from "./Error";

// used variables
var recentTour;
const url = "https://course-api.com/react-tours-project";

// my component
const TourWrapper = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isRecent, setIsRecent] = useState(false);
  const [data, setData] = useState([]);

  // function to remove the particular tour form the list
  function removeTour(id) {
    const newData = data.filter((tour) => tour.id !== id);
    recentTour = data.filter((tour) => tour.id === id);
    setIsRecent(true);
    setData(newData);
  }

  // function to bring the recent tour back to the list
  const bringRecent = () => {
    data.push(recentTour[0]);
    setData(data);
    setIsRecent(false);
  };

  // fetching the data from the url and then passing it to the useState "data"
  const fetchData = async () => {
    try {
      setIsLoading(true);
      setIsRecent(false);
      const response = await fetch(url);
      var tours;
      if (response.status >= 200 && response.status <= 299) {
        tours = await response.json();
        setIsLoading(false);
        setData(tours);
      } else {
        setIsLoading(false);
        setIsError(true);
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // my use Effect function
  useEffect(() => {
    fetchData();
  }, []);

  // conditional rending of the Tour-Wrapper.js component
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <h1 style={{ textAlign: "center" }} className="heading">
        Our tours
      </h1>
      {data.length === 0 && (
        <button type="button" className="refresh" onClick={fetchData}>
          Refresh
        </button>
      )}
      {isRecent && data.length !== 0 && (
        <button type="button" className="refresh" onClick={bringRecent}>
          Bring Recent Tour
        </button>
      )}
      <br />
      <Tours data={data} removeTour={removeTour} />
    </>
  );
};

export default TourWrapper;
