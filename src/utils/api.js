import axios from "axios";
import { BASE_URL } from "../redux/actionTypes";

export const getCurrentProfile = async (role, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.get(
      `${BASE_URL}/${role}/profile/current`,
      config
    );
    return { data };
  } catch (error) {
    return {
      message:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};

export const updateCurrentProfile = async (role, token, updatedData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.put(
      `${BASE_URL}/${role}/profile/update`,
      updatedData,
      config
    );
    console.log(data);
    console.log(role, "On api");
    return { data };
  } catch (error) {
    return {
      message:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};

// update  password
// get all  booking
export const updatePassword = async (token, passwordData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.put(
      `${BASE_URL}/user/password/update`,
      passwordData,
      config
    );
    return { status: data.status };
  } catch (error) {
    return {
      message:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};

// get the profile of patient and doctor according to the role

export const getSingleProfile = async (role, id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const { data } = await axios.get(
      `${BASE_URL}/${role}/profile/single/${id}`,
      config
    );
    return { data };
  } catch (error) {
    return {
      message:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};

// get all the doctors

export const getAllDoctor = async (query = {}) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    let URL = `${BASE_URL}/doctor/profile/all`;
    const { gender, specialization } = query;
    if (gender && specialization) {
      URL = `${BASE_URL}/doctor/profile/all?specialization=${specialization}&gender=${gender}`;
    } else if (gender) {
      URL = `${BASE_URL}/doctor/profile/all?gender=${gender}`;
    } else if (specialization) {
      URL = `${BASE_URL}/doctor/profile/all?specialization=${specialization}`;
    }
    const { data } = await axios.get(`${URL}`, config);
    return { data };
  } catch (error) {
    return {
      message:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};

// get all the top doctors

export const getAllTopDoctor = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const { data } = await axios.get(
      `${BASE_URL}/doctor/profile/all?q=top`,
      config
    );
    return { data };
  } catch (error) {
    return {
      message:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};

// create booking
export const createBooking = async (token, bookingData, doctorId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.post(
      `${BASE_URL}/booking/create/${doctorId}`,
      bookingData,
      config
    );
    return { status: data.status };
  } catch (error) {
    return {
      message:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};

// get all  booking
export const getAllBooking = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.get(`${BASE_URL}/booking/all/`, config);
    return { bookings: data.bookings };
  } catch (error) {
    return {
      message:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};

// get all  booking
export const updateBookingStatus = async (token, status, bookingId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.put(
      `${BASE_URL}/booking/update/${bookingId}?q=${status}`,
      null,
      config
    );
    return { status: data.status };
  } catch (error) {
    return {
      message:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};

// get all the medicine

export const getAllProducts = async (query = {}) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    let URL = `${BASE_URL}/product`;
    const { priceRange, category } = query;
    if (priceRange && category) {
      URL = `${BASE_URL}/product/?category=${category}&range=${priceRange}`;
    } else if (priceRange) {
      URL = `${BASE_URL}/product/?range=${priceRange}`;
    } else if (category) {
      URL = `${BASE_URL}/product/?category=${category}`;
    }
    const { data } = await axios.get(`${URL}`, config);
    return { data };
  } catch (error) {
    return {
      message:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};

// get all the medicine

export const getProductById = async (productId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    let URL = `${BASE_URL}/product/${productId}`;
    const { data } = await axios.get(`${URL}`, config);
    return { product: data };
  } catch (error) {
    return {
      message:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};
export const addNewReview = async (token, productId, reviewData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    let URL = `${BASE_URL}/product/${productId}/reviews`;
    const { data } = await axios.put(`${URL}`, reviewData, config);
    return { success: data.message };
  } catch (error) {
    return {
      message:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};

// get all  booking
export const categoryStats = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const { data } = await axios.get(
      `${BASE_URL}/doctor/category/stats`,
      config
    );
    return { stats: data.stats };
  } catch (error) {
    return {
      message:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};
