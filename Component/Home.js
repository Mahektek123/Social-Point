import React, { useEffect } from 'react'
import Navbar from './Navbar'
import DP from './download.png'


const Home = () => {

    let PP

    const displayImages = async () => {

        const fetchedData = document.getElementById("fetchedData")
        const user = sessionStorage.getItem("UserName")
        let data = {
            UserName: user
        }
        
        const response = await fetch(`${window.location.origin}/ImgBack`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const rData = await response.json()

        // console.log(rData.PP);
        if (rData.PP) {
            PP = rData.PP
        }
        
        if (sessionStorage.getItem("UserName")) {
            document.getElementById("profiPic").innerHTML = `
            <a class="nav-link" href="/Profile">
            <img src=${PP ? PP : DP} alt="Profile Picture" class="rounded-circle mr-2" style=" width: 50px; height: 50px" />
            </a>`
            
        }


        const newArr = shuffleArray(rData.Images)

        fetchedData.innerHTML = ""

        newArr.forEach(ele => {

            // fetchedData.innerHTML += `<h2>${ele.name}</h2><br/>`
            // fetchedData.innerHTML += `<img src='${ele.Image}' alt="img" width="200" /><br/>`

            fetchedData.innerHTML += `<div class="container">
                <center>
                <div class="card mb-3">
                  <div class="card-header d-flex align-items-center">
                    <img src="${ele.PP?ele.PP:DP}" alt="Profile Picture" class="rounded-circle mr-2" style="width: 50px; height: 50px;">
                    <span class="font-weight-bold">&nbsp;${ele.name}</span>
                  </div>
                  <center>
                  
                  <img class="w-50" src="${ele.Image}" alt="Post Image" class="card-img-top">
                  </center>
                  </div>
                  </center>
              </div>`
        });

    }
    useEffect(() => {

        if (sessionStorage.getItem("UserName")) {
            document.getElementById("Log").innerHTML = `
            <li class="nav-item"><a class="nav-link" href="/">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="/LogIn" onClick="logOut()">Log Out</a></li>`

        } else {
            document.getElementById("Log").innerHTML = `<a class="nav-link" href="/LogIn">Log In</a>`
        }

        displayImages()

        return () => {
        }
        // eslint-disable-next-line
    }, [])


    const subSenc = async (e) => {

        e.preventDefault();
        console.log("start");

        const img2 = document.getElementById("img2")
        var reader = new FileReader()

        reader.readAsDataURL(img2.files[0])

        console.log(reader);

        reader.onload = async () => {
            console.log("object");
            const name = sessionStorage.getItem("UserName")
            const data = {
                Image: reader.result,
                Name: name
            }

            console.log(reader.result)

            let response = await fetch("http://localhost:3000/Img", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            let rData = await response.json()
            console.log(rData);
            if (rData.massege === "Inserted") {
                displayImages()
            }
            console.log("end");
        }

    }

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements at positions i and j
        }
        return array;
    }



    const imgClick = () => {
        // const img2 = document.getElementById("img2")
        // img2.click()
    }


    return (sessionStorage.getItem("UserName") ?
        <>
            <Navbar />
            <form onSubmit={subSenc} id='frm1'>
                <div className='container d-flex justify-content-around'>
                    <div id="dropArea" className="drop-area" onClick={imgClick}>
                        <p>Upload Your Images Here</p>
                        <input className='form-control w-70' type="file" id='img2' name="image" accept="image/*" required />
                        <p className='text-danger'>* Image must be under 100KB</p>

                    </div>
                </div>
                <center>
                    <button type="submit" className="btn btn-primary">Post</button>
                </center><br />
            </form>

            <div className='d-flex flex-column align-items-center ' id='fetchedData'>

            </div>
        </> : window.location.href = "/LogIn"
    )
}

export default Home