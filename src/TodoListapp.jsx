// import React, { useState } from 'react'
import React, { useState, useEffect } from 'react'
function todolist() {


    const [task, settask] = useState(() => {
        const saved = localStorage.getItem("tasks");
        return saved ? JSON.parse(saved) : [];
    });
    
    const [newtask, setnewtask] = useState("");

    // Jab bhi task change ho, save karo
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(task));
    }, [task]);

    // const [task, settask] = useState(["eat food", "drink water"]);
    // const [newtask, setnewtask] = useState("");

    function handleinputchange(e) {
        setnewtask(() => e.target.value)
    }

    function addtask() {
        if (newtask.trim() !== "") {
            settask(t => [...t, newtask])
            setnewtask("");
        }
        else {
            alert("Input task first!!")
        }
    }

    function removetask(index) {
        const updatedtasks = task.filter((_, i) => i !== index);
        settask(() => updatedtasks)
    }
    function movetaskup(index) {
        if (index > 0) {
            const updatedTasks = [...task];
            [updatedTasks[index], updatedTasks[index - 1]] =
                [updatedTasks[index - 1], updatedTasks[index]];
            settask(updatedTasks);
        }
        else {
            alert("no Task to move")
        }
    }
    function movetaskdown(index) {
        if (index < task.length-1) {
            const updatedTasks = [...task];
            [updatedTasks[index], updatedTasks[index + 1]] =
                [updatedTasks[index + 1], updatedTasks[index]];
            settask(updatedTasks);
        }
        else {
            alert("no Task to move")
        }
    }

    return (
        <div className="to-do-list">
            <h1>To-Do List</h1>
            <div>
                <input type="text" value={newtask} placeholder='Enter Task' onChange={handleinputchange} />
                <button className='add-button' onClick={addtask}> Add</button>
            </div>
            <ol>
                {task.map((task, index) =>
                    <li key={index}>
                        <span className="text">{task}</span>
                        <button
                            className="delete-button"
                            onClick={() => removetask(index)}>
                            Delete
                        </button>
                        <button
                            className="move-button"
                            onClick={() => movetaskup(index)}>
                            ☝
                        </button>
                        <button
                            className="move-button"
                            onClick={() => movetaskdown(index)}>
                            👇
                        </button>
                    </li>
                )}
            </ol>
        </div>

    )
}
export default todolist;