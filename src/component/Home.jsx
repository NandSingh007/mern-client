// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import { movies, slots } from '../component/Data'; // Assuming "seats" import is not needed here
import SideBar from './SideBar.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    // Define initial state for seats
    const initialSeatState = {
        A1: 0,
        A2: 0,
        A3: 0,
        A4: 0,
        D1: 0,
        D2: 0,
    };

    // State variables for movie selection, slot selection, and seats
    const [movie, setMovie] = useState("");
    const [slot, setSlot] = useState("");
    const [seats, setSeats] = useState(initialSeatState);

    // Handler for movie selection
    const moviehandler = (e) => {
        const value = e.target.value;
        setMovie(value);
    };

    // Handler for slot selection
    const slothandler = (e) => {
        const value = e.target.value;
        setSlot(value);
    };

    // Handler for changing seat counts
    const handleChange = (e, seatKey) => {
        const { value } = e.target;
        const updatedSeatKey = isNaN(seatKey) ? seatKey : parseInt(seatKey, 10).toString();
        setSeats(prevSeats => ({
            ...prevSeats,
            [updatedSeatKey]: parseInt(value, 10)
        }));
    };

    // Effect to log seat state when it changes
    useEffect(() => {
        console.log(seats);
    }, [seats]);

    // Filter out non-numeric keys for rendering seats
    const nonNumericKeys = Object.keys(seats).filter(key => isNaN(key));

    // Handler for submitting the form
    const handleSubmit = async () => {
        // Check if movie, slot, and seats are selected before submitting
        if (!movie || !slot || !Object.values(seats).some(count => count > 0)) {
            // Show an error toast notification for the user
            toast.error('Please Select All Fields Before Submitting.', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark'
            });
            return;
        }
    
        try {
            // Send the data to the server
            const result = await fetch("http://localhost:8080/api/booking", {
                method: 'post',
                body: JSON.stringify({
                    slot, seats, movie
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
    
            const data = await result.json();
            console.log(data);
    
            if (data) {
                // Show a success toast notification for successful submission
                toast.success('Data sent successfully', {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
    
                // Clear the fields after successful submission
                setMovie("");
                setSlot("");
                setSeats(initialSeatState);
            }
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };
    

    // Render the component
    return (
        <>
            <div className='container-fluid'>
                <div className='row main_div'>
                    <div className='col-md-8'>
                        <div className='left_div'>
                            {/* Movie selection */}
                            <section>
                                <h2 className='heading'>Select Movie</h2>
                                <div className='movie_collection'>
                                    {movies.map((item, i) => (
                                        <button
                                            key={i}
                                            className={`movie_name ${movie === item ? 'selected' : ''}`}
                                            value={item}
                                            onClick={moviehandler}>
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </section>

                            {/* Slot selection */}
                            <section>
                                <h2 className='heading'>Time Slot</h2>
                                <div className='movie_collection'>
                                    {slots.map((item, i) => (
                                        <button
                                            key={i}
                                            className={`slot_name ${slot === item ? 'selected' : ''}`}
                                            value={item}
                                            onClick={slothandler}>
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </section>

                            {/* Seats selection */}
                            <section>
                                <h2 className='heading'>Seats</h2>
                                <div className='d-flex flex-wrap'>
                                    {nonNumericKeys.map((seatKey, index) => (
                                        <div className="seat-wrapper" key={index}>
                                            <label className='seat_lebal' htmlFor={`seat-${seatKey}`}>{`Type ${seatKey}`}</label>
                                            <input
                                                className="form-control dark_highlight"
                                                aria-label="Small"
                                                aria-describedby="inputGroup-sizing-sm"
                                                type="number"
                                                name={seatKey}
                                                placeholder='value'
                                                value={seats[seatKey]}
                                                onChange={(e) => handleChange(e, seatKey)}
                                                style={{ width: "77%" }}
                                                id={`seat-${seatKey}`} />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                    <div className='col-md-4 right_div'>
                        {/* Render the Sidebar */}
                        <SideBar />
                    </div>
                </div>
                <div className='row'>
                    {/* Submit button */}
                    <div className='button_div'>
                        <button type="submit" value='sendData' onClick={handleSubmit}>submit</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;








