import Gateway from "~/api/gateway";
import Pyc from "~/api/tool/pyc";
import Releases from "~/api/releases";

export default (context, inject) => {
  const factories = {
    gateway: Gateway(context.$axios),
    releases: Releases(context.$axios),

    tool: {
      pyc: Pyc(context.$axios)
    }
  }

  inject('api', factories);
}
