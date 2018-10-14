
import bluetooth
import RPi.GPIO as GPIO
pin = 4	
GPIO.setmode(GPIO.BCM)
GPIO.setup(pin, GPIO.OUT)	
host = ""
port = 1	

server = bluetooth.BluetoothSocket(bluetooth.RFCOMM)
print('Bluetooth Socket Created')
try:
	server.bind((host, port))
	print("Bluetooth Binding Completed")
except:
	print("Bluetooth Binding Failed")
print("Connecting...")
server.listen(1)  
client, address = server.accept()
print("Connected To", address)
print("Client:", client)
try:
	while True:
		 
		data = client.recv(1024) 
		print(data)
		
		if data == "o":
			GPIO.output(pin,1)
			#send_data = "Light On "
		elif data == "O":
			GPIO.output(pin,1)
			#send_data = "Light Off "
		elif data == 'x':
			GPIO.output(pin,0)	
		elif data == 'X':
			GPIO.output(pin,0)
		else:
			send_data = "plase input o or x "
		#client.send(send_data) 
except:
	
	GPIO.cleanup()
	client.close()
	server.close()
