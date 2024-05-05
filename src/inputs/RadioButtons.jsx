function RadioButtons({ value, onChange }) {
  return (
    <div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="gender"
          id="male"
          value="male"
          required
          checked={value === "male"}
          onChange={onChange}
        />
        <label className="form-check-label" htmlFor="male">
          Muško
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="gender"
          id="female"
          value="female"
          required
          checked={value === "female"}
          onChange={onChange}
        />
        <label className="form-check-label" htmlFor="female">
          Žensko
        </label>
      </div>
    </div>
  );
}

export default RadioButtons;
