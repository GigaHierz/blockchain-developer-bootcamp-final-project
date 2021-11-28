const express = require("express");
const cors = require("cors");
const create = require("ipfs-http-client");

const app = express();
const allowedOrigins = ["http://localhost:3000"];
const options = {
  origin: allowedOrigins,
};

app.use(cors(options));

// app.get("/love", (req, res) => {
//   res.send({ express: "LOVE" }); //Line 10
// });

app.post("/upload", (req, res) => {
  let fileObj = {};
  if (req.inputFile) {
    const file = req.inputFile;
    const fileName = file.name;
    const filePath = __dirname + "/files/" + fileName;

    file.mv(filePath, async (err) => {
      if (err) {
        console.log("Error: failed to download file.");
        return res.status(500).send(err);
      }

      const fileHash = await addFile(fileName, filePath);
      console.log("File Hash received __>", fileHash);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log("Error: Unable to delete file. ", err);
        }
      });
      fileObj = {
        file: file,
        name: fileName,
        path: filePath,
        hash: fileHash,
      };
      res.render("transfer", { fileObj });
    });
  }
});

const addFile = async (fileName, filePath) => {
  const client = create({
    url: "https://ipfs.infura.io:5001/api/v0",
  }); /* upload the file */
  const file = fs.readFileSync(filePath);
  const filesAdded = await client.add(
    { path: fileName, content: file },
    {
      progress: (len) => console.log("Uploading file..." + len),
    }
  );
  console.log(filesAdded);
  const fileHash = filesAdded.cid.string;

  return fileHash;
};

app.listen(5000, () => {
  console.log("Express server listening on port 5000");
});
