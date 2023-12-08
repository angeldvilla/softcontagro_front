import React from "react";

const Features = () => {
  return (
    <div className="feature-area feature-style-one mb-20 md:mb-32 pt-12 md:pt-24">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="col-span-1 lg:col-span-2">
            <div className="feature-card-alpha">
              <div className="feature-icon">
                <img
                  src="https://res.cloudinary.com/hba-solver/image/upload/v1657877004/features/feature-i1_kuhehk.svg"
                  alt="Fast Free Shipping"
                />
              </div>
              <div className="feature-content">
                <h5 className="text-lg font-bold">Envío rápido y gratuito</h5>
                <p>A todo momento</p>
              </div>
            </div>
          </div>
          <div className="col-span-1 lg:col-span-2">
            <div className="feature-card-alpha">
              <div className="feature-icon">
                <img
                  src="https://res.cloudinary.com/hba-solver/image/upload/v1657877004/features/feature-i2_a22qln.svg"
                  alt="24/7 Supports"
                />
              </div>
              <div className="feature-content">
                <h5 className="text-lg font-bold">
                  Soporte 24 horas al día, 7 días a la semana
                </h5>
                <p>Contacta con nosotros las 24 horas</p>
              </div>
            </div>
          </div>
          <div className="col-span-1 lg:col-span-2">
            <div className="feature-card-alpha">
              <div className="feature-icon">
                <img
                  src="https://res.cloudinary.com/hba-solver/image/upload/v1657877004/features/feature-i3_n1cql4.svg"
                  alt="100% Money Back"
                />
              </div>
              <div className="feature-content">
                <h5 className="text-lg font-bold">
                  100% de devolución de dinero
                </h5>
                <p>Garantía de devolución de dinero</p>
              </div>
            </div>
          </div>
          <div className="col-span-1 lg:col-span-2">
            <div className="feature-card-alpha">
              <div className="feature-icon">
                <img
                  src="https://res.cloudinary.com/hba-solver/image/upload/v1657877004/features/feature-i4_aavhpz.svg"
                  alt="100% Secure Payment"
                />
              </div>
              <div className="feature-content">
                <h5 className="text-lg font-bold">Pago 100% Seguro</h5>
                <p>Sus pagos están seguros con nosotros.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
