
# csv-uploader server

Replace 'http://15.207.21.22:8080' in helper.js with your API¯ URL/Localhost
Build Client Image
`$ docker build -t csv-uploader-react:v1 .`

Run the container
`$ docker run -p 80:80 csv-uploader-react:v1 `

If you want to expose to external port
`$ docker run --name some-nginx -d -p 8001:80 csv-uploader`