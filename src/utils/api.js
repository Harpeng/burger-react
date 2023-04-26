const checkResponce = res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

export {checkResponce};