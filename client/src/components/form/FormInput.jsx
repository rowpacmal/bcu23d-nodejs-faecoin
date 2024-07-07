import { useState } from 'react';
import { IconEye, IconEyeClosed } from '@tabler/icons-react';

import style from './Form.module.css';

function FormInput({ input, formData, handleChange }) {
  const isTypePassword = input?.type === 'password';
  const isTypeNumber = input?.type === 'number';
  const [toggleEye, setToggleEye] = useState(false);

  function handleToggleEye() {
    setToggleEye(!toggleEye);
  }

  return (
    <div className={style.input}>
      <label htmlFor={input?.name}>{input?.label}</label>

      {isTypePassword && (
        <span className={style.eye} onClick={handleToggleEye}>
          {!toggleEye ? <IconEye size={20} /> : <IconEyeClosed size={20} />}
        </span>
      )}

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
          type={
            isTypePassword ? (!toggleEye ? 'password' : 'text') : input?.type
          }
          placeholder={input?.placeholder}
          min={isTypeNumber && '0'}
          step={isTypeNumber && 'any'}
          value={formData?.[input?.name]}
          onChange={handleChange}
          required={input?.required}
        />
      )}
    </div>
  );
}

export default FormInput;
