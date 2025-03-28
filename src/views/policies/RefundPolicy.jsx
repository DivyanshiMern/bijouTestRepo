import React from "react";

const RefundPolicy = () => {
  return (
    <div className="section">
      <div className="privacy-policy">
        <div className="container">
          <div className="wrap">
            <div className="left">
              <h1>Refund Policy</h1>
              <div className="img-wrap for-mobile">
                <img src="/images/about-story.png" alt="about-story" />
              </div>
              <ul>
                <li>
                  Once a refund is approved, it will be credited to your account
                  within 5-10 business days.
                </li>
                <li>
                  We are only able to process refunds via digital payment
                  methods, and not cash.
                </li>
                <li>
                  All refunds or buyback payments are contingent on the
                  product(s) passing our quality checks and may be delayed in
                  case there are any issues. The customer will be apprised of
                  the same.
                </li>
              </ul>
              <p>
                Every piece we create is rooted in responsibility—toward the
                planet, the people, and a better tomorrow.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="about-images-sec">
        <div className="wrap">
          <ul>
            {[1, 2, 3, 4].map((num) => (
              <li key={num}>
                <div className="img-wrap">
                  <img src={`/images/about-img${num}.png`} alt={`about-img${num}`} />
                  <img
                    src={`/images/about-img${num}-hover.png`}
                    alt={`about-img${num}-hover`}
                    className="mobile"
                  />
                </div>
                <div className="content">
                  <div className="content-wrap">
                    <div className="img-wrap">
                      <img
                        src={`/images/about-img${num}-hover.png`}
                        alt={`about-img${num}-hover`}
                      />
                    </div>
                    <p>
                      Every piece we create is rooted in responsibility—toward the
                      planet, the people, and a better tomorrow.
                    </p>
                    <a href="#">Read More</a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div> */}
    </div>
  );
};

export default RefundPolicy;
