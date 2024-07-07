import { IconCopy } from '@tabler/icons-react';

import style from '../styles/App.module.css';

function CopyButton({ copyToClipboard }) {
  function handleCopyToClipboard() {
    navigator.clipboard
      .writeText(copyToClipboard)
      .then(() => {
        console.log('Text successfully copied to clipboard');
      })
      .catch((err) => {
        console.error('Could not copy text to clipboard: ', err);
      });
  }

  return (
    <button className={style.copyButton} onClick={handleCopyToClipboard}>
      <IconCopy size={16} />
    </button>
  );
}

export default CopyButton;
