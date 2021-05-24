
# csv-uploader server

Replace proxy in package.json to "http://csv-uploader-node-server:8080"
Build Client Image
`$ docker build -t csv-uploader-react:v1 .`

Run the container
`$ docker run -p 80:80 csv-uploader-react:v1 `

If you want to expose to external port
`$ docker run --name some-nginx -d -p 8001:80 csv-uploader`