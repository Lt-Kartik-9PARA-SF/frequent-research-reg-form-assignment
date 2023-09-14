import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormData from '../components/FormData'
import { DateTime } from 'luxon';
function RegistrationForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        gender: 'male',
        dateOfBirth: '',
        country: '',
        state: '',
        city: '',
    });

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [age, setAge] = useState(null);
    const [error, setError] = useState('');
    const [formSubmitted , setFormSubmitted] = useState(false);


    useEffect(() => {
        //we can replace this url after hosting backend to server
        axios.get('http://localhost:3001/countries')
            .then(response => {
                console.log('resp = ', response);
                setCountries(response.data.countries);
                setStates(response.data.countries[0].states);
                setCities(response.data.countries[0].states[0].cities);
                setFormData({
                    ...formData,
                    country: response.data.countries[0].name,
                    state: response.data.countries[0].states[0].name,
                    city: response.data.countries[0].states[0].cities[0],
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Connecting with server failed , please try again')
            });


    }, []);

    useEffect(() => {
        if (formData.dateOfBirth) {
            const birthDate = DateTime.fromISO(formData.dateOfBirth);
            const today = DateTime.now();
            const calculatedAge = Math.round(today.diff(birthDate, 'years').years);


            if (calculatedAge < 14) {
                setError('Age must be at least 14 years.');
                setAge('');
            } else {
                setAge(`${calculatedAge} Years`);
                setError('');
            }
        }
    }, [formData.dateOfBirth]);

    const validateName = (name) => {
        const regex = /^[A-Za-z]+$/;
        return regex.test(name);
    };

    const handleInputChange = (e) => {

        const { name, value } = e.target;

        if (name === 'firstName' && !validateName(value) && value) {
            setError('First Name should contain alphabetic characters only.');
            return;
        }
        else if (name === 'lastName' && !validateName(value) && value) {
            setError('Last Name should contain alphabetic characters only.');
            return;
        }
        else {
            setError('')
        }
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCountryChange = (event) => {
        const selectedCountry = event.target.value;
        const selectedCountryData = countries.find(country => country.name === selectedCountry);
        const selectedState = selectedCountryData.states[0].name;
        const selectedCity = selectedCountryData.states[0].cities[0];

        setFormData({
            ...formData,
            country: selectedCountry,
            state: selectedState,
            city: selectedCity,
        });

        setStates(selectedCountryData.states);
        setCities(selectedCountryData.states[0].cities);
    };

    const handleStateChange = (event) => {
        const selectedState = event.target.value;
        const selectedStateData = states.find(state => state.name === selectedState);
        const selectedCity = selectedStateData.cities[0];

        setFormData({
            ...formData,
            state: selectedState,
            city: selectedCity,
        });

        setCities(selectedStateData.cities);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!error){
            axios.post('http://localhost:3001/register', formData)
            .then(response => {
                console.log(response);
                setFormSubmitted(true);
            })
            .catch(error => {
                console.error('Error registering user:', error);
                setError('Error registering user please check all input values');
            });
        }else{
            setError('Please enter data correctly')
        }

        
    };
    if(formSubmitted){
        return <FormData formData={formData} />
    }

    return (
        <div className='flex justify-center'>

            <form onSubmit={handleSubmit} className=' min-w-[400px] mt-5 flex flex-col justify-center gap-y-1 align-middle bg-slate-300 p-4 rounded-md'>
                <h2 className='text-[24px]  mb-1'>Registration Form</h2>

                <div className='min-h-[25px]'>
                    {error && <div className="text-[red] text-[15px]">{error}</div>}
                </div>
                <div>
                    <label className=''>
                        First Name:
                        <input
                            type="text"
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Last Name:
                        <input
                            type="text"
                            name="lastName"
                            required
                            value={formData.lastName}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Email:
                        <input
                            type='email'
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <div>
                    <label>Gender:</label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={formData.gender === 'male'}
                                onChange={handleInputChange}
                                required
                            />
                            Male
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                required
                                checked={formData.gender === 'female'}
                                onChange={handleInputChange}
                            />
                            Female
                        </label>
                    </div>

                </div>
                <div>
                    <label>
                        Date of Birth:
                        <input
                            type="date"
                            name="dateOfBirth"
                            required
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Age:
                        <input
                            type="text"
                            name="age"
                            value={age !== null ? age : ''}
                            readOnly
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Country:
                        <select
                            name="country"
                            value={formData.country}
                            onChange={handleCountryChange}
                        >
                            {countries.map(country => (
                                <option key={country.name} value={country.name}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        State:
                        <select
                            name="state"
                            value={formData.state}
                            onChange={handleStateChange}
                        >
                            {states.map(state => (
                                <option key={state.name} value={state.name}>
                                    {state.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        City:
                        <select
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                        >
                            {cities.map(city => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div>
                    <button type="submit" disabled={error} className={error ? 'bg-gray-500 cursor-not-allowed p-1 rounded-md px-2' : 'bg-[#0074d9] p-1 rounded-md px-2'}>Submit</button>
                </div>
            </form>
        </div>
    );
}

export default RegistrationForm;
