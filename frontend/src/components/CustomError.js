function CustomError({ error }) {
  let message = <span>Unknown error</span>;
  let content = <p>Something bad happened, please refresh the page</p>;

  if (error.error === 'send_failure') {
    message = <span>Failed to send emails to some addresses</span>;
    content = (
      <ul>
        {error.emails.map(email => (
          <li key={email}>{email}</li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <p>There was an error: {message}</p>
      {content}
    </div>
  );
}

export default CustomError;
