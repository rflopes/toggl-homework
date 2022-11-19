import React from 'react';
import styles from './CustomError.module.css';

function CustomError({ error }) {
  let messageText =
    error.error === 'send_failure'
      ? 'Failed to send emails to some addresses'
      : error.error === 'invalid_email_address'
      ? 'Some addresses are invalid'
      : 'Unknown error';

  return (
    <div>
      <p>
        There was an error:{' '}
        <span className={styles.error__message}>{messageText}</span>
      </p>
      {error.error === 'send_failure' ||
      error.error === 'invalid_email_address' ? (
        <ul>
          {error.emails.map(email => (
            <li key={email}>{email}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default CustomError;
