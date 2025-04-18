import React, { useState, useEffect, useContext } from 'react';
import { TextField, Button, Grid, Typography, Container } from '@mui/material';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { User } from "../context/User";
import axios2 from 'axios';
import { TailSpin } from 'react-loader-spinner';
import backgroundImage from '../utility/pexels-expect-best-79873-323705.jpg'; // Import your background image

const ParkingForm = () => {
    const styles = {
        container: {
          position: 'relative',
          borderRadius: '8px',
          maxWidth: '600px',
          margin: 'auto',
          textAlign: 'center',
          overflow: 'hidden', // Hide overflow to prevent blurry edges
        },
        backgroundImage: {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          filter: 'blur(5px)', // Apply blur effect
          backgroundImage: `url(${backgroundImage})`, // Use the imported image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        },
        heading: {
            marginBottom: '2rem',
            fontSize: '2rem',
            color: '#343a40',
          },
        overlay: {
            backgroundColor: 'rgba(255, 255, 255, 0.5)', // Add a semi-transparent overlay
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 0 20px rgba(0,0,0,0.1)',
          },
    };
    const [loading, setLoading] = useState(false);
    const axios = useAxiosPrivate();
    const { address, arrivalDate, departureDate,newUser } = useContext(User);
     console.log(newUser.email)
    const [formData, setFormData] = useState({
        parkingLotName: '',
        locationType: '',
        latitude: '',
        longitude: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: newUser.email,
        totalSlots: ''
    });

    // Define locationType from formData
    const { locationType } = formData;

    const getCoordinates = async (address) => {
        const apiKey = '55810e9a0db5484fae278428320f9add';
        const encodedAddress = encodeURIComponent(address);
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodedAddress}&key=${apiKey}`;

        try {
            const response = await axios2.get(url);

            if (response.data.results && response.data.results.length > 0) {
                const { lat, lng } = response.data.results[0].geometry;
                console.log("Coordinates:", lat, lng);
                return { lat, lng };
            } else {
                throw new Error('No results found for the address.');
            }
        } catch (error) {
            console.error('Error getting coordinates:', error.message);
            throw error;
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleGetCoordinatesClick = async () => {
        if (locationType.trim() !== '') {
            try {
                const { lat, lng } = await getCoordinates(locationType);
                setFormData(prevFormData => ({
                    ...prevFormData,
                    latitude: lat,
                    longitude: lng
                }));
            } catch (error) {
                console.error("Error getting coordinates:", error.message);
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("/park/addcomp", formData);
            swal({
                title: "Successfully registered",
                icon: "success",
                button: false,
                timer: 3000
            });
            setFormData({
                parkingLotName: '',
                locationType: '',
                latitude: '',
                longitude: '',
                firstName: '',
                lastName: '',
                phone: '',
                email: '',
                totalSlots: ''
            });
            setLoading(false);
            navigate('/dashboard');
        } catch (error) {
            console.error("Error adding data:", error.message);
            setLoading(false);
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timeout);
    }, [loading]);

    return (
        <>
        <div style={styles.backgroundImage}></div>
        <Container maxWidth="sm">
        <div style={styles.overlay}>
        <h1 style={styles.heading}>Register your Parking</h1>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Parking Lot Name"
                            name="parkingLotName"
                            variant="outlined"
                            value={formData.parkingLotName}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            fullWidth
                            label="Location"
                            name="locationType"
                            variant="outlined"
                            value={formData.locationType}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleGetCoordinatesClick}
                            style={{ width: '100px' }}
                        >
                            Get Coordinates
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Latitude"
                            name="latitude"
                            variant="outlined"
                            value={formData.latitude}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Longitude"
                            name="longitude"
                            variant="outlined"
                            value={formData.longitude}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Total Slots"
                            name="totalSlots"
                            variant="outlined"
                            value={formData.totalSlots}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Personal Details
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="First Name"
                            name="firstName"
                            variant="outlined"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            name="lastName"
                            variant="outlined"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Phone"
                            name="phone"
                            variant="outlined"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            variant="outlined"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    {loading ? <TailSpin height={25} color="white" /> : 'Register'}
                </Button>
            </form>
            </div>

        </Container>
        </>
    );
}

export default ParkingForm;
