export default delay = (time) => {
   return new Promise(resolve => setTimeout(resolve, time));
};