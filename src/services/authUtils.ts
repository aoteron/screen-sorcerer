export const handleEmailChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setEmail: React.Dispatch<React.SetStateAction<string>>
) => {
  setEmail(e.target.value);
};

export const handleSubmit = (
  e: React.FormEvent<HTMLElement>,
  email: string,
  router: any
) => {
  e.preventDefault();
  router.push(`/signup?email=${encodeURIComponent(email)}`);
};

export const handleLogin = async (email:string, password:string) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();
  if (response.ok) {
    localStorage.setItem('token', data.token);
    console.log("Logged in successfully!");
  } else {
    console.error("Login failed:", data.message);
  }
};


export const checkIfEmailExists = async (email: string): Promise<boolean> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/check-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to check email existence');
      }
  
      const data = await response.json();
      console.log(data);
      return data.exists; 
    } catch (error) {
      console.error('Error checking email existence:', error);
      return false; 
    }
  };
  
