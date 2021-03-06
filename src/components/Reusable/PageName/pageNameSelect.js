const selectPageName = (query) => {
  switch (query) {
    case "index":
      return "Dashboard";
    case "profile":
      return "Profile-Settings";
    case "change-password":
      return "Change Password";
    case "doctors":
      return "Doctors";
    case "medicines":
      return "Medicines";
    case "schedule-timings":
      return "Schedule Timings";
    case "/doctor/booking":
      return "Doctor Booking";
    case "/medicines/detail":
      return "Product Page";
    case "/medicines/cart":
      return "Cart";
    case "/medicines/checkout":
      return "Product Checkout";
    default:
      return;
  }
};
export default selectPageName;
