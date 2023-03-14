import gateway from "~/api/gateway";

export default axios => ({
  decompile: (pyc_file) => {
    return gateway(axios).call('pycdecompile', 'decompile', null, pyc_file);
  }
})
