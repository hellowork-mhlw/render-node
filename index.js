// index.js
const express = require('express')
const { exec } = require("child_process")
const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send(`Hello2 ${process.env.HELLO || ''}`)
})

// /ping エンドポイント
app.get("/ping", (req, res) => {
  const target = req.query.target ?? '8.8.8.8'; // クエリパラメータで対象ホストを指定
  if (!target) {
      return res.status(400).send("Target is required. Use /ping?target=<hostname>");
  }

  // ping コマンドの実行
  exec(`ping -c 4 ${target}`, (error, stdout, stderr) => {
      if (error) {
          console.error(`Error: ${error.message}`);
          return res.status(500).send(`Error: ${error.message}`);
      }
      if (stderr) {
          console.error(`Stderr: ${stderr}`);
          return res.status(500).send(`Stderr: ${stderr}`);
      }

      // 成功時のレスポンス
      res.send(`<pre>${stdout}</pre>`);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`)
})
