import style from '../../styles/Form.module.css';

function FormInput({ input, formData, handleChange }) {
  return (
    <div className={style.input}>
      <label htmlFor={input?.name}>{input?.label}</label>

      {input?.select === true ? (
        <select
          id={input?.name}
          name={input?.name}
          value={formData?.[input?.name]}
          onChange={handleChange}
          required={input?.required}
        >
          {input?.options?.map((option, index) => (
            <option key={index} value={option?.value}>
              {option?.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={input?.name}
          name={input?.name}
          type={input?.type}
          placeholder={input?.placeholder}
          value={formData?.[input?.name]}
          onChange={handleChange}
          required={input?.required}
        />
      )}
    </div>
  );
}

export default FormInput;
