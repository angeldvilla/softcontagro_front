import React, { useState } from "react";
import Select from "react-select";
import { StepperWithIcon } from "./StepperShipping";

import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartActions";
import { useNavigate } from "react-router-dom";

import { toast, Toaster } from "sonner";

const Shipping = () => {
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [country, setCountry] = useState(shippingInfo.country);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    try {
      if (!address || !city || !postalCode || !phoneNo || !country) {
        toast.error("Por favor, rellene todos los campos");
      } else if (phoneNo.length < 10 || phoneNo.length > 10) {
        toast.error("El número de contacto debe tener 10 digitos");
      } else if (phoneNo.match(/^[0-9]+$/)) {
        toast.error("El número de contacto debe ser numerico");
      } else if (postalCode.match(/^[0-9]+$/)) {
        toast.error("El código postal debe ser numerico");
      } else if (postalCode.length < 5 || postalCode.length > 5) {
        toast.error("El Código Postal debe tener 5 digitos");
      } else if (city.match(/^[a-zA-Z]+$/)) {
        toast.error("La ciudad solo debe contener letras");
      } else {
        e.preventDefault();

        dispatch(
          saveShippingInfo({ address, city, phoneNo, postalCode, country })
        );
        navigate("/confirm");
      }
    } catch (error) {
      return toast.error(error.response.data.message);
    }
  };

  const handleChange = (e) => {
    setCountry(e);
  };

  const options = [
    { value: "Colombia", label: "Colombia", disabled: true },
    { value: "Argentina", label: "Argentina" },
    { value: "México", label: "México" },
  ];

  return (
    <div>
      <StepperWithIcon />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">Datos de envío</h1>
            <div className="form-group">
              <label htmlFor="address_field">Dirección</label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city_field">Ciudad</label>
              <input
                type="text"
                id="city_field"
                className="form-control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone_field">Telefono</label>
              <input
                type="text"
                id="phone_field"
                className="form-control"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="postal_code_field">Codigo Postal</label>
              <input
                type="text"
                id="postal_code_field"
                className="form-control"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>

            {/*  <div className="form-group">
              <label htmlFor="country_field">País</label>
              <CountryList
                name="country"
                classes="form-control"
                value={country}
                onChange={(e) => handleChange(e)}
              />
            </div> */}
            <div className="form-group">
              <label htmlFor="country_field">País</label>
              <Select
                name="country"
                classes="form-control"
                value={country}
                onChange={(e) => handleChange(e)}
                options={options}
              />
            </div>

            <button
              id="shipping_btn"
              onClick={submitHandler}
              className="btn btn-block py-3"
            >
              CONTINUAR
            </button>
          </form>
        </div>
      </div>
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default Shipping;
