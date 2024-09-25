import { useState, useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap = () => {
  const [map, setMap] = useState<any>();
  const [marker, setMarker] = useState<any>();

  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      const kakaoMap = new window.kakao.maps.Map(container, options);
      setMap(kakaoMap);
      
      const getCurrentPosition = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const lat = position.coords.latitude;
              const lng = position.coords.longitude;

              const currentPos = new window.kakao.maps.LatLng(lat, lng);
              kakaoMap.setCenter(currentPos);

              const currentMarker = new window.kakao.maps.Marker({
                position: currentPos,
              });
              currentMarker.setMap(kakaoMap);
              setMarker(currentMarker);
            },
            (error) => {
              console.error("Error getting location: ", error);
            }
          );
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
      };

      getCurrentPosition();
    });
  }, []);

  return (
    <div
      id="map"
      className="w-[100%] h-[500px]">
    </div>
  );
};

export default KakaoMap;