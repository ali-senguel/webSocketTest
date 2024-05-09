import asyncio
import websockets
from rtde_control import RTDEControlInterface as RTDEControl
import numpy as np

HOST = "localhost"
PORT = 8000
rtde_c = RTDEControl("172.17.0.2")
joint_degs = []
joint_degs.append([1.4, -85, -104, 3.6, 94, -43])
joint_degs.append([1.4, -85, -104, 93.6, 94, -43])
joint_degs.append([1.4, -85, -104, -86.4, 94, -43])
joint_degs.append([1.4, -85, -104, 3.6, 74, -43])
joint_degs.append([1.4, -85, -104, 3.6, 114, -43])
joint_degs.append([1.4, -85, -104, 3.6, 94, -23])
joint_degs.append([1.4, -85, -104, 3.6, 94, -63])
joint_degs.append([1.4, -85, -104, 3.6, 74, -23])
joint_degs.append([1.4, -85, -104, 3.6, 74, -63])
joint_degs.append([1.4, -85, -104, 3.6, 114, -23])
joint_degs.append([1.4, -85, -104, 3.6, 114, -63])
joint_degs.append([1.4, -85, -104, 48.6, 94, -43])
joint_degs.append([1.4, -85, -104, -41.4, 94, -43])



def generate_pos(joints_deg):
    velocity = 0.5
    acceleration = 0.5
    blend = 0.0

    joints_rad = np.radians(joints_deg)
    path_pose1 = [joints_rad[0], joints_rad[1], 
            joints_rad[2], joints_rad[3], 
            joints_rad[4], joints_rad[5], 
            velocity, acceleration, blend]
    return path_pose1

 
# create handler for each connection
async def handler(websocket, path):
 
    status = await websocket.recv()
 
    reply = f"Data recieved as:  {status}!"
    print (f"Server data: {status}")

    
    if status == "Move":
        for i in range(5):
            path_j = [generate_pos(joint_degs[i])]
            rtde_c.moveJ(path_j)
            print (i)
            await websocket.send("Moved")
 
 
 
start_server = websockets.serve(handler, HOST , PORT)
 
asyncio.get_event_loop().run_until_complete(start_server)
 
asyncio.get_event_loop().run_forever()