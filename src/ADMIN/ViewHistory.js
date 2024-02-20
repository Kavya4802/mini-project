import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ViewHistory() {
  const [uniqueUsers, setUniqueUsers] = useState([]);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    fetch("http://localhost:5000/api/transactions")
      .then((response) => response.json())
      .then((data) => {
        // Create a set of unique user combinations
        const uniqueUserSet = new Set(data.map(user => JSON.stringify({ email: user.userEmail, name: user.userName })));
        const uniqueUsersArray = Array.from(uniqueUserSet).map(userString => JSON.parse(userString));
        setUniqueUsers(uniqueUsersArray);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>View History</h1>
      <ul>
        {uniqueUsers.map((user, index) => (
          <li key={index}>
            
            <Link to={`/orders/${encodeURIComponent(user.email)}`}>
            <h3>Name: {user.name}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewHistory;
