import React from "react";

const ReturnPolicy = () => {
  return (
    <div className="section">
      <div className="privacy-policy">
        <div className="container">
          <div className="wrap">
            <div className="left">
              <h1>Return Policy</h1>
              <div className="img-wrap for-mobile">
                <img src="/images/about-story.png" alt="about-story" />
              </div>
              <p>
                Our 10-day Return Policy gives you the time to be sure that your purchase is perfect for you. If you need to return the product for any reason, you can opt for an easy return within 10 days of the delivery of the product.
              </p>
              <h3>How can you request a return?</h3>
              <ul>
                <li>
                  To request return of the product(s) under the 10-day return policy, please place a return request through your account on www.bijouco.in or email us at hello@bijouco.in, and attach the following documents:
                </li>
                <ul>
                  <li>Photo of original product(s)</li>
                  <li>Original or copy of invoice</li>
                  <li>Product certificate</li>
                  <li>Copy of valid government ID of the person mentioned on the invoice issued by BijouCo.</li>
                  <li>Bank account details of the person mentioned on the invoice issued by BijouCo.</li>
                  <li>Address for product return pick-up</li>
                </ul>
              </ul>
              <h3>How do we determine if your product is eligible for the 10-day return policy?</h3>
              <ul>
                <li>We verify all the received documents against our records to check for legitimacy of purchase.</li>
                <li>We must receive all documents mentioned above in order to determine eligibility for a 10-day return. We are unable to process any requests without these details.</li>
                <li>We do not accept return of products which have been bought under the lifetime exchange scheme.</li>
                <li>We do not accept returns of charms and engraved/personalized or customized products.</li>
              </ul>
              <h3>How should you send your product to us?</h3>
              <ul>
                <li>Once we confirm via email that we’re able to process your request, you will need to send us the original product(s). You can do this through one of the following methods:</li>
                <ul>
                  <li>Visit us at our registered office in Mumbai - 3rd Floor Rain Basera, JVPD Scheme Road, Gulmohar Colony, Juhu, Mumbai, Maharashtra - 400049.</li>
                  <li>Mail us the product(s) in secure packaging to the above address and provide us with the tracking number via email (hello@bijouco.in).</li>
                </ul>
                <li>In the case that you mail us the product(s), please pack and seal the product properly, to avoid damage/loss during transit. Bijou Co. will not be responsible for any damage/loss that may occur during transit.</li>
              </ul>
              <h3>What happens after we receive the product?</h3>
              <ul>
                <li>Once we receive the product(s), our quality assurance team will perform a review within 10 business days to check for legitimacy and signs of damage, wear, alteration, re-size etc. and determine the final value. The decision of the quality assurance team shall be final and binding.</li>
                <li>A logistics fee of Rs.1200 will be deducted for any products returned under the 10-day return policy.</li>
                <li>Any discounts applied at the time of purchase will be deducted from the final return value.</li>
              </ul>
              <h3>How and when will you receive your refund?</h3>
              <ul>
                <li>Once a refund is approved, it will be credited to your account within 5-10 business days.</li>
                <li>We are only able to process refunds via digital payment methods, and not cash.</li>
              </ul>
              <span> </span>
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
                  <img src={`/images/about-img${num}-hover.png`} alt={`about-img${num}-hover`} className="mobile" />
                </div>
                <div className="content">
                  <div className="content-wrap">
                    <div className="img-wrap">
                      <img src={`/images/about-img${num}-hover.png`} alt={`about-img${num}-hover`} />
                    </div>
                    <p>Every piece we create is rooted in responsibility—toward the planet, the people, and a better tomorrow.</p>
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

export default ReturnPolicy;
