

export const getHeaderInitial = async function () {
  return {
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With':'XMLHttpRequest',
      'Access-Control-Allow-Origin': '*',
    },
  };

};


export const getHeaderInfo = async function () {
  return {
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With':'XMLHttpRequest',
      'Access-Control-Allow-Origin': '*',
    },
  };
};

export const getHeaderInfoDoc =  function () {
  return {
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With':'XMLHttpRequest',
      'Access-Control-Allow-Origin': '*',
    },
  };
};

export const getFormDataHeader = async function () {
  return {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
      'responseType ' :  'blob'
    },
  };
};

export const getHeaderInfoReporte = async function () {
    return {
      headers: {
        'Content-Type': 'application/json',
        'responseType': 'blob'
       
      },
    };
  };
