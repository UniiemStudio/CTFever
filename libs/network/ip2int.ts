export type IntIP = number;

const isValidIntIP = (int: IntIP): boolean => {
  return int >= 0 && int <= 0xffffffff;
};

const ip2int = (ip: string): IntIP => {
  const parts = ip.split(".").map((part) => parseInt(part, 10));
  if (
    parts.length !== 4 ||
    parts.some((part) => isNaN(part) || part < 0 || part > 255)
  ) {
    throw new Error("Invalid IP address format");
  }
  return (
    ((parts[0] << 24) + (parts[1] << 16) + (parts[2] << 8) + parts[3]) >>> 0
  );
};

const int2ip = (int: IntIP): string => {
  if (!isValidIntIP(int)) {
    throw new Error("Invalid integer range for IP address");
  }
  return [
    (int >>> 24) & 0xff,
    (int >>> 16) & 0xff,
    (int >>> 8) & 0xff,
    int & 0xff,
  ].join(".");
};

export { isValidIntIP, ip2int, int2ip };
