import style from '../../styles/Form.module.css';
import FormInput from './FormInput';

function Form({
  formLayout,
  formButtons,
  formData,
  handleChange,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <div className={style.fields}>
        {formLayout?.map((input, index) => (
          <FormInput
            key={index}
            input={input}
            formData={formData}
            handleChange={handleChange}
          />
        ))}
      </div>

      <div className={style.control}>
        <div className={style.buttons}>{formButtons}</div>
      </div>
    </form>
  );
}

export default Form;
