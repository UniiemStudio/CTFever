export default axios => ({
  call: (mod, method, params = null, file = null, progress = true) => {
    let formData = new FormData();
    if (params) formData.append('args', JSON.stringify(params));
    if (file) formData.append('file', file);
    return axios.post(`/gateway/call/${mod}?method=${method}`, formData, {progress: progress})
  },
})
