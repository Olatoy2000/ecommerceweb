import axios from 'axios';
import { useMutation } from 'react-query';


export function useSignUp() {
  return useMutation(
    "register",
    async (postData) => {
      const response = await fetch('http://localhost:5001/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    
    },{
      onSuccess: (data) => {
      }
    }
  );
}

