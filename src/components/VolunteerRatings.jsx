import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'  
import {faCircleUser} from '@fortawesome/free-solid-svg-icons'

function VolunteerCommentAndRating({ comments, averageGrade, grade_count }) {
  const [newComment, setNewComment] = useState(""); 
  const [rating, setRating] = useState(0); 

  const addComment = () => {
    console.log("Dodaj komentar:", newComment);
    setNewComment("");
  };

  const rate = (value) => {
    console.log("Ocjena:", value);
    setRating(value);
  };

  return (
    <div className="comment-and-rating">
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
