import React from 'react'
import Navbar from './Navbar';

const Regi = () => {
    
    async function sub(e) {
        e.preventDefault()
        // console.log(document.getElementById('secQue')?.value);

        if (document.getElementById('name')?.value.length < 8 || document.getElementById('psw')?.value.length < 8 || document.getElementById("secAns")?.value.length === 0) {
            var alertContainer = document.querySelector('#vali');
            alertContainer.style.display = 'block';

            setTimeout(function () {
                alertContainer.style.display = 'none';
            }, 3000);

            console.log("object");
        } else {

            let form_data = {
                name: document.getElementById('name')?.value,
                Password: document.getElementById('psw')?.value,
                Que: document.getElementById('secQue')?.value,
                Ans: document.getElementById("secAns")?.value
            }

            let response = await fetch(`${window.location.origin}/Regi`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form_data)
            })

            const rData = await response.json()

            if (rData.massege === "Data inserted") {
                sessionStorage.setItem("UserName", document.getElementById('name')?.value)
                sessionStorage.setItem("Que", document.getElementById('secQue')?.value)
                sessionStorage.setItem("Ans", document.getElementById('secAns')?.value)
                window.location.replace("/")
            }

            if (rData.message === "User already exists") {
                var alertContainer2 = document.querySelector('#uExists');
                alertContainer2.style.display = 'block';

                setTimeout(function () {
                    alertContainer.style.display = 'none';
                }, 3000);
            }
        }
    }

    const divert = () => {
        window.location.href = "/login"
    }
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="text-center">Social Point - Registration</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={sub}>
                                    <div className="form-group">
                                        <label htmlFor="name">Username</label>
                                        <input className="form-control" type='text' id='name' autoComplete='username' required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="psw">Password</label>
                                        <input className="form-control" type='password' id='psw' autoComplete='current-password' required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="secQue">Security questions</label>
                                        <select id="secQue" className="form-control">
                                            <option value="What is your Home Name ?">What is your Home Name ?</option>
                                            <option value="What is your Favourite fruit ?">What is your Favourite fruit ?</option>
                                            <option value="What is your Favourite Animal ?">What is your Favourite Animal ?</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="secAns">Answer</label>
                                        <input className="form-control" type='text' id='secAns' autoComplete='current-password' required />
                                    </div>
                                    <span type="button"
                                        onClick={divert} >Already Have An Account ? </span>
                                    <br />
                                    <center>
                                        <button id="btn" className="btn btn-primary btn-block">Register</button>
                                    </center>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="alert-container" id='uExists' style={{ display: "none" }}>
                    <p>User already Exists</p>
                </div>
                <div className="alert-container" id='vali' style={{ display: "none" }}>
                    <p>Enter Valid Details</p>
                </div>
            </div>
        </>
    )
}

export default Regi