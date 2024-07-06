import style from '../styles/Loading.module.css';

function Loading({ setSpinner }) {
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        {setSpinner === true ? (
          <div className={style.spinner}></div>
        ) : (
          <>
            <div className={style.bar}></div>

            <p>Loading...</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Loading;
