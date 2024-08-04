import { useEffect, useState } from "react";

export default function AbsenCallback() {
    const location = window.location;
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const hash = location.hash.substr(1);
    const result = hash.split('&').reduce((res: { [key: string]: string }, item) => {
      const parts = item.split('=');
      res[parts[0]] = parts[1];
      return res;
    }, {});

    const accessToken = result.access_token;
    
    if (accessToken) {
      getGoogleDriveData(accessToken)
        .then(data => {
            
            setData(data)
            // const email = data.email;
            window.localStorage.setItem('google', accessToken);

            return window.location.href = route('absen.auth', {accessToken : accessToken, email : data.email});
        })
        .catch(error => setError(error.message));
    } else {
      setError('Failed to obtain access token');
    }
  }, [location]);

  const getGoogleDriveData = async (accessToken: string) => {
    const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
        console.log(response);
      throw new Error('Failed to fetch data from Google Drive API');
    }

    const data = await response.json();
    return data;
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Sedang Meredirect akun anda</h1>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
}