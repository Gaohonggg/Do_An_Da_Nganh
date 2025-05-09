import sys
import time
from Adafruit_IO import MQTTClient

feed_id = "door"
username = "Dat_Nguyen"
key = ""

def connected(client):   #Kết nối
    print("Kết nối thành công ...")
    client.subscribe( feed_id )  #Đăng kí nhận dữ liệu từ feed_id

def subscribe(client, userdata, mid, granted_qos):
    print("Subcribe thành công ...")

def disconnected(client):
    print("Ngắt kết nối ...")
    sys.exit(1)

def message(client, id_feed, payload):   #Tin nhắn khi gửi dữ liệu lên feed
    print("Nhận dữ liệu door: ", payload)

client = MQTTClient(username, key)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()

while True:
    
    data = int( input() )
    if data >= 2 :
        break

    client.publish(feed_id, data)
    