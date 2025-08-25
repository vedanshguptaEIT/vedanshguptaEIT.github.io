import React, { useState } from "react";
import * as emailjs from "emailjs-com";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { meta } from "../../content_option";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { contactConfig } from "../../content_option";

// Firebase imports
import { auth, provider } from "../../firebaseConfig";
import { signInWithPopup, signOut } from "firebase/auth";

export const ContactUs = () => {
  const [formData, setFormdata] = useState({
    email: "",
    name: "",
    message: "",
    loading: false,
    show: false,
    alertmessage: "",
    variant: "",
  });

  const [verifiedUser, setVerifiedUser] = useState(null);

  // Google Sign-In Handler
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const email = user.email;

        if (email.endsWith("@gmail.com")) {
          setVerifiedUser(user);

          // Autofill email and name
          setFormdata({
            ...formData,
            email: email,
            name: user.displayName || "",
          });

          setFormdata((prev) => ({
            ...prev,
            show: true,
            alertmessage: `Signed in as: ${email}`,
            variant: "success",
          }));
        } else {
          setFormdata((prev) => ({
            ...prev,
            show: true,
            alertmessage: "Only Gmail users are allowed.",
            variant: "danger",
          }));
        }
      })
      .catch((error) => {
        console.error(error);
        setFormdata((prev) => ({
          ...prev,
          show: true,
          alertmessage: "Google Sign-In failed. Try again.",
          variant: "danger",
        }));
      });
  };

  // Google Sign-Out Handler
  const handleGoogleSignOut = () => {
    signOut(auth)
      .then(() => {
        setVerifiedUser(null);
        setFormdata({
          email: "",
          name: "",
          message: "",
          loading: false,
          show: true,
          alertmessage: "Signed out successfully.",
          variant: "info",
        });
      })
      .catch((error) => {
        console.error(error);
        setFormdata((prev) => ({
          ...prev,
          show: true,
          alertmessage: "Error signing out. Try again.",
          variant: "danger",
        }));
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!verifiedUser) {
      setFormdata((prev) => ({
        ...prev,
        show: true,
        alertmessage: "Please sign in with Google before sending a message.",
        variant: "warning",
      }));
      return;
    }

    setFormdata({ ...formData, loading: true });

    const templateParams = {
      from_name: formData.email,
      user_name: formData.name,
      to_name: contactConfig.YOUR_EMAIL,
      message: formData.message,
    };

    emailjs
      .send(
        contactConfig.YOUR_SERVICE_ID,
        contactConfig.YOUR_TEMPLATE_ID,
        templateParams,
        contactConfig.YOUR_USER_ID
      )
      .then(
        (result) => {
          setFormdata({
            ...formData,
            loading: false,
            message: "",
            show: true,
            alertmessage: "SUCCESS! Thank you for your message",
            variant: "success",
          });
        },
        (error) => {
          console.error(error.text);
          setFormdata({
            ...formData,
            loading: false,
            show: true,
            alertmessage: "Failed to send message. Try again later.",
            variant: "danger",
          });
        }
      );
  };

  const handleChange = (e) => {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <HelmetProvider>
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{meta.title} | Contact</title>
          <meta name="description" content={meta.description} />
        </Helmet>

        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">Contact Me</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>

        <Row className="sec_sp">
          <Col lg="12">
            <Alert
              variant={formData.variant}
              className={`rounded-0 co_alert ${formData.show ? "d-block" : "d-none"}`}
              onClose={() => setFormdata({ ...formData, show: false })}
              dismissible
            >
              <p className="my-0">{formData.alertmessage}</p>
            </Alert>
          </Col>

          <Col lg="5" className="mb-5">
            <h3 className="color_sec py-4">Get in touch</h3>
            <address>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${contactConfig.YOUR_EMAIL}`}>{contactConfig.YOUR_EMAIL}</a>
              <br />
              <br />
              {contactConfig.hasOwnProperty("YOUR_FONE") && (
                <p>
                  <strong>Phone:</strong> {contactConfig.YOUR_FONE}
                </p>
              )}
            </address>
            <p>{contactConfig.description}</p>
          </Col>

          <Col lg="7" className="d-flex flex-column align-items-start">
            {/* Google Sign-In / Sign-Out Buttons */}
            {!verifiedUser ? (
              <button onClick={handleGoogleSignIn} className="btn btn-primary mb-3">
                Sign in with Google to Contact
              </button>
            ) : (
              <>
                <p className="mb-2">Signed in as: {verifiedUser.email}</p>
                <button onClick={handleGoogleSignOut} className="btn btn-danger mb-3">
                  Sign Out
                </button>
              </>
            )}

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="contact__form w-100">
              <Row>
                <Col lg="6" className="form-group">
                  <input
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={formData.name || ""}
                    type="text"
                    required
                    onChange={handleChange}
                    disabled={!verifiedUser}
                  />
                </Col>
                <Col lg="6" className="form-group">
                  <input
                    className="form-control rounded-0"
                    id="email"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={formData.email || ""}
                    required
                    onChange={handleChange}
                    disabled
                  />
                </Col>
              </Row>
              <textarea
                className="form-control rounded-0"
                id="message"
                name="message"
                placeholder="Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={!verifiedUser}
              ></textarea>
              <br />
              <Row>
                <Col lg="12" className="form-group">
                  <button className="btn ac_btn" type="submit" disabled={!verifiedUser}>
                    {formData.loading ? "Sending..." : "Send"}
                  </button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
      <div className={formData.loading ? "loading-bar" : "d-none"}></div>
    </HelmetProvider>
  );
};
