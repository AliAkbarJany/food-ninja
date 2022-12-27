import { useEffect, useState } from "react";

/* ai khane (userInformation = user / guser) 

  ai (user/guser) signUp page thake ashtese... */
  
const useToken = (userInformation) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    console.log('User information inside use Token',userInformation)
    const email = userInformation?.user?.email;
    // console.log(email);

    const currentUser = { email: email };
    if (email) {
      fetch(`https://food-ninja-server.onrender.com/users/${email}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(currentUser),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data inside usetoken", data);
        });
    }
  }, [userInformation]);
  return [token, setToken];
};

export default useToken;
