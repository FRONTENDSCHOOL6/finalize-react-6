import React, { useEffect } from 'react';

export default function GetKakaoMap() {
  // 카카오 맵 생성하기
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(33.3846, 126.5535),
        level: 9,
      };

      // 지도 생성
      const map = new window.kakao.maps.Map(container, options);

      // 교통 정보 표시
      map.addOverlayMapTypeId(window.kakao.maps.MapTypeId.TRAFFIC);

      // 확대 축소
      const zoomControl = new window.kakao.maps.ZoomControl();
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
    }
  }, []);

  return <div id="map" className="w-full h-full" />;
}
