import Gateway from "~/api/gateway";
import Pyc from "~/api/tool/pyc";
import Releases from "~/api/releases";
import PortScan from "~/api/tool/port-scan";
import Binwalk from "~/api/tool/binwalk";

export default (context, inject) => {
  const factories = {
    gateway: Gateway(context.$axios),
    releases: Releases(context.$axios),

    tool: {
      pyc: Pyc(context.$axios),
      portScan: PortScan(context.$axios),
      binwalk: Binwalk(context.$axios)
    }
  }

  inject('api', factories);
}
