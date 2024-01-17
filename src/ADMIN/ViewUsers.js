
import { useState, useEffect } from "react";
function ViewUsers() {
  const [users, setusers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/getusers")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          setusers(data.users);
          console.log(data.users);
        } else {
          console.log("Error fetching bikes");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h3>Users</h3>
      <br></br>
      <br></br>
      <main className="site-main">
        <table className="table">
          <thead className="thead-dark">
            <tr>
                <th>SNO</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>NUMBER</th>
              <th>ADDRESS</th>
              <th>CITY</th>
              <th>PINCODE</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.no}</td>
                  <td>{user.add}</td>
                  <td>{user.city}</td>
                  <td>{user.pincode}</td>

                 
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </div>
  );
}
export default ViewUsers;
