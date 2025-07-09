const maliciousPatterns = [
  /union select/i,
  /<script>/i,
  /\.exe$/i,
  /masscan/i,
  /nmap/i,
];

async function classifyTraffic(log) {
  const raw = JSON.stringify(log);
  if (maliciousPatterns.some((pat) => pat.test(raw))) {
    return "malicious";
  }
  return "benign";
}

module.exports = { classifyTraffic };
