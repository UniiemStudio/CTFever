import gateway from "~/api/gateway";

export default axios => ({
  releases_behind: (timestamp) => {
    return gateway(axios).call('releasenote', 'releases_behind', {timestamp: timestamp}, null, false);
  }
})
