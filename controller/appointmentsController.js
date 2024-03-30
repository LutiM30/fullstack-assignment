const appointmentsModel = require("../models/appointmentsModel");
const slotsModel = require("../models/slotsModel");
const userModel = require("../models/userModel");

const userLoggedIn = require("../utils/functions/userLoggedIn");

const renderPageWithData = (res, page, data) => res?.render(page, { ...data });

const appointmentsPageRendering = async (req, res) => {
  const dataToPass = {
    loggedIn: userLoggedIn(req),
    user: await userModel.findById(req.cookies.userLogin)?.lean(),
  };

  renderPageWithData(res, "appointments", dataToPass);
};

const createSlots = async (req, res) => {
  const errorSlots = (error = {}) => {
    const errorMessage =
      error?.message ||
      "ERROR 401: Something went wrong while creating new Blog: " + error;

    console.log({ error: errorMessage });

    res?.status(401)?.send({
      message:
        error?.message ||
        "ERROR 401: Something went wrong while creating new Blog: " + error,
    });

    res.redirect("/appointments");
  };

  const appointmentData = { ...req.body };

  if (
    appointmentData?.appointmentDate &&
    appointmentData?.startsAt &&
    appointmentData?.endsAt
  ) {
    try {
      const newAppointmentSlot = new slotsModel(appointmentData);

      await newAppointmentSlot.save();
      res.redirect("/appointments");
    } catch (error) {
      errorSlots(error);
    }
  } else {
    errorSlots();
  }
};

const g2PageWithSlots = async (req, res) => {
  const appointmentDate = req.query.appointmentDate || null;

  const dataToPass = {
    loggedIn: userLoggedIn(req),
    user: await userModel.findById(req.cookies.userLogin)?.lean(),
    slotsData: [],
  };

  if (appointmentDate) {
    const slotsData = await slotsModel.find({
      appointmentDate: new Date(appointmentDate),
      isSlotAvailable: true,
    });

    const slotsDataOptions = slotsData.map((slot, index) => {
      return {
        key: index + 1,
        value: slot._id,
        name: `${slot.startsAt} to ${slot.endsAt}`,
      };
    });

    dataToPass.slotsData = [...slotsDataOptions];

    renderPageWithData(res, "g2", dataToPass);
  } else {
    renderPageWithData(res, "g2", dataToPass);
  }
};

const createAppointment = async (req, res) => {
  const errorSlots = (error = {}) => {
    const errorMessage =
      error?.message ||
      "ERROR 401: Something went wrong while creating new Appointment: " +
        error;

    console.log({ "error message": errorMessage, error });

    res?.status(401)?.send({
      message:
        error?.message ||
        "ERROR 401: Something went wrong while creating new Blog: " + error,
    });

    res.redirect("/appointments");
  };

  const appointmentData = { ...req.body, userId: req.cookies.userLogin };

  if (appointmentData?.slotId && appointmentData?.userId) {
    try {
      const newAppointment = new appointmentsModel(appointmentData);
      try {
        const updatedSlot = await slotsModel.findByIdAndUpdate(
          appointmentData.slotId,
          { isSlotAvailable: false },
          { new: true }
        );

        if (updatedSlot) {
        } else {
          console.log("Slot not found or not updated");
        }
      } catch (error) {
        console.error("Error updating slot:", error);
      }

      await newAppointment.save();

      res.redirect("/g2");
    } catch (error) {
      errorSlots(error);
    }
  } else {
    errorSlots();
  }
};

module.exports = {
  renderPage: appointmentsPageRendering,
  createSlots,
  getSlots: g2PageWithSlots,
  createAppointment,
};
