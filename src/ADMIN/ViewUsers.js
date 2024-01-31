import "./viewUser.css";
import { useState, useEffect } from "react";
function ViewUsers() {
  const [users, setusers] = useState([]);
  useEffect(() => {
    // Fetch data from the server when the component mounts
    fetch("http://localhost:5000/api/transactions")
      .then((response) => response.json())
      .then((data) => setusers(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  return (
    <div className="viewusers-container">
      <h3>Users</h3>
      <br></br>
      <br></br>
      <main className="viewusers-main">
        <table className="viewusers-table">
          <thead className="viewusers-thead">
            <tr>
              <th>SNO</th>
              <th>NAME</th>
              <th>NUMBER</th>
              <th>ORDER_ID</th>
              <th>PAYMENT_ID</th>
              <th>BIKE_ID</th>
              <th>BIKE_NAME</th>
              <th>AMOUNT</th>
              <th>START_DATE/TIME</th>
              <th>END_DATE/TIME</th>
              <th>TRANSACTION_DATE</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.userName}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.orderId}</td>
                <td>{user.paymentId}</td>
                <td>{user.bikeId}</td>
                <td>{user.bikeName}</td>
                <td>{user.amount}</td>
                <td>{user.startDate}</td>
                <td>{user.endDate}</td>
                <td>{user.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
  
}
export default ViewUsers;
