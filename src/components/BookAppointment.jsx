import { useState } from "react";

import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { createAppointment } from "../store/apps/bookAppointment/bookAppointmentSlice";
const BookAppointment = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fname: "",
    email: "",
    phone: "",
    date: "",
    areaOfInterest: "",
  });
  const [date, setDate] = useState(null);
  console.log("date - ", date);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const appointmentData = {
      full_name: formData.fname,
      email: formData.email,
      contactNumber: formData.phone,
      date: date,
      areaOfInterest: formData.areaOfInterest,
    };
    dispatch(createAppointment(appointmentData));
    console.log("Form Submitted", appointmentData);
  };

  return (
    <div className="section">
      <div className="contact-form-sec">
        <div className="container">
          <div className="wrap">
            <div className="left">
              <div className="top">
                <h1>
                  Tailored just
                  <br /> for you!
                </h1>
              </div>
              <div className="bottom">
                <p>
                  Schedule a virtual consultation for a bespoke jewellery
                  experience with our experts.
                </p>
                <form className="contact-form">
                  <div className="form-field full">
                    <label>Email:</label>
                    <input
                      type="email"
                      placeholder="customercare@bijouco.com"
                      name="email"
                    />
                  </div>
                  <div className="form-field full">
                    <label>Phone:</label>
                    <input
                      type="text"
                      placeholder="(+91) 90000-78987"
                      name="phone"
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="right">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-field full">
                  <input type="text" placeholder="Your name" value={formData.fname}  onChange={handleChange} name="fname"/>
                </div>
                <div className="form-field full">
                  <input
                    type="email"
                    placeholder="Your email address"
                    
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field full">
                  <input
                    type="number"
                    placeholder="Your contact number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field full">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      label="Select Date & Time"
                      value={date}
                      onChange={(newDate) => setDate(newDate)}
                      renderInput={(params) => <TextField {...params} />}
                      PopperProps={{
                        modifiers: [
                          {
                            name: "preventOverflow",
                            options: {
                              boundary: "window",
                            },
                          },
                        ],
                      }}
                      slotProps={{
                        textField: { fullWidth: true },
                        desktopPaper: {
                          sx: {
                            "& .MuiClock-root": {
                              maxHeight: "180px",
                              overflowY: "auto",
                            },
                            "& .MuiPickersPopper-paper": {
                              maxHeight: "300px",
                              overflowY: "auto",
                            },
                            "& .MuiPickersTimeClock-root": {
                              maxHeight: "250px",
                            },
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                </div>

                <div className="form-field full">
                  <input
                    type="text"
                    placeholder="Topic of Interest"
                    required
                    name="areaOfInterest"
                    value={formData.areaOfInterest}
                    onChange={handleChange}
                  />
                </div>
                <div className="btn-wrap">
                  <button type="submit" className="common-btn submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
