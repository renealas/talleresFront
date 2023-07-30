const API_ENDPOINT_MOVIES = "http://localhost:3010/api/movies";
const API_ENDPOINT_OPTIONS = "http://localhost:3010/api/options";

export const handleSubmit = async (formData) => {
  try {
    const parsedFormData = {
      ...formData,
      duration: parseInt(formData.duration),
      budget: parseInt(formData.budget),
    };

    const response = await fetch(API_ENDPOINT_MOVIES, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsedFormData),
    });
    const data = await response.json();
    console.log("Data sent successfully:", data);
    return data;
  } catch (error) {
    console.error("Error sending data:", error);
    throw error;
  }
};

export const handleGetAllMovies = async () => {
  try {
    const response = await fetch(API_ENDPOINT_MOVIES, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("Data recieved successfully:", data);
    return data;
  } catch (error) {
    console.error("Error recibing data:", error);
    throw error;
  }
};

export const handleGetAllOptions = async () => {
  try {
    const response = await fetch(API_ENDPOINT_OPTIONS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("Data recived successfully:", data);
    return data;
  } catch (error) {
    console.error("Error reciving data:", error);
    throw error;
  }
};

export const handleDisableOption = async (id) => {
  try {
    const parsedFormData = {
      ...id,
    };

    const response = await fetch(API_ENDPOINT_OPTIONS, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsedFormData),
    });
    const data = await response.json();
    console.log("Data sent successfully:", data);
    return data;
  } catch (error) {
    console.error("Error sending data:", error);
    throw error;
  }
};
