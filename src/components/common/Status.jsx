import React, { useEffect, useState } from "react";



const RecentStatus = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch("https://io.adafruit.com/api/v2/hpro1357/feeds")
          .then(res => res.json())
          .then(
                (result) => {
                    console.log(result);
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
          )
        }, [])
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <div class="container">
                    <div class="row">
                        {items.map(item => (
                            <div class="col-6 col-sm-4">
                                <div class="card col text-center">
                                    <div class="card-body">
                                    {item.name}:  {item.last_value}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </>
          );
        };
    }
    
  
  export default RecentStatus;