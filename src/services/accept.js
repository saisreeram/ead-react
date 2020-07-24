export function accept() {
    let BaseURL = 'https://k3wx95iode.execute-api.us-east-1.amazonaws.com/acceptcamp';
    return new Promise((resolve, reject) =>{
        
          fetch(BaseURL, {
              method: 'POST',
                headers:{
                  'Content-Type':'application/json'
                }
            })
            .then((response) => response.json())
            .then((res) => {
              resolve(res);
            })
            .catch((error) => {
              reject(error);
            });
  
    
        });
  }