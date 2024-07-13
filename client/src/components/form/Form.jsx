import style from './Form.module.css';
import FormInput from './FormInput';

function Form({
  formLayout,
  formButtons,
  formMessage,
  formData,
  handleChange,
  handleSubmit,
  isVisible,
  warning,
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
        <p className={`${style.warning}${isVisible ? ` ${style.show}` : ''}`}>
          {warning}
        </p>

        <div className={style.buttons}>{formButtons}</div>

        {formMessage}
      </div>
    </form>
  );
}

export default Form;
