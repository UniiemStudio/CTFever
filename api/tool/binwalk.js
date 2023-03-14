import gateway from "~/api/gateway";

export default axios => ({
  scan: (file) => {
    return gateway(axios).call('binwalker', 'scan', null, file);
  },
  artifact: (artifact_id, filename) => {
    return gateway(axios).call('binwalker', 'artifact', {artifact_id: artifact_id, filename: filename});
  }
})
