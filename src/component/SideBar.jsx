// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import '../styles/sidebar.css';
import Spinner from 'react-bootstrap/Spinner';

function SideBar() {
    // State variables for bookings, loading, and error
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // UseEffect to fetch data from the API
    useEffect(() => {
        fetchData();
    }, []);
    async function fetchData() {
        try {
            
            const response = await fetch('http://localhost:8080/api/booking');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            // Check if the data is an array or a single object
            if (Array.isArray(data.users)) {
                setBookings(data.users);
            } else {
                setBookings([data.users]); // Convert the single object into an array
            }

            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    if (loading) {
        return <div>   <Spinner animation="grow" variant="info" /></div>; // Show spinner while loading
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Show error message if data fetching fails
    }

    return (
        <div>
            <h1 className='side_bar_heading'>Booking List</h1>
            <ul className='movie_detail'>
                {bookings.length === 0 ? (
                    <p>No previous data available</p>
                ) : (
                    bookings.map((booking) => (
                        // Add a conditional check to ensure booking is valid before rendering
                        booking && booking._id ? (
                            <li key={booking._id}>
                                {booking.movie && (
                                    <p><span>Movie</span> : {booking.movie}</p>
                                )}
                                {booking.slot && (
                                    <p><span>Slot</span> : {booking.slot}</p>
                                )}
                                {booking.seats && (
                                    <div>
                                        <p><span>Seats</span> :</p>
                                        <ul>
                                            {Object.entries(booking.seats).map(([seat, count]) => (
                                                <li key={seat}>
                                                    {seat}: {count}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        ) : <p className='previus_Data'>No Previous Record</p>
                    ))
                )}
            </ul>
        </div>
    );
}

export default SideBar;
