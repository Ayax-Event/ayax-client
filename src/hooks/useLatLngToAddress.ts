import axios from "axios";
import { useEffect } from "react";

export default (latitude, longtitude, setAddress) => {
  useEffect(() => {
    const getAddressFromLatLng = async () => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longtitude}&key=${process.env.EXPO_GOOGLE_MAPS_API_KEY}`
        );

        if (response.data.status === "OK") {
          const result = response.data.results[0];
          setAddress(result.formatted_address);
        } else {
          console.error("Geocoding failed:", response.data.status);
        }
      } catch (error) {
        console.error("Error fetching the address:", error);
      }
    };

    getAddressFromLatLng();
  }, [latitude, longtitude]);
};
