const verifyUser = async (user) => {
  const { name, email } = user;
  fetch("/api/verify-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email }),
    credentials: "same-origin",
  })
    .then((response) => response.json())
    .then((data) => {
      // handle success
      console.log(data);
    })
    .catch((error) => {
      console.error("Error getting the user 'utils/verify-user':", error);
    });
};

export default verifyUser;
