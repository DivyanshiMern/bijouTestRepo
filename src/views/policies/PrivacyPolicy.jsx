import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="section">
      <div className="privacy-policy">
        <div className="container">
          <div className="wrap">
            <h1>Privacy Policy</h1>
            <h3>Collection of Personally Identifiable Information</h3>
            <p>
              We collect email addresses and phone numbers from you when you register on the website. This enables us to record your wish lists, last seen products, and track orders. We also use your contact information to send you offers and recommendations based on your previous orders, your browsing history, and your interests. We may disclose to third-party services certain personally identifiable information listed below:
            </p>
            <ul>
              <li>Information you provide us such as name, email, mobile phone number</li>
              <li>Information we collect as you access and use our service, including device information, location, and network carrier</li>
              <li>
                This information is shared with third-party service providers so that we can:
                <ul>
                  <li>Personalize your experience on the website</li>
                  <li>Perform behavioral analytics</li>
                </ul>
              </li>
            </ul>
            <h3>Use of Demographic and Profile Data</h3>
            <p>
              We use personal information to provide the services you request. We use your personal information to troubleshoot problems, collect fees owed, measure interest in our products and services, inform you about online and offline offers, and customize your experience. In our efforts to continually improve our product and service offerings, we collect and analyze demographic and profile data about our users' activity on our website. We identify and use your IP address to help diagnose problems with our server and to administer our website.
            </p>
            <h3>Security Precautions</h3>
            <p>
              Our site has stringent security measures in place to protect the loss, misuse, and alteration of the information under our control. Whenever you change or access your account information, we offer the use of a secure server. Once your information is in our possession, we adhere to strict security guidelines, protecting it against unauthorized access.
            </p>
            <h3>Cookies</h3>
            <p>
              Cookies are small pieces of information saved by your browser onto your computer. Cookies are used to record various aspects of your visit and assist WWW.BIJOUCO.IN in providing you with uninterrupted service. We do not use cookies to save Personal Information for outside uses.
            </p>
            <h3>Choice/Opt-Out</h3>
            <p>
              We provide all users with the opportunity to opt out of receiving non-essential (promotional, marketing-related) communications from us on behalf of our partners and from us in general after setting up an account.
            </p>
            <h3>Questions?</h3>
            <p>
              Questions regarding this can be directed to the following address: hello@bijouco.in
            </p>
            <p>
              BY USING THE WEBSITE OR NATIVE MOBILE APPLICATIONS, YOU SIGNIFY YOUR AGREEMENT TO THE TERMS OF THIS PRIVACY POLICY. WWW.BIJOUCO.IN RESERVES THE RIGHT, IN OUR SOLE DISCRETION, TO CHANGE, MODIFY, ADD OR DELETE PORTIONS OF THE TERMS OF THIS PRIVACY POLICY AT ANY TIME.
            </p>
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

export default PrivacyPolicy;
