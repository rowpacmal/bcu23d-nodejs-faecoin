import style from '../styles/Loading.module.css';

function Loading({ isSpinner }) {
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        {isSpinner === true ? (
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
