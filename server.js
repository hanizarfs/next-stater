import { cookies } from "next/headers";

export function getServerComponent() {
  // Define a function to log the value of the "role" cookie
  const logRole = () => {
    const cookieStore = cookies();
    const role = cookieStore.get("role");
    console.log("Role:", role || "Not set");
  };

  // Log the initial value
  logRole();

  // Set an interval to log the value every 5 seconds (adjust as needed)
  const intervalId = setInterval(logRole, 5000);

  // Clear the interval when the component unmounts (optional)
  return () => {
    clearInterval(intervalId);
  };

  return {
    props: {
      role: "", // No need to pass the role as a prop
    },
  };
}
