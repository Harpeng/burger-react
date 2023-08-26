const baseUrl = 'https://norma.nomoreparties.space/api';
const wsUrl = 'wss://norma.nomoreparties.space/orders';
const ingredientsUrl = `${baseUrl}/ingredients`;
const orderUrl = `${baseUrl}/orders`;
const registerUrl = `${baseUrl}/auth/register`;
const loginUrl = `${baseUrl}/auth/login`;
const logoutUrl = `${baseUrl}/auth/logout`;
const tokenUrl = `${baseUrl}/auth/token`;
const checkAccessUrl = `${baseUrl}/auth/user`;
const forgotPasswordUrl = `${baseUrl}/password-reset`;
const resetPasswordUrl = `${baseUrl}/password-reset/reset`;

const wsUrlAll = `${wsUrl}/all`;
const wsUrlProfile = `${wsUrl}`;

export {wsUrl, wsUrlProfile, wsUrlAll, baseUrl,resetPasswordUrl, forgotPasswordUrl, checkAccessUrl, tokenUrl, logoutUrl, loginUrl, registerUrl, orderUrl, ingredientsUrl };

