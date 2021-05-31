let VirtualScrolled = (data = [], removeNum = parseInt(data.length/2)) =>{
  let timeout;

  return (addCallback) => {
    clearTimeout(timeout);
    data = data.slice(removeNum);
    timeout = setTimeout(() => {
      addCallback(data);
    }, 600)
  }
}

export default VirtualScrolled
