import { useState } from "react";

const useTrackLocation = () => {
    const [errorMsg, setErrorMsg] = useState("");
    const [latLong, setLatLong] = useState("");
    const [isFinding, setIsFinding] = useState(false);

    const success = (position) => {
        const {latitude, longitude} = position.coords;
        setLatLong(`${latitude},${longitude}`);
        setErrorMsg("");
        setIsFinding(false);
    }

    const error = () => {
        setIsFinding(false);
        setErrorMsg("Unable to retrieve your position");
    }

    const handleTrackLocation = () => {
        setIsFinding(true);
        if (!navigator.geolocation){
            setErrorMsg("Geolocation is not supported by your browser");
            setIsFinding(false);
        }else{
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }

    return{
        latLong,
        handleTrackLocation,
        errorMsg,
        isFinding,
    }

}

export default useTrackLocation;