import axios from "axios";
import { useEffect } from "react";

type SetAddress = (address: string) => void;

const useLatLngToAddress = (
  latitude: number,
  longitude: number,
  setAddress: SetAddress
) => {
  useEffect(() => {
    const getAddressFromLatLng = async () => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.EXPO_GOOGLE_MAPS_API_KEY}`
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
  }, [latitude, longitude]);
};

export default useLatLngToAddress;
