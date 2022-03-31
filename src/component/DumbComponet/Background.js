import React, { useEffect } from "react";

function Background() {
/**
 *
 * Handles only the theme effect
 * as per the clock time
 *
 */

  const backgroundImages = {
    morning: [
      "https://images.pexels.com/photos/1048039/pexels-photo-1048039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/813465/pexels-photo-813465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/51947/tuscany-grape-field-nature-51947.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    afternoon: [
      "https://images.pexels.com/photos/1619569/pexels-photo-1619569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/164250/pexels-photo-164250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/164250/pexels-photo-164250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
    evening: [
      "https://images.pexels.com/photos/772473/pexels-photo-772473.jpeg?cs=srgb&dl=pexels-jonathan-goerke-772473.jpg&fm=jpg",
      "https://images.pexels.com/photos/1034887/pexels-photo-1034887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    night: [
      "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1421903/pexels-photo-1421903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
  };
  const getWallpaper = () => {
    const current_date = new Date();
    const current_hour = current_date.getHours();
    
    const getIndexBelow3 = () => {
      return (Math.floor(Math.random()*10)) %3 ;
    }

    switch (true) {
      case (current_hour < 10) :
        document.body.style.backgroundImage=`url(`+backgroundImages.morning[getIndexBelow3()]+`)`;
        break;
      case (current_hour >= 10 && current_hour < 17 ) :
        document.body.style.backgroundImage=`url(`+backgroundImages.afternoon[getIndexBelow3()]+`)`;
        break;
        case (current_hour >= 17 && current_hour < 20 ) :
        document.body.style.backgroundImage=`url(`+backgroundImages.evening[getIndexBelow3()]+`)`;
        break;
      case (current_hour >= 20) :
        document.body.style.backgroundImage=`url(`+backgroundImages.night[getIndexBelow3()]+`)`;
      break;
      default:
        break;
    }
  };
  useEffect(() => {
    getWallpaper();
  }, []);

  return <></>;
}

export default Background;
