import { useState} from "react";
import {Select, JobSelect, NameInput} from "../../inputs"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import prepareDataForSending from "../../PrepareDataForSending";
import axios from "axios";

function AddNewVolunteer({setVolunteers, updateAll}) {
    const [formData, setFormData] = useState({
        name: "",
        contact_number: "",
        town: "Baška Voda",
        image:"",
        jobs: []
      });

    function inputChange(e) {
        const { name, value } = e.target;      
        setFormData({ ...formData, [name]: value });}

    const handleJobChange = (jobName, isChecked) => {
        if (isChecked) {
          setFormData(prevState => ({
            ...prevState,
            jobs: [...prevState.jobs, jobName]}))
        //   console.log(formData.jobs);
        }
         else {
          // makni odznačanog
            setFormData(prevState => ({
            ...prevState,
            jobs: prevState.jobs.filter(job => job !== jobName)
          }));
         }
    };
   
    const handleContactChange = (value) => {
        const label = 'contact_number'
        setFormData({ ...formData, [label]: value });
    }
    
    function contactNumberValidation(e) {
        return /^\+?\d{9,}$/.test(e);
    }

    function nameValidation(e){
        const words = e.trim().split(' ');
        return words.length >= 2 
    }

    const sendData = (e) => {
        e.preventDefault();
        
        if (!nameValidation(formData.name)) {
            alert("Potrebno je unijeti i ime i prezime.");
            return;
          }
      
        if (!contactNumberValidation(formData.contact_number)) {
            alert("Neispravan format broja mobitela: potrebno barem 9 znakova (uključujući pozivni broj).");
            return;
          }

        const dataToSend = prepareDataForSending("volunteer", formData);
        console.log(dataToSend);
          
        axios.post('http://localhost:3001/volunteers', dataToSend)
        .then(res => {
            setVolunteers(prevState => [...prevState, res.data]);
            updateAll(prevState => [...prevState, res.data]);
            })
            .catch(error => {
                console.error("Error adding new volunteer: ", error);
            });
    }
    
    return(
        <div className="card">
            <div className="card-body">
                <form onSubmit={sendData}>
                    <h2 className="addNewTitle">Novi korisnik</h2>
                    {/* <NameInput value={formData.name} button = {false} handlePosalji={(value) => setFormData({ ...formData, name: value })} /> */}

                    <NameInput value={formData.name} onChange={(value) => setFormData({ ...formData, name: value })} />
                    <Select value={formData.town} onChange={inputChange} url="address" name="town" autoFocus={false}/>
                    <PhoneInput country={'hr'} name = "contact_number" value={formData.contact_number} onChange={handleContactChange} inputProps={{required:true}}></PhoneInput>
                    <JobSelect onChange={handleJobChange} />

                    <div className="input-group mb-2">
                        <input type="file" className="form-control" name = "image" value={formData.image}id="inputGroupFile02" onChange={inputChange}/>
                    </div>
                    <button type='submit' className="btn btn-light btn-md">Pošalji</button>
                </form>
            </div>
        </div>
    )
}

export default AddNewVolunteer;