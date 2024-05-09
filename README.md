# webSocketTest
Client and Server tests with Websockets. <br/>
.\venv\Scripts\activate <br/>
# Command to run UR Simulator
sudo docker run --rm -it -e ROBOT_MODEL=UR5 -p 5900:5900 -p 6080:6080 universalrobots/ursim_cb3 <br />
Run python server.py to start up the server, server connect to ur_control to connect with the robot </br>
python client.py <br />
