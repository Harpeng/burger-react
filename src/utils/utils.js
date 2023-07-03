const baseUrl = 'https://norma.nomoreparties.space/api';
const ingredientsUrl = `${baseUrl}/ingredients`;
const orderUrl = `${baseUrl}/orders`;
const registerUrl = `${baseUrl}/auth/register`;
const loginUrl = `${baseUrl}/auth/login`;
const logoutUrl = `${baseUrl}/auth/logout`;
const tokenUrl = `${baseUrl}/auth/token`;
const checkAccessUrl = `${baseUrl}/auth/user`;
const forgotPasswordUrl = `${baseUrl}/password-reset`;
const resetPasswordUrl = `${baseUrl}/password-reset/reset`;

export {baseUrl,resetPasswordUrl, forgotPasswordUrl, checkAccessUrl, tokenUrl, logoutUrl, loginUrl, registerUrl, orderUrl, ingredientsUrl };

