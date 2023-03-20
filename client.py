import subprocess
import asyncio
import websockets

 
async def test():
    #async with websockets.connect('ws://192.168.1.100:8069') as websocket:
    async with websockets.connect('ws://localhost:8000') as websocket:
        await websocket.send("hello")
        response = await websocket.recv()
        print(response)
        #cmd = 'jack_disconnect genltc:ltc system:playback_1'
        #returned_value = subprocess.call(cmd, shell=True)
        #print ('returned_value: ', returned_value)

 
asyncio.get_event_loop().run_until_complete(test())

print("Client disconnected")