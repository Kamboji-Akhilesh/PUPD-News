import React, { useState, useEffect } from "react";
import axios from "axios";
import "./News.css";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { auth } from "../Auth/AuthConnect";

const useElapsedTime = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTime = Date.now();
  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedTime((Date.now() - startTime) / 1000);
    }, 1000); // Update the elapsed time every 1000 milliseconds (1 second)

    const intervalUpdate = setInterval(() => {
      console.log("congo +1 min");
      const dbref = ref(getDatabase());
      const db = getDatabase();
      var points;
      const userId = auth.currentUser.uid.toString();
      get(child(dbref, "users/" + userId))
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
            points = snapshot.val().points;
            set(ref(db, "users/" + userId), {
              points: points + 1,
              email: snapshot.val().email,
              name: snapshot.val().name,
              phno: snapshot.val().phno,
              pass: snapshot.val().pass,
            });
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }, 60000); // Udates every  seconds (1 min)

    return () => {
      // Clear the interval when the component unmounts
      clearInterval(intervalId);
    };
  }, []);

  return elapsedTime;
};

function News(prop) {
  // document.documentElement.style.setProperty('--scroll-padding',73+"px");

  const elapsedTime = useElapsedTime();
  const [articles, setArticles] = useState([]);
  //const apiKey = "4502be7749ff49e2adc87373348d7c62";
  //const apiKey = "75717bb6fa554cb48be78c5e4c0552d1";
  const apiKey = "d9e20a723f3a4f2aa922809dd726d65f";

  useEffect(() => {
    const fetchArticles = async () => {
      const result = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=in&category=${prop.category}&apiKey=${apiKey}`
      );
      setArticles(result.data.articles);
    };
    fetchArticles();
  }, [prop.category]);

  return (
    <div>
      <div id="con" className="container">
        <div className="cards">
          {articles.map((article) => (
            <a
              to={article.url}
              target="_blank"
              className="card"
              key={article.url}
            >
              <h3 className="card_title">{article.title}</h3>
              <hr />
              <p className="card_desc">{article.description}</p>
              <div className="card_div">
                <h4>Author:-</h4>&nbsp;
                <p>{article.author}</p>
              </div>
              <div className="card_div">
                <h4>Source:-</h4>&nbsp;
                <p>{article.source.name}</p>
              </div>
            </a>
          ))}
        </div>
        <p className="time">Elapsed time: {elapsedTime} seconds</p>
      </div>
    </div>
  );
}

export default News;
