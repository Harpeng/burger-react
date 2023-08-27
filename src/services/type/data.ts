export interface IburgerInfo {
    readonly _id: string;
    readonly id: string;
    readonly name: string;
    readonly type: string;
    readonly proteins: number;
    readonly fat: number;
    readonly carbohydrates: number;
    readonly calories: number;
    readonly price: number;
    readonly image: string;
    readonly image_mobile: string;
    readonly image_large: string;
    readonly __v: number;
    readonly count: number;
    readonly uniqueId: any;
    readonly src: string;
};

export interface IOrder {
    readonly ingredients: string[],
    readonly _id: string,
    readonly name: string,
    readonly status: string,
    readonly number: string,
    readonly createdAt: string,
  }

  export interface IWsMessage {
    readonly orders: Array<IOrder>;
    readonly total: number;
    readonly totalToday: number;
  }

  export interface IWsMessageProfile {
    readonly orders: Array<IOrder>;
  }

  export interface IRegister {
    readonly name: string;
    readonly email: string;
    readonly password: string;
  }
  
  export interface ILogin {
    readonly email: string;
    readonly password: string;
  }
  
  export interface IUser {
    readonly email: string;
    readonly name: string;
    password?:string | null;
  }
  
  export interface IResetPassword {
    readonly password: string;
    readonly token: string;
  }
  
  export interface IChangeUserInfo {
    readonly email: string;
    readonly name: string;
  }

  export interface IWebSocket {
    wsInit: string;
    onOpen: string;
    onClosed: string;
    onError: string;
    onMessage: string;
  }

