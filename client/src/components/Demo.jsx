import generalStyle from '../App.module.css';

function Demo() {
  return (
    <p className={generalStyle.alert}>
      <span className={generalStyle.embolden}>Alert</span> Thank you for trying
      out our app! Please note that the current section you&apos;re trying to
      access is under development. This app is a demo created for educational
      purposes. We appreciate your understanding and patience.
    </p>
  );
}

export default Demo;
