const checkResponce = (res: Response) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

export {checkResponce};