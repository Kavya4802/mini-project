import "./viewbike.css";
import { useState, useEffect } from "react";
function ViewBike() {
  const [bikes, setBikes] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/getbikes")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          setBikes(data.bikes);
          console.log(data.bikes);
        } else {
          console.log("Error fetching bikes");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/bikesinfo/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          const updatedBikes = bikes.filter((bike) => bike.id !== id);
          alert("deleted succesully");
          setBikes(updatedBikes);
          window.location.reload();
        } else {
            alert("Error deleting bike")
          console.log("Error deleting bike");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const handleUpdate = (id, updatedBike) => {
  //   fetch(`http://localhost:5000/bikesinfo/${id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(updatedBike),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.status === "ok") {
  //         const updatedBikes = bikes.map((bike) => {
  //           if (bike.id === id) {
  //             return { ...bike, ...updatedBike };
  //           } else {
  //             return bike;
  //           }
  //         });
  //         setBikes(updatedBikes);
  //         alert("Updated successfully");
  //       } else {
  //         alert("Error updating bike");
  //         console.log("Error updating bike");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  return (
    <div>
      <h3>Your added bikes</h3>
      <br></br>
      <br></br>
      <main className="site-main">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bikes.map((bike, index) => {
              return (
                <tr key={bike.id}>
                  <td>{index + 1}</td>
                  <td>{bike.brand}</td>
                  <td>{bike.model}</td>
                  <td>{bike.price}</td>
                  <td>{bike.status}</td>
                  <td>
                    <a href="/bikeupdate" className="btn border-shadow update">
                      <span className="text-gradient">
                        <i className="fas fa-pencil-alt"
                        // onClick={()=>handleUpdate(bike._id,{price:10})}
                        ></i>
                      </span>
                    </a>
                    <a href className="btn border-shadow delete">
                      <span className="text-gradient">
                        <i
                          className="fas fa-times"
                          onClick={() => handleDelete(bike._id)}
                        ></i>
                      </span>
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </div>
  );
}
export default ViewBike;
