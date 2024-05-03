import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'  
import {faCircleUser} from '@fortawesome/free-solid-svg-icons'

function VolunteerCommentAndRating({ comments, averageGrade, grade_count }) {
  const [newComment, setNewComment] = useState(""); // State za novi komentar
  const [rating, setRating] = useState(0); // State za ocjenu

  // Funkcija za dodavanje novog komentara
  const addComment = () => {
    // Dodajte validaciju i logiku za dodavanje komentara
    console.log("Dodaj komentar:", newComment);
    // Ovdje možete dodati logiku za spremanje novog komentara u bazu podataka, npr. pozivom API-ja
    // Nakon dodavanja komentara, možete ažurirati stanje ili očistiti polje za unos novog komentara
    setNewComment("");
  };

  // Funkcija za postavljanje ocjene
  const rate = (value) => {
    // Ovdje možete implementirati logiku za postavljanje ocjene, npr. pozivom API-ja
    // Nakon postavljanja ocjene, možete ažurirati stanje ili izvršiti dodatne akcije
    console.log("Ocjena:", value);
    setRating(value);
  };

  return (
    <div className="comment-and-rating">
      {/* Ispis komentara */}
      <div className="comments">
        {comments.map((comment, index) => (
          <div key={index}>
            <p>
            <FontAwesomeIcon icon={faCircleUser} />
            <span><strong>{comment.korisnik}</strong></span>: <span className="comment">{comment.tekst}</span> </p>
          </div>
        ))}
      </div>
      <div className="rating">
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className={value <= rating ? "star active" : "star"}
            onClick={() => rate(value)}
          >
            &#9733;
          </span>
        ))}({grade_count})
      </div>
      <p>Prosječna ocjena: {averageGrade}</p>
      {/* Forma za dodavanje novog komentara */}
      <div className="new-comment">
        <label>Komentiraj kao</label>
        <input
          type="text"
          value={newComment}
          className="form-control"
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="vaše ime"
        />
        <input
          type="text"
          value={newComment}
          className="form-control"
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="komentar"
        />
        <button onClick={addComment}>Dodaj komentar</button>
      </div>
    </div>
  );
}

export default VolunteerCommentAndRating;
