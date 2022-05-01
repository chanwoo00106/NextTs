export const successToast = (message: string): any => ({
  title: message,
  status: "success",
  position: "top-right",
  duration: 2000,
  isClosable: true,
});
