const getCourses = (url) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onload = () => {
          if(xhr.status === 200){
              const data = JSON.parse(xhr.responseText);
              resolve(data);
          } else {
              reject(Error (xhr.statusText));
          }
      };
      xhr.onerror = () => reject(Error("A network error ocurred!"));
      xhr.send();          
    });//end Promise    
  };//end getCourses

  const helper = {
      getCourses
  };

  export default helper;