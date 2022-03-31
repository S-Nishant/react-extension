import React, { useEffect } from 'react';

function News(props) {
    const axios = require("axios");
    const newsApiUrl = "https://newsapi.org/v2/everything?q=india&from=2022-03-31&sortBy=publishedAt&apiKey=17a7a69c44f34d4092e4426a2dc16e7f"
    const attendanceDetails = () => {
        axios
          .get(
            newsApiUrl
          )
          .then(function (response) {
            // handle success
            console.log(
              "response for check btn : ",response
            );
          })
          .catch(function (error) {
            console.log(error);
          });
      };
      useEffect(() => {
        attendanceDetails();
      }, [])
      
    return (
        <div>
            
        </div>
    );
}

export default News;