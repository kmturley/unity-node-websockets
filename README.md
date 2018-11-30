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
3) Open the EchoTest Scene and update the EchoTest.cs file to support objects

```
using UnityEngine;
using System.Collections;
using System;

public class Message
{

    public string type;
    public string data;
}

public class EchoTest : MonoBehaviour {
    IEnumerator Start () {
        WebSocket w = new WebSocket(new Uri("ws://localhost:3000"));
		yield return StartCoroutine(w.Connect());

        Message sendObject = new Message();
        sendObject.type = "init";
        sendObject.data = "unity";
        w.SendString(JsonUtility.ToJson(sendObject));
        Debug.Log("Init");

        int i = 0;
		while (true)
		{
			string reply = w.RecvString();
			if (reply != null)
			{
                Message replyObject = JsonUtility.FromJson<Message>(reply);
                Debug.Log("Received: " + replyObject.type + " - " + replyObject.data);
                if (replyObject.type == "action" && replyObject.data == "move")
                {
                    Camera.current.transform.Translate(new Vector3(1.0f, 0.0f, 0.0f));
                }

                // Send screen capture back via websockets
                yield return new WaitForEndOfFrame();
                int width = Screen.width;
                int height = Screen.height;
                Texture2D tex = new Texture2D(width, height, TextureFormat.RGB24, false);
                tex.ReadPixels(new Rect(0, 0, width, height), 0, 0);
                tex.Apply();
                byte[] bytes = tex.EncodeToPNG();
                UnityEngine.Object.Destroy(tex);
                w.Send(bytes);
            }
            if (w.error != null)
			{
				Debug.LogError ("Error: "+w.error);
				break;
			}
			yield return 0;
		}
		w.Close();
	}
}
```

4) Apply a patch to support string messages: https://github.com/sta/websocket-sharp/issues/181#issuecomment-158873401

## Usage (WebGL)

Create a build at: Unity > File > Build Settings > WebGL and build to this project folder:

    /src

Run the websocket backend using:

    node server.js

In a second terminal window, run the Unity WebGL frontend:

    node client.js

View the frontend at:

    http://localhost:8080/


## Usage (Standalone)

Create a build at: Unity > File > Build Settings > Standalone and build to this project folder:

    /src-standalone

Run the websocket backend using:

    node server.js

In a second terminal window, run the frontend:

    node client-standalone.js

In a third terminal window, run the Unity standalone app:

    open src-standalone/unity.app

View the frontend at:

    http://localhost:8080/
    


## Contact

For more information please contact kmturley
