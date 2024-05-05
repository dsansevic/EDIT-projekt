import { useState, useEffect} from "react";
import {Select, JobSelect, NameInput, RadioButtons, InputWithIcon} from "../../inputs"
import { faHandHoldingHeart } from "../../icons/iconImports";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {prepareDataForSending, AxiosPost} from "../../Utils/";

function AddNewVolunteer({setVolunteers, updateAll}) {
    const [imageSelected, setImageSelected] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        contact_number: "",
        town: "",
        image:"",
        gender:"",
        association:"",
        jobs: []
      });


    useEffect(() => {
        if (formData.image !== '') {
            setImageSelected(true);
        } else {
            setImageSelected(false);
        }
    }, [formData.image]);

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

    const handleImageChange = (e) => {
        if (e.target.files.length > 0) {
            console.log(e.target.files.length);
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setFormData({ ...formData, image: reader.result });
                setImageSelected(true);
            };
        }
    };
    
   
    const handleContactChange = (value) => {
        const label = 'contact_number'
        setFormData({ ...formData, [label]: value });
    }
    const handleRemoveImage = () => {
        setFormData({ ...formData, image: "" });
        setImageSelected(false);
    };

    function contactNumberValidation(e) {
        return /^\+?\d{9,}$/.test(e);
    }7

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

        if (formData.jobs.length === 0) {
            alert("Odaberite barem jedan posao.");
            return;
        }
        if (formData.image === '') {
            let id = Math.floor(Math.random() * 78) + 1;
            console.log(id);
            formData.image = formData.gender === 'male' ? `https://xsgames.co/randomusers/avatar.php?g=male&id=${id}` : `https://xsgames.co/randomusers/avatar.php?g=female&id=${id}`;
        }

        const dataToSend = prepareDataForSending("volunteer", formData);
        console.log(dataToSend);

        AxiosPost({
            url: 'volunteers', 
            update: setVolunteers,   
            updateAll: updateAll,   
            dataToSend: dataToSend,
            filter: true       
          });
          
        setFormData({
            name: "",
            contact_number: "",
            association:"",
            town: "",
            image: "",
            gender: "",
            jobs: []
        });
    }
    
    return(
        <div className="card d-flex align-items-center dodatnaKlasa">
            <div className="card-body">
                <form onSubmit={sendData}>
                    <h2 className="addNewTitle">Dodaj volontera</h2>
                    {/* <NameInput value={formData.name} button = {false} handlePosalji={(value) => setFormData({ ...formData, name: value })} /> */}

                    <NameInput value={formData.name} onChange={(value) => setFormData({ ...formData, name: value })} />
                    <Select value={formData.town} onChange={inputChange} url="address" name="town" autoFocus={false} placeholder="Odaberi grad"/>
                    <Select value={formData.association} onChange={inputChange} name="association" url="associations" placeholder="Odaberi udrugu" />
                    <PhoneInput country={'hr'} name = "contact_number" value={formData.contact_number} onChange={handleContactChange} inputProps={{required:true}}></PhoneInput>
                    <RadioButtons value={formData.gender} onChange={inputChange} />
                    <JobSelect onChange={handleJobChange} />

                    <p className="text-danger">Slika nije obavezna.</p>
                    <div className="input-group mb-2">
                        <input type="file" className="form-control" name ="image" id="inputGroupFile02" onChange={handleImageChange} style={{ maxWidth: '300px' }}/>
                    </div>
                    {imageSelected && (
                        <button type="button" onClick={handleRemoveImage} className="btn btn-danger btn-md mb-2">Ukloni sliku</button>
                    )}
                    <button type='submit' className="btn btn-light btn-md">Pošalji</button>
                </form>
            </div>
        </div>
    )
}

export default AddNewVolunteer;