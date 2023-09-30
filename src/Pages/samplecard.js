{/* 
     // ----------------------------imp!----------------
    // const [bikes, setBikes] = useState([]);
  
    // useEffect(() => {
    //   fetch('http://localhost:5000/getbikes')
    //     .then(response => response.json())
    //     .then(data => {
    //       if (data.status === 'ok') {
    //         setBikes(data.bikes);
    //         console.log(data.bikes);
    //       } else {
    //         console.log('Error fetching bikes');
    //       }
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // }, []);
   
    // return(

    //   <Row>
    //     {/* <div key={bike.id}>
    //     <img src= alt="bike" />
    //       <h2>{bike.brand}</h2>
    //       <h2>Model:{bike.model}</h2>
    //       <p>Price: {bike.price}</p> */}
    //   {bikes.map(bike => (
      
    //       <Col md={3}>
    //     <Card>
    //     <Card.Img variant="top" src={`http://localhost:5000/images/${bike.picture}`} />
    //       <Card.Body>
    //         <Card.Title>{bike.price}</Card.Title>
    //         <hr></hr>
    //         <Link to="/register">
    //         <Button variant="primary">Book Now</Button>
    //         </Link>
    //        </Card.Body>
    //     </Card>
    //   </Col>
       
    //   ))}
    //   </Row>

        
    // // <center><a href="/" style={{marginTop:5}}>View All</a></center>
      
    // )