const { default: axios } = require("axios");
const CLIENT_ID = "99122d0aa958b08d0b22438887528695";
const CLIENT_SECRET =
  "de06652d7e10aab3bfacafc5602bec2f4c752d2124dfcf55feeab8f868ff8625";
const URL = "https://api.jdoodle.com/v1/execute";
var body = {
  script: `my_str = input("Enter a string: ")
print(my_str)
`,
  language: "python3",
  versionIndex: "0",
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  stdin: "abc",
};
axios
  .post(URL, body)
  .then((res, err) => console.log(res.data))
  .catch((err) => console.log(err));
