export default (messageApi: any, content: string, type: string) => {
  messageApi.open({
    type: type,
    content: content,
  });
};
