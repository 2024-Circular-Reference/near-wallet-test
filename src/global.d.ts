import type Chrome from 'chrome';

declare namespace chrome {
  export default Chrome;
}

declare module 'virtual:reload-on-update-in-background-script' {
  export const reloadOnUpdate: (watchPath: string) => void;
  export default reloadOnUpdate;
}

declare module 'virtual:reload-on-update-in-view' {
  const refreshOnUpdate: (watchPath: string) => void;
  export default refreshOnUpdate;
}

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.json' {
  const content: string;
  export default content;
}

declare global {
  type LoginNear = {
    type: 'LoginNear';
    input: {
      id: string;
      pw: string;
    };
    data: 'login';
  };

  type LogoutNear = {
    type: 'LogoutNear';
    input?: never;
    data: 'logout';
  };

  type ErrorMessage = {
    type: 'Error';
    input?: never;
    error: Error;
    data?: never;
  };

  type CreateAccount = {
    type: 'CreateAccount';
    input: {
      id: string;
      pw: string;
    };
    data?: {
      seedPhrase: string;
      publicKey: string;
      secretKey: string;
    };
  };

  type GetPhrase = {
    type: 'GetPhrase';
    input?: never;
    data: {
      seedPhrase: string;
    };
  };

  type Message = LoginNear | LogoutNear | CreateAccount | GetPhrase;

  type RequestMessage<M = Message> = Omit<M, 'data'>;
  type ResponseMessage<M = Message> = Omit<M, 'input' | 'error'>;
}
