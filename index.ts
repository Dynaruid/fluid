import express, { Request, Response } from "express";
import os from "os";
import path from "path";

const app = express();
const port: string | number = process.env.PORT || 43000;

// 정적 파일을 서빙하는 미들웨어
app.use(express.static(path.join(__dirname, "/web")));

// 모든 경로에 대해 index.html 파일을 반환합니다.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "web/index.html"));
});

const interfaces = os.networkInterfaces();
const addresses: string[] = [];

for (const iface in interfaces) {
  const networkInterface = interfaces[iface];
  if (networkInterface) {
    for (const alias of networkInterface) {
      if (alias.family === "IPv4" && !alias.internal) {
        addresses.push(alias.address.toString() + ":" + port.toString());
      }
    }
  }
}
console.log("addresses: ");
console.log(addresses.join(", "));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
