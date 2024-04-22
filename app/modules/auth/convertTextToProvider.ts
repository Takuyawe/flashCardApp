export const convertTextToProvider = (text: string) => {
  switch (text) {
    case 'Google':
      return 'google';
    case 'Facebook':
      return 'facebook';
    default:
      return 'google';
  }
};
