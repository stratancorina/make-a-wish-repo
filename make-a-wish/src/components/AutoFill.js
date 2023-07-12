import React, { useState, useCallback, useEffect } from 'react';
import { AddressAutofill, AddressMinimap, useConfirmAddress, config } from '@mapbox/search-js-react';

export default function AutoFill({ onAddressConfirm }) {
  const [showFormExpanded, setShowFormExpanded] = useState(false);
  const [showMinimap, setShowMinimap] = useState(false);
  const [feature, setFeature] = useState();
  const [showValidationText, setShowValidationText] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const accessToken = process.env.REACT_APP_MAPBOX_API_KEY;
    setToken(accessToken)
    config.accessToken = accessToken;
  }, [])
  
  const { formRef, showConfirm } = useConfirmAddress({
    // minimap: true,
    skipConfirmModal: (feature) => {
      ['exact', 'high'].includes(feature.properties.match_code.confidence)
    }

  });

  const handleRetrieve = useCallback(
    (res) => {
      const feature = res.features[0];
      setFeature(feature);
      setShowMinimap(true);
      setShowFormExpanded(true);
    },
    [setFeature, setShowMinimap]
  );

  function handleSaveMarkerLocation(coordinate) {
    console.log(`Marker moved to ${JSON.stringify(coordinate)}.`)
  }

  const sumbitAddress = useCallback(async (e) => {
    e.preventDefault();
    const result = await showConfirm();
    console.log(result)
    console.log(result.feature)
    console.log(result.feature.geometry.coordinates)
        onAddressConfirm(result.feature);
  
    // console.log(result.feature.properties.address_level1)

  }, [showConfirm, onAddressConfirm]);

  function resetForm() {
    const inputs = document.querySelectorAll("input");
    inputs.forEach(input => input.value = "");
    // setShowFormExpanded(false);
    setShowValidationText(false);
    setFeature(null);
  }
  
  return (
    <>
      <div ref={formRef} className="flex flex--column address-info" >
        <div className='from-parent-loc' >
          <div className='form-loc'>
            <label className="txt-s txt-bold color-gray mb3">Adresa</label>
            <AddressAutofill accessToken={token} onRetrieve={handleRetrieve}>
              <input
                className="input mb12"
                placeholder="Incepe sa inserezi adresa ta..."
                autoComplete="address-line1"
                id="mapbox-autofill"
              />
            </AddressAutofill>
            <div className="secondary-inputs" style={{ display: 'block'}}>
              <label className="txt-s txt-bold color-gray mb3">Adresă linia a 2-a</label>
              <input
                className="input mb12"
                placeholder="Apartament, suite, unitate, clădire, etaj etc."
                autoComplete="address-line2"
              />
              <label className="txt-s txt-bold color-gray mb3">Oraș</label>
              <input
                className="input mb12"
                placeholder="Oraș"
                autoComplete="address-level2"
              />
              <label className="txt-s txt-bold color-gray mb3"
                >Județ / Regiune
                </label >
              <input
                className="input mb12"
                placeholder="Județ / Regiune"
                autoComplete="address-level1"
              />
              <label className="txt-s txt-bold color-gray mb3"
                >Cod poștal / ZIP
                </label >
              <input
                className="input"
                placeholder="Cod poștal / ZIP"
                autoComplete="postal-code"
              />
            </div>
          </div>
          <div className="col col--auto-mm">
            {/* Visual confirmation map */}
            <div
              id="minimap-container"
              className="h240 w360 mt18"
              style={{display:"block"}}
            >
              <AddressMinimap
                // canAdjustMarker={true}
                satelliteToggle={true}
                feature={feature}
                show={showMinimap}
                onSaveMarkerLocation={handleSaveMarkerLocation}
              />
            </div>
          </div>
        </div>
          <div className="submit-btns">
            <button onClick={sumbitAddress} className="btn-small" id="btn-confirm">
              Confirma
            </button>
            <button type="button" className="btn-small btn-reset" id="btn-reset" onClick={resetForm}>
              Reseteaza
            </button>
          </div>
      </div>
    </>
  );
};