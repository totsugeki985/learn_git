#this pastebin class works the gmail account battousai780@gmail.com
import requests

class Pastebin:

	def __init__( self ):
		self.dev_key = "825ff451de53213ea5534b2a60015522"
		self.user_key = self.login()
		self.pastes = {}

	def login( self ):
		log_url = "https://pastebin.com/api/api_login.php"
		params = { "api_dev_key" : self.dev_key ,
			   "api_user_name" : "battousai780" ,
			   "api_user_password" : "rawr1337" }
		r = requests.post( url = log_url , data = params )
		response = r.text
		return response

	def paste( self , name , content ):
		paste_url = "https://pastebin.com/api/api_post.php"
		params = { "api_dev_key" : self.dev_key ,
			   "api_option" : "paste" ,
			   "api_paste_code" : content , #this and above are required
			   "api_user_key" : self.user_key ,
			   "api_paste_name" : name ,
			   "api_paste_private" : "2" } #2 means private
		response = requests.post( url = paste_url , data = params )

	#returns a dictionary containing the name of the pastes and their paste code, used for retrieving paste contents
	def list_pastes( self ):
		list = "https://pastebin.com/api/api_post.php"
		params = { "api_dev_key" : self.dev_key ,
			   "api_user_key" : self.user_key ,
			   "api_option" : "list" }
		pastes = requests.post( url = list , data = params ).text.split("</paste>\r\n")
		for x in range( len(pastes) - 1 ): #the last paste is empty
			lines = pastes[x].split("\r\n")
			name = lines[3].lstrip("<paste_title>")
			name = name.rstrip("</paste_title>")

			paste_key = lines[1].lstrip("<paste_key>")
			paste_key = paste_key.rstrip("</paste_key>")

			self.pastes.update( { name : paste_key } )
		return self.pastes


	def del_paste( self , name ):
		if not( name in self.pastes):
			self.list_pastes()
		del_url = "https://pastebin.com/api/api_post.php"
		params = { "api_dev_key" : self.dev_key ,
			   "api_user_key" : self.user_key ,
			   "api_paste_key" : self.pastes.pop( name ) ,
		 	   "api_option" : "delete" }
		requests.post( url = del_url , data = params )

	def get_paste( self , name ):
		if not( name in self.pastes):
			self.list_pastes()
		paste_url = "https://pastebin.com/api/api_raw.php"
		params = { "api_dev_key" : self.dev_key ,
			   "api_user_key" : self.user_key ,
			   "api_paste_key" : self.pastes.pop( name ) ,
			   "api_option" : "show_paste" }
		return requests.post( url = paste_url , data = params ).text

if __name__ == "__main__":
	pb = Pastebin()
	paste = pb.get_paste("Cool Paste!")
	print( paste )
