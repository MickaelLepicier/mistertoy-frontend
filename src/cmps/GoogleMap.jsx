import React, { useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { useTranslation } from 'react-i18next'

const containerStyle = {
  width: '80vw',
  height: '80vh',
  marginBlockStart: '5vh',
  borderRadius: '20px',
  boxShadow: '1px 2px 19px 7px rgba(0,0,0,0.4)'
}

const alts = {
  telAviv: { lat: 32.0853, lng: 34.7818 },
  rehovot: { lat: 31.9006, lng: 34.8092 },
  ashdod: { lat: 31.7871, lng: 34.646 }
}

export function GoogleMaps() {
  const {t} = useTranslation()

  const [center, setCenter] = useState(alts.rehovot)
  const [zoom, setZoom] = useState(10)

  function handleChange(alts) {
    setCenter({ ...alts })
    setZoom(17)
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyB_QOJqJwSRmEXyzBzrauPMzTSKl6kdcdE'
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    // do your stuff before map is unmounted
    setMap(null)
  }, [])

  return isLoaded ? (
    <section>
      <h2>{t('location')}</h2>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker
          position={alts.telAviv}
          onClick={() => handleChange(alts.telAviv)}
        />
        <Marker
          position={alts.rehovot}
          onClick={() => handleChange(alts.rehovot)}
        />
        <Marker
          position={alts.ashdod}
          onClick={() => handleChange(alts.ashdod)}
        />
        <></>
      </GoogleMap>

      <button onClick={() => handleChange(alts.telAviv)}>Tel Aviv</button>
      <button onClick={() => handleChange(alts.rehovot)}>Rehovot</button>
      <button onClick={() => handleChange(alts.ashdod)}>Ashdod</button>
    </section>
  ) : (
    <></>
  )
}
