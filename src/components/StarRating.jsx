import { useState, useEffect } from "react";
import { VscStarFull } from "react-icons/vsc";
import axios from 'axios';

function StarRating({ volunteer, setVolunteers, volunteers }) {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [averageRating, setAverageRating] = useState(null);

    useEffect(() => {
        if (volunteer && volunteer.grades && volunteer.grades.length > 0) {
            const totalRating = volunteer.grades.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            const average = totalRating / volunteer.grade_count;
            setAverageRating(average);
        }
    }, [volunteer]);

    const handleRatingChange = (selectedRating) => {
        const volunteerIndex = volunteers.findIndex((v) => v.id === volunteer.id);
        if (volunteerIndex !== -1) {
            const updatedVolunteers = [...volunteers];
            const volunteerToUpdate = updatedVolunteers[volunteerIndex];

            volunteerToUpdate.grades.push(selectedRating);
            volunteerToUpdate.grade_count += 1;

            const totalRating = volunteerToUpdate.grades.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            const average = totalRating / volunteerToUpdate.grade_count;
            setAverageRating(average);
            axios.put(`http://localhost:3001/volunteers/${volunteer.id}`, volunteerToUpdate)
            .then(response => {
                console.log('Podaci su uspješno ažurirani:', response.data);
                setVolunteers(updatedVolunteers);
            })
            .catch(error => {
                console.error('Došlo je do greške prilikom ažuriranja podataka:', error);
            });
            setRating(selectedRating);
        }
    };

    const getTextualRating = (rating) => {
        switch (rating) {
            case 1:
                return "Jako loše";
            case 2:
                return "Loše";
            case 3:
                return "Dobro";
            case 4:
                return "Vrlo dobro";
            case 5:
                return "Odlično";
            default:
                return "";
        }
    };

    return (
        <div className="rating">
            <p>
                {averageRating !== null ? `Prosječna ocjena: ${averageRating} (${volunteer.grade_count})` : `${volunteer.name} još nema ocijena`}
            </p>
            {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return (
                    <label key={index}>
                        <input
                            type="radio"
                            name="rating"
                            value={currentRating}
                            onChange={() => handleRatingChange(currentRating)}
                            disabled={rating !== null}
                        />
                        <VscStarFull
                            className='stars'
                            size={50}
                            color={currentRating <= (hover || rating) ? "orange" : "lightblue"}
                            onMouseEnter={() => !rating && setHover(currentRating)}
                            onMouseLeave={() => !rating && setHover(null)}
                        /> 
                    </label>
                );
            })}
            <p className="text-danger text-grade">{rating && getTextualRating(rating)}</p>
        </div>
    );
}

export default StarRating;