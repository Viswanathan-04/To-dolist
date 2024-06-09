import { useEffect, useState } from "react";
import axios from 'axios';
import './display.css';

function Display() {
    const [data1, setData] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            axios.get('http://127.0.0.1:5000/display')
                .then((response) => {
                    setData(response.data);
                    console.log(response.data);
                })
                .catch((err) => {
                    setData([]);
                    console.error(err);
                });
        };

        fetchData();
        const interval = setInterval(fetchData, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleDelete = (id_val) => {
        axios.delete(`http://127.0.0.1:5000/delete/${id_val}`)
            .then((response) => {
                alert(response.data);
            })
            .catch((err) => {
                alert("An error occurred. Please try again.");
            });
    };

    return (
        <div className="tasks">
            {data1.length > 0 ? (
                data1.map((task, index) => (
                    <div key={index}>
                        <p>{task[0]}</p>
                        <p style={{fontWeight: '700'}}>{task[1]}</p>
                        <p style={{marginRight: 'auto'}}>{task[2]}</p>
                        <button type="button" className='delete-btn' onClick={() => handleDelete(task[0])}>X</button>
                    </div>
                ))
            ) : (
                <div>No Tasks</div>
            )}
        </div>
    );
}

export default Display;
