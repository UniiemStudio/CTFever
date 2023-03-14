import gateway from "~/api/gateway";

export default axios => ({
  scan: (host, ports) => {
    return gateway(axios).call('portscan', 'scan', {host: host, ports: ports});
  }
})
