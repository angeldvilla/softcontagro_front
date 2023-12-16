import React, { useState } from "react";
import Select from "react-select";
import CheckoutSteps from "./CheckoutSteps";

import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartActions";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import Header from "../layout/Header";

const Shipping = () => {
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [country, setCountry] = useState(shippingInfo.country);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notNumbersRegex = /^[A-Za-zÑñáéíóúÁÉÍÓÚ\s]*$/;
  const onlyNumbersRegex = /^[0-9]+$/;

  const submitHandler = (e) => {
    try {
      if (!address || !city || !postalCode || !phoneNo || !country) {
        toast.error("Por favor, rellene todos los campos");
      } else if (phoneNo.length < 10 || phoneNo.length > 10) {
        toast.error("El número de contacto debe tener 10 digitos");
      } else if (!onlyNumbersRegex.test(phoneNo)) {
        toast.error("El número de contacto debe ser numerico");
      } else if (!onlyNumbersRegex.test(postalCode)) {
        toast.error("El código postal debe ser numerico");
      } else if (postalCode.length < 6 || postalCode.length > 6) {
        toast.error("El Código Postal debe tener 5 digitos");
      } else if (!notNumbersRegex.test(city)) {
        toast.error("La ciudad solo debe contener letras");
      } else {
        e.preventDefault();

        dispatch(
          saveShippingInfo({ address, city, phoneNo, postalCode, country })
        );
        navigate("/confirm");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleChangeCity = (selectedOption) => {
    if (selectedOption && selectedOption.value) {
      setCity(selectedOption.value);
    } else {
      setCity("");
    }
  };

  const handleChange = (e) => {
    setCountry(e.target.value);
  };

  const options = [
    { value: "Cali", label: "Cali" },
    { value: "Buga", label: "Buga" },
    { value: "Palmira", label: "Palmira" },
    { value: "Tulua", label: "Tulua" },
    { value: "Yumbo", label: "Yumbo" },
    { value: "Jamundi", label: "Jamundi" },
    { value: "Cartago", label: "Cartago" },
    { value: "La Union", label: "La Union" },
    { value: "Toro", label: "Toro" },
    { value: "La Victoria", label: "La Victoria" },
    { value: "Zarzal", label: "Zarzal" },
    { value: "Obando", label: "Obando" },
    { value: "El Cairo", label: "El Cairo" },
    { value: "Buenaventura", label: "Buenaventura" },
    { value: "Florida", label: "Florida" },
    { value: "Ansermanuevo", label: "Ansermanuevo" },
    { value: "Restrepo", label: "Restrepo" },
    { value: "Sevilla", label: "Sevilla" },
    { value: "Alcalá", label: "Alcalá" },
    { value: "Dagua", label: "Dagua" },
    { value: "Zaragoza", label: "Zaragoza" },
    { value: "Pereira", label: "Pereira" },
    { value: "Dosquebradas", label: "Dosquebradas" },
    { value: "La Virginia", label: "La Virginia" },
    { value: "Santa Rosa de Cabal", label: "Santa Rosa de Cabal" },
    { value: "Belen de Umbría", label: "Belen de Umbría" },
    { value: "Marsella", label: "Marsella" },
    { value: "Quinchia", label: "Quinchia" },
    { value: "Apia", label: "Apia" },
    { value: "Balboa", label: "Balboa" },
    { value: "Manizales", label: "Manizales" },
    { value: "Villamaria", label: "Villamaria" },
    { value: "Chinchiná", label: "Chinchiná" },
    { value: "Palestina", label: "Palestina" },
    { value: "Aguadas", label: "Aguadas" },
    { value: "La Dorada", label: "La Dorada" },
    { value: "Riosucio", label: "Riosucio" },
    { value: "Supia", label: "Supia" },
    { value: "Neira", label: "Neira" },
    { value: "Armenia", label: "Armenia" },
    { value: "Calarcá", label: "Calarcá" },
    { value: "Circasia", label: "Circasia" },
    { value: "Montenegro", label: "Montenegro" },
    { value: "La Tebaida", label: "La Tebaida" },
    { value: "Salento", label: "Salento" },
  ];

  return (
    <div>
      <CheckoutSteps shipping="true" />

      <Header />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg -mt-20 mb-10 space-x-4"
            onSubmit={submitHandler}
          >
            <h1 className="mb-6 font-sans text-2xl text-center">
              Datos de envío
            </h1>
            <div className="form-group">
              <label htmlFor="address_field" className="font-sans text-lg">
                Dirección
              </label>
              <input
                type="text"
                id="address_field"
                className="form-control font-sans text-lg font-light mb-3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="city_field" className="font-sans text-lg">
                Ciudad
              </label>
              <Select
                name="city"
                className="form-control font-sans text-lg font-light mb-3"
                placeholder="Selecione una ciudad"
                value={options.find((option) => option.value === city)}
                onChange={handleChangeCity}
                required
                options={options}
                noOptionsMessage={() => "No se encontró"}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone_field" className="font-sans text-lg">
                Telefono
              </label>
              <input
                type="text"
                id="phone_field"
                className="form-control font-sans text-lg font-light mb-3"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="postal_code_field" className="font-sans text-lg">
                Codigo Postal
              </label>
              <input
                type="text"
                id="postal_code_field"
                className="form-control font-sans text-lg font-light mb-3"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="country_field" className="font-sans text-lg">
                País
              </label>
              <input
                type="text"
                id="country_field"
                className="form-control font-sans text-lg font-light mb-3"
                value={country}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>

            <button
              id="shipping_btn"
              onClick={submitHandler}
              className="px-2 py-3 font-sans text-md bg-orange-500 hover:bg-orange-700 rounded-md text-white mt-8 hover:scale-105 duration-150"
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
