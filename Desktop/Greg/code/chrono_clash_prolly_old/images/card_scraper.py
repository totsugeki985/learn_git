import http.client
import time

list_files = [ open("naruto_list.txt", "r" ) , open( "godzilla_list.txt" , "r" ) , open("evangelion_list.txt" , "r" ) ]
folders = [ "naruto" , "godzilla" , "evangelion" ]
host = "chronocardimages.blob.core.windows.net"
sub_dir = "/chronocardimages"



for x in range( 0 , len(list_files) ):
	connection = http.client.HTTPSConnection( "chronocardimages.blob.core.windows.net" )
	cards = list_files[x].readlines()
	list_files[x].close()
	for card in cards:
		connection.request( 'GET' , sub_dir + "/" + card.rstrip() + ".jpg" )
		try:
			r = connection.getresponse()
		except http.client.ResponseNotReady:
				print( "response not ready" )
				exit(1)
		if r.status != 200:
			with open( "error_log.txt" , "w" ) as log:
				log.write( card.rstrip() + " : " + str(r.status) + "\n" )
		else:
			new_image_path = "./" + folders[x] + "/" + card.rstrip() + ".jpg"
			card_image = open( new_image_path , "wb" )
			card_image.write( r.read() )
			card_image.close()
	connection.close()		