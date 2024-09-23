import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";
import { BarLoader } from "react-spinners";

function Gigs() {
  const queryParameters = new URLSearchParams(window.location.search);
  const category = queryParameters.get("cat") || queryParameters.get("search");
  category.toLocaleLowerCase();
  let catToRender;
  switch (category) {
    case "design":
      catToRender = "Design";
      break;
    case "ai":
      catToRender = "AI Services";
      break;
    case "animation":
      catToRender = "Animation";
      break;
    case "writing":
      catToRender = "Writing and Translation";
      break;
    case "web":
      catToRender = "Web Development";
      break;
    case "photography":
      catToRender = "Photography";
      break;
    default:
      break;
  }

  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest
        .get(
          `/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
          
        )
        .then((res) => {
          return res.data;
        }),
  });

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort]);

  const apply = () => {
    refetch();
  };

  return (
    <div className="gigs">
      <div className="container">
               <h1>{catToRender}</h1>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
        </div>
        <div className="cards">
          {isLoading ? (
            <div className="loader">
              <BarLoader
                color="#ff4533"
                loading={isLoading}
                width={150}
                height={10}
              />
            </div>
          ) : error ? (
            "Something went wrong!"
          ) : (
            data.map((gig) => <GigCard key={gig._id} item={gig} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
