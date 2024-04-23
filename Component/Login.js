import React from 'react'
import Navbar from './Navbar'

const Login = () => {

    // const [Ans, useAns] = useState(null)
    let dataG
    let uNameG
    document.getElementById("navbarNav")?.remove()



    // const form = document.getElementById('frm');
    async function sub(e) {
        e.preventDefault()

        if(document.getElementById('name')?.value < 8 || document.getElementById('psw')?.value < 8) {
            var alertContainer = document.querySelector('#uExists');
            alertContainer.style.display = 'block';

            setTimeout(function() {
                alertContainer.style.display = 'none';
            }, 3000);
        }

        let form_data = {
            name: document.getElementById('name')?.value,
            Password: document.getElementById('psw')?.value
        }

        let response = await fetch(`${window.location.origin}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form_data)
        })

        const rData = await response.json()

        if (rData.message === "Loged In") {
            sessionStorage.setItem("UserName", document.getElementById('name')?.value)
            sessionStorage.setItem("Que", rData.Que)
            sessionStorage.setItem("Ans", rData.Ans)
            window.location.href = "/"
        }

    }

    const forget = async () => {
        var alertContainer = document.querySelector('#frgFrm');
        alertContainer.style.display = 'block';

    }

    const userNotFound = (dData) => {
        // console.log("object");
        var alertContainer = document.querySelector('.alert-container');
        alertContainer.style.display = 'block';
        alertContainer.innerText = dData
        setTimeout(() => {
            alertContainer.style.display = 'none';
        }, 2000);
    }

    const ForgetSub = async (e) => {
        e.preventDefault()
        let uName = document.getElementById("nameFrg")
        let uNameVal = uName.value
        uNameG = uNameVal
        const data = {
            UserName: uNameVal
        }

        let response = await fetch(`${window.location.origin}/forgetPSW`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        })
        let rData = await response.json()
        if (rData.message === "User Not Found") {
            userNotFound("User Not Found")
        } else {
            let frgFrm = document.getElementById("frgFrm")
            frgFrm.style.display = "none"
            let ansCheckFrm = document.getElementById("ansCheckFrm")
            ansCheckFrm.style.display = "block"
            let queLbl = document.getElementById("queLbl")
            queLbl.innerText = rData.Que
            // useAns(rData.ans)
            dataG = rData.ans
        }
    }


    const checkPsw = (e) => {
        e.preventDefault()

        if (document.getElementById("QueAns")?.value === dataG) {
            let upPsw = document.getElementById("upPassword")
            upPsw.style.display = "block"
            let ansCheckFrm = document.getElementById("ansCheckFrm")
            ansCheckFrm.style.display = "none"
        } else {
            var alertContainer = document.querySelector('.alert-container');
            alertContainer.style.display = 'block';
            alertContainer.innerText = "Answer Doesn't Match"
            setTimeout(() => {
                alertContainer.style.display = 'none';
            }, 2000);
        }
    }

    const UpdPsw = async (e) => {
        e.preventDefault()
        let ansCheckFrm = document.getElementById("ansCheckFrm")
        ansCheckFrm.style.display = "none"
        let new_psw = document.getElementById("newPsw")?.value

        const data = {
            new_psw: new_psw,
            uName: uNameG
        }

        let response = await fetch(`${window.location.origin}/updatePassword`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        let rData = await response.json()

        let upPassword = document.getElementById("upPassword")
        upPassword.style.display = "none"

        userNotFound(rData.message)
    }

    const divert = () => {
        window.location.href = "/Registration"
    }



    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="text-center">Social Point - Log In</h3>
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
                                    <div className='d-flex justify-content-between'>
                                        <span type='button' onClick={forget} >Forget Password ?</span>
                                        <span type="button float-left"
                                            onClick={divert} style={{cursor: "pointer"}} >New User ?</span>
                                    </div>
                                    <button className="btn btn-primary btn-block" id="btn">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <form className='forget-container' onSubmit={ForgetSub} style={{ display: "none" }} id='frgFrm'>
                <div className="form-group">
                    <label htmlFor="name">Username</label>
                    <input className="form-control" type='text' id='nameFrg' autoComplete='username' required />
                </div>
                <button className="btn btn-primary btn-block" id="btnFrg">Get Quetion</button>
            </form>


            <form className='forget-container' onSubmit={checkPsw} style={{ display: "none" }} id='ansCheckFrm'>
                <div className="form-group">
                    <label htmlFor="name" id='queLbl'></label>
                    <input className="form-control" type='text' id='QueAns' autoComplete='username' required />
                </div>
                <button className="btn btn-primary btn-block" id="cngPsw">change Password</button>
            </form>


            <form className='forget-container' onSubmit={UpdPsw} style={{ display: "none" }} id='upPassword'>
                <div className="form-group">
                    <label htmlFor="newPsw">Enter New Password : </label>
                    <input className="form-control" type='text' id='newPsw' autoComplete='Password' required />
                </div>
                <div className="form-group">
                    <label htmlFor="newPswR">Enter New Password Again : </label>
                    <input className="form-control" type='text' id='newPswR' autoComplete='newPassword' required />
                </div>
                <button className="btn btn-primary btn-block" id="UpPsw">set Password</button>
            </form>




            <div className="alert-container" id='uExists' style={{ display: "none" }}>
                <p>User does Not Exists</p>
            </div>

            
            <div className="alert-container" id='vali' style={{display: "none"}}>
                    <p>Enter Valid Details</p>
                </div>
        </>
    )
}

export default Login