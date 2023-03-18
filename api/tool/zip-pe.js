import gateway from "~/api/gateway";

export default axios => ({
  pseudo_check: (zip_file) => {
    return gateway(axios).call('ziputil', 'pseudo_check', null, zip_file);
  }
})
