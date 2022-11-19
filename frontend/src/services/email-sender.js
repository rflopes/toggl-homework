export async function sendEmailAddresses(emailAddresses) {
  const endpoint = process.env.REACT_APP_API_ENDPOINT;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ emails: emailAddresses }),
  });

  if (response.status === 200) {
    return response;
  }

  return await response.json();
}
