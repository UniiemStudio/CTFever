import Gateway from "~/api/gateway";
import Pyc from "~/api/tool/pyc";

export default (context, inject) => {
  const factories = {
    gateway: Gateway(context.$axios),

    tool: {
      pyc: Pyc(context.$axios)
    }
  }

  inject('api', factories);
}
