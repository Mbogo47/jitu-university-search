import { useEffect, useState } from 'react';
import '../App.css'

const SearchBar = () => {
    const [country, setCountry] = useState('');
    const [data, setData] = useState([]);

    const handleChange = (event) => {
        setCountry(event.target.value)
            // (e) => setCountry(e.target.value)/
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://universities.hipolabs.com/search?country=${country}`);
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (country) {
            fetchData();
        }
    }, [country]);

    const handleSearch = (e) => {
        e.preventDefault()
        fetchData();
    };

    return (
        <div>
            <form>
                <input type="text" value={country} onChange={handleChange} />
                <button onClick={handleSearch}>Search</button>
            </form>
            <p className='total'>Total universities found: {data.length}</p>
            <div className='results_card'>
            
            {
                data && (
                    <>
                        {data.map((data) => (
                            <div className='results'>
                                <p className='results_data'>Country: {data.country}</p>
                                <a href="" className='links' >Webpage: {data.web_pages}</a>
                                <p className='results_data'>University name: {data.name}</p>
                                <a href="" className='links'>Domain: {data.domains}</a>
                            </div>
                        ))}
                    </>

                )
            }
            </div>

        </div>
    );
};


export default SearchBar
