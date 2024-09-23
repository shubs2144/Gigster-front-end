import React, { useState } from "react";
import "./Gig.scss";
import { Slider } from "infinite-react-carousel/lib";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";
import { BarLoader, ClipLoader } from "react-spinners";
import { getApiBaseUrl } from "../../helper.js";
import getCurrentUser from "../../utils/getCurrentUser.js";

const url = getApiBaseUrl();

const user = getCurrentUser();

const currentUserID = user?._id;

function Gig() {
  const { id } = useParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => {
        return res.data;
      }),
  });

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });

  const handlePay = async () => {
    if (isProcessing) {
      return;
    }

    try {
      setIsProcessing(true); 

      let paymentIntentId;
      //! creating a new order
      const res = await newRequest.post(`/orders/${id}`, {
        buyerId: currentUserID,
      });

      if (res.status === 200) {
        paymentIntentId = res.data.paymentIntentId;
        console.log("Payment Intent ID:", paymentIntentId);
      } else {
        console.error("Error:", response.statusText);
      }

      //! pay page
      const response = await newRequest.post(`${url}/checkout`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {
              price: "price_1NjmAlSFwnpGRs91N78Q2OaL",
              quantity: 1,
            },
          ],
          payment_intent: paymentIntentId,
        }),
      });

      const data = await response.data;
      window.location.href = data.url;
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setIsProcessing(false); 
    }
  };

  return (
    <div className="gig">
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
        <div className="container">
          <div className="left">
            <h1>{data.title}</h1>
            {isLoadingUser ? (
              <div className="loader">
                <BarLoader
                  color="#ff4533"
                  loading={isLoading}
                  width={150}
                  height={10}
                />
              </div>
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src={dataUser.img || "/img/noavatar.jpg"}
                  alt=""
                />
                <span>{dataUser.username}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, i) => (
                        <img src="/img/star.png" alt="" key={i} />
                      ))}
                    <span>{Math.round(data.totalStars / data.starNumber)}</span>
                  </div>
                )}
              </div>
            )}
            <Slider slidesToShow={1} arrowsScroll={1} className="slider">
              {data.images.map((img) => (
                <img key={img} src={img} alt="" />
              ))}
            </Slider>
            <h2>About This Gig</h2>
            <p>{data.desc}</p>
            {isLoadingUser ? (
              <div className="loader">
                <BarLoader
                  color="#ff4533"
                  loading={isLoading}
                  width={150}
                  height={10}
                />
              </div>
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="seller">
                <h2>About The Seller</h2>
                <div className="user">
                  <img src={dataUser.img || "/img/noavatar.jpg"} alt="" />
                  <div className="info">
                    <span style={{ fontSize: "18px" }}>
                      {dataUser.username}
                    </span>
                    {!isNaN(data.totalStars / data.starNumber) && (
                      <div className="stars">
                        {Array(Math.round(data.totalStars / data.starNumber))
                          .fill()
                          .map((item, i) => (
                            <img src="/img/star.png" alt="" key={i} />
                          ))}
                        <span>
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                      </div>
                    )}
                    <button
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        (window.location = `mailto:${
                          isLoadingUser ? (
                            <div className="loader">
                              <BarLoader
                                color="#ff4533"
                                loading={isLoading}
                                width={150}
                                height={10}
                              />
                            </div>
                          ) : (
                            dataUser.email
                          )
                        }`)
                      }
                    >
                      Contact Me
                    </button>
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">{dataUser.country}</span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">Aug 2022</span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="desc">1 day</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr />
                  <p>{dataUser.desc}</p>
                </div>
              </div>
            )}
            <Reviews gigId={id} />
          </div>
          <div className="right">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2>₹{data.price}</h2>
            </div>
            <p>{data.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>{data.deliveryTime} Days Delivery</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>{data.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features">
              {data.features.map((feature) => (
                <div className="item" key={feature}>
                  <img src="/img/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <button onClick={handlePay} disabled={isProcessing}>
              {isProcessing ? <ClipLoader color="white" /> : "Continue"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;
