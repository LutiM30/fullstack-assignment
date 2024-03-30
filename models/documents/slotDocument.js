const dateValidator = {
  validator: (value) => value >= new Date(),
  message: (props) => `${props.value} should not be older than today's date`,
};

const requiredField = (data) => {
  return { ...data, required: true };
};

const startsAtValidator = [
  {
    validator: function (value) {
      return value !== this.endsAt;
    },
    message: "startsAt and endsAt cannot be the same",
  },
  {
    validator: function (value) {
      return value < this.endsAt;
    },
    message: "startsAt should be less than endsAt",
  },
  {
    validator: (value) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(value),
    message: (props) =>
      `${props.value} is not a valid time string in "HH:MM" format`,
  },
];

const endsAtValidator = [
  {
    validator: function (value) {
      const [startHours, startMinutes] = this.startsAt.split(":").map(Number);
      const [endHours, endMinutes] = value.split(":").map(Number);
      const hourDifference =
        endHours - startHours + (endMinutes - startMinutes) / 60;

      return hourDifference >= 1;
    },
    message: "endsAt should be atleast 1 hour ahead of starting time",
  },
  {
    validator: (value) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(value),
    message: (props) =>
      `${props.value} is not a valid time string in "HH:MM" format`,
  },
];

module.exports = {
  appointmentDate: requiredField({
    type: Date,
    validate: dateValidator,
  }),

  startsAt: requiredField({
    type: String,
    validate: startsAtValidator,
  }),
  endsAt: requiredField({
    type: String,
    validate: endsAtValidator,
  }),
  isSlotAvailable: requiredField({
    type: Boolean,
    default: true,
  }),
};
