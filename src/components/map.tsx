import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { memo, useEffect, useRef } from 'react';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../const';
import { City } from '../types/city';
import useMap from '../hooks/useMap';
import { OfferPreviews } from '../types/offer-preview';
import { MapSize } from '../const';

type MapProps = {
  city: City;
  offers: OfferPreviews[];
  selectedOffer: OfferPreviews | null;
};

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [20, 40],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [20, 40],
});

function Map({ city, offers, selectedOffer }: MapProps): JSX.Element {
  // console.log(city);
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = leaflet.layerGroup().addTo(map);
      offers.forEach((offer) => {
        leaflet.marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        }, {
          icon: (selectedOffer !== null && offer.id === selectedOffer.id)
            ? currentCustomIcon
            : defaultCustomIcon,
        })
          .addTo(markerLayer);
      });
      return () => {
        map.removeLayer(markerLayer);
        mapRef.current = null;
      };
    }


  }, [map, offers, selectedOffer, city]);

  return (
    <div
      ref={mapRef}
      style={{ width: MapSize.WIDTH, height: MapSize.HEIGHT }}
    >

    </div>
  );
}

export default memo(Map);
