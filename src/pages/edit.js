import { useState } from "react";
import axios from 'axios';
import { Outlet } from "react-router-dom";

function Edit() {
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const fetchTask = () => {
        axios.get(`http://127.0.0.1:5000/fetch/${id}`)
            .then((response) => {
                const task = response.data;
                setTitle(task.title);
                setDesc(task.description);
            })
            .catch((err) => {
                console.error(err);
                alert("Task not found.");
            });
    };

    const updateTask = () => {
        const taskData = new FormData();
        taskData.append('title_val',title);
        taskData.append('desc_val',desc);

        axios.post(`http://127.0.0.1:5000/update/${id}`, taskData)
            .then((response) => {
                alert(response.data);
                setTitle("");
                setDesc("");
            })
            .catch((err) => {
                console.error(err);
                alert("An error occurred. Please try again.");
            });
    };

    return (
        <>
            <div style={{ display: "flex", flexDirection: 'column', gap: '30px', maxWidth: '50vh', margin: '100px auto' }}>
                <input 
                    type="text" 
                    placeholder="ID..." 
                    required 
                    onChange={(event) => setId(event.target.value)}
                    value={id}
                    style={{ fontSize: '18px', borderRadius: '10px', padding: '10px' }}
                />
                <input 
                    type="text" 
                    placeholder="Title..." 
                    required 
                    onChange={(event) => setTitle(event.target.value)}
                    value={title}
                    style={{ fontSize: '18px', borderRadius: '10px', padding: '10px' }}
                />
                <textarea 
                    rows="3"
                    placeholder="Description..." 
                    onChange={(event) => setDesc(event.target.value)}
                    value={desc}
                    style={{ fontSize: '18px', borderRadius: '10px', padding: '10px' }}
                />
                <div style={{ display: 'flex', gap: '30px' }}>
                    <button type="button" onClick={fetchTask} style={{width: '100px', padding: '10px', margin: 'auto 0px', borderRadius: '10px', fontWeight: '800', border: 'none', backgroundColor: 'white'}}>Fetch Task</button>
                    <button type="button" onClick={updateTask} style={{width: '100px', padding: '10px', margin: 'auto 0px', borderRadius: '10px', fontWeight: '800', border: 'none', backgroundColor: 'white'}}>Update Task</button>
                </div>
            </div>
            <Outlet />
        </>
    );
}

export default Edit;
