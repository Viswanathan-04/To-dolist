import { Outlet } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";

function Home() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const handleAdd = () => {
        const data = new FormData();
        data.append("id", Math.floor(Math.random() * 9999) + 1000);
        data.append("title_val", title);
        data.append("desc_val", desc);

        axios.post('http://127.0.0.1:5000/add', data, {
            headers: {
                "Content-Type" : "text/plain"
            }})
            .then((response) => {
                setTitle("");
                setDesc("");
                alert(response.data.message);
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    return (
        <>
            <div className="home-main" style={{display: "flex", flexDirection: 'column', gap: '30px', maxWidth: '50vh', margin: '100px auto'}}>
                <input 
                    type="text" 
                    placeholder="Title..." 
                    required 
                    onChange={(event) => setTitle(event.target.value)}
                    value={title}
                    style={{fontSize: '18px', borderRadius: '10px', padding: '10px'}}
                />
                <textarea 
                    rows="3"
                    placeholder="Description..." 
                    onChange={(event) => setDesc(event.target.value)}
                    value={desc}
                    style={{fontSize: '18px', borderRadius: '10px', padding: '10px'}}
                />
                <button type="button" onClick={handleAdd} style={{width: '100px', padding: '10px', margin: 'auto 0px', borderRadius: '10px', fontWeight: '800', border: 'none', backgroundColor: 'white'}}>Add Task</button>
            </div>
            <Outlet />
        </>
    );
}

export default Home;