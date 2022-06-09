from Utils import Utils
from Config import Config
from Settings import Settings
import DefaultConstants

from PIL import Image 
import re


file_regex = re.compile( ".+?\..+")

class Sprite:
    
    def __init__( self , config , sprite_data ):
        
        self.config = config
        self.sprite_index , \
        self.sprite_type ,  \
        self.x , \
        self.y , \
        self.width , \
        self.height , \
        self.name = self.parse_sprite_data( sprite_data )
        self.image = None
        
        
    #index, type , x , y , width , height , name
    def parse_sprite_data( self , data ):
        fields = re.split( "\s+" , data )
        
        #quick dirty way to get the rest of name
        if len(fields) > 7:
            name = fields[7]
            for x in range( 8 , len(fields) ):
                name += " " + fields[x]
            return int(fields[1]) , fields[2] , int(fields[3]) , int(fields[4]) , int(fields[5]) , int(fields[6]) , name
                
        return int(fields[1]) , fields[2] , int(fields[3]) , int(fields[4]) , int(fields[5]) , int(fields[6]) , ""  # sometimes there is no name
        
    def get_image( self ):
    
        #cant find the shadow image anywhere :[[[[
        if self.name == "shadow":
            return None
            
        #return image if we found it once already
        if self.image is not None:
            return self.image 
        
        image_name = ""
        #if custom image
        if "." in self.sprite_type:
            image_name = self.sprite_type
        #else is either a head/body/shield/sword/shadow/attr1-3/param1-3
        else: 
            #
            if hasattr( self.config , self.sprite_type.lower() ): 
               #if specified in config file, pull that image
               image_name = getattr( self.config , self.sprite_type.lower() )
            elif hasattr( DefaultConstants , self.sprite_type ):
                #get the default labels in a constants file
                image_name = getattr( DefaultConstants , self.sprite_type )
        
        image = Utils.get_image( self.config.levels_folder , image_name )     
        
        
        #return none is image not found
        if image is None:
            return None
        
        #if its a body, recolor it if the config specifies to
        if self.sprite_type == "BODY":
            image = Utils.set_color( image , self.config.default_colors , self.config.colors )
            
        #crop the iamge according to the box and return it    
        box = (self.x , self.y , self.x + self.width , self.y + self.height) #left , upper , right , lower
        self.image = image.crop( box )
        return self.image
       
        
    def __str__( self ):
        string =  self.__class__.__name__ + "\n(\n"
        for name , value in vars(self).items():
            if name != "config":
                string += "\t" + str(name) + "=" + str(value) + "\n"
        return string + ")"
        
# if __name__ == "__main__":

    # def getSettings( gani_filename ):
        # with open( gani_filename , "r" ) as gani_file:
            # contents = gani_file.read()
            # match = re.search( "\n\n.+?\n\n" , contents , re.DOTALL )
            # return Settings( match.group(0).replace("\n\n" , "" ).split("\n") )
        
    # import sys
    # config = Config( sys.argv[1] )
    #settings = getSettings( sys.argv[2] )
    
    # with open( sys.argv[2] ) as gani_file:
        # lines = gani_file.readlines()
        # for line in lines:
            # if "SPRITE" in line:
                # sprite = Sprite( config , line )
                # sprite.get_image()
                