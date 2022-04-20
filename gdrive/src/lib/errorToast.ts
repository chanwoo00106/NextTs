export const errorToast = (message: string): any => ({
  title: message,
  status: "error",
  position: "top-right",
  duration: 2000,
  isClosable: true,
});
