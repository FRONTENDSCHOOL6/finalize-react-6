import { useEffect, useRef, useState } from 'react';

export default function GetKakaoMap() {
  const mapRef = useRef(null);
  const [keyword, setKeyword] = useState('');
  const [markers, setMarkers] = useState([]);

  // 카카오 맵 생성하기
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      const container = document.getElementById('mapContainer');
      const options = {
        center: new window.kakao.maps.LatLng(33.5068, 126.4929),
        level: 5,
      };

      // 지도 생성
      const map = new window.kakao.maps.Map(container, options);

      // 참조에 저장하여 후속 작업에서 사용
      mapRef.current = map;

      // 교통 정보 표시
      map.addOverlayMapTypeId(window.kakao.maps.MapTypeId.TRAFFIC);

      // 확대 축소 컨트롤 추가
      const zoomControl = new window.kakao.maps.ZoomControl();
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
    }
  }, []);

  // 검색어 입력 후 결과 출력
  function searchPlaces() {
    if (!window.kakao || !window.kakao.maps || !mapRef.current) return;

    const places = new window.kakao.maps.services.Places();

    places.keywordSearch(keyword, function (result, status) {
      removeMarkers();

      let tempMarkers = [];

      if (status === window.kakao.maps.services.Status.OK) {
        for (let i = 0; i < result.length; i++) {
          let markerInfo = displayMarker(result[i]);
          tempMarkers.push(markerInfo);
        }

        setMarkers(tempMarkers);
      }
    });

    setKeyword('');

    // 화면에 마커 표시
    function displayMarker(place) {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(place.y, place.x),
        map: mapRef.current,
      });

      const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

      window.kakao.maps.event.addListener(marker, 'mouseover', function () {
        infowindow.setContent(
          '<div className="p-1 text-sm">' + place.place_name + '</div>'
        );
        infowindow.open(mapRef.current, marker);
      });

      window.kakao.maps.event.addListener(marker, 'mouseout', function () {
        infowindow.close();
      });

      return marker;
    }

    // 마커 초기화
    function removeMarkers() {
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      setMarkers([]);
    }
  }

  // 엔터 키 입력 감지
  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      searchPlaces();
    }
  }

  return (
    <div className="mb-10 relative border-4 border-blue w-[80%] h-[900px]">
      <div id="mapContainer" className="w-full h-full relative">
        <div id="map" className="w-full h-full" />
      </div>

      <div className="absolute top-5 left-5 flex gap-2 z-10">
        <input
          type="text"
          value={keyword}
          className="w-[400px] px-5 py-3 border-[3px] border-white rounded-lg"
          placeholder="장소 검색"
          onChange={(e) => setKeyword(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="w-[70px] bg-blue text-white border-0 rounded-lg"
          onClick={searchPlaces}
        >
          검색
        </button>
      </div>
    </div>
  );
}
