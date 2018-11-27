# unity-node-websockets

Example project using:

* Unity 2018.x
* Node 8.x
* Ws (Websockets) 6.1.x

## Web installation

    npm install

## Unity project setup

1) Create a new Unity project: Unity > File > New Project
2) Install Simple Web Sockets for Unity WebGL: https://assetstore.unity.com/packages/essentials/tutorial-projects/simple-web-sockets-for-unity-webgl-38367
3) Open the EchoTest Scene and change the websocket address to: ws://localhost:3000
4) Apply a patch to support string messages: https://github.com/sta/websocket-sharp/issues/181#issuecomment-158873401
5) Create a build at: Unity > File > Build Settings > WebGL and build to this project /src folder

## Usage

Run the websocket backend using:

    node server.js

In a second terminal window, run the Unity WebGL frontend:

    node client.js

View the frontend at:

    http://localhost:8080/


## Contact

For more information please contact kmturley
