const fetchBookings = async () => {
    try {
      const response = await fetch("/api/booking/list_booking", {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: "Bearer hehe", 
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error fetching bookings:", errorData.message);
        return;
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };
  
  export default fetchBookings;
  