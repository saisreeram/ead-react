export function PostData(type, userData) {
    let BaseURL = 'https://k3ksfdsp4l.execute-api.us-east-1.amazonaws.com/createcamp';
    return new Promise((resolve, reject) =>{
        var BaseURLnew=null
      if (type==='create'){
        BaseURLnew=BaseURL
      }
      
           
          fetch(BaseURLnew, {
              method: 'POST',
              body: JSON.stringify(userData),
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