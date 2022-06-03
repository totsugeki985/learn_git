import sys
import re
from os import path
from PIL import Image

GRAAL_FOLDER = "C:\\Users\\Christopher Serio\Graal"
LEVELS_FOLDER = path.join( GRAAL_FOLDER , "levels" )
BODIES_FOLDER = path.join( LEVELS_FOLDER , "bodies" )
HEADS_FOLDER = path.join( LEVELS_FOLDER , "heads" )

DEFAULT_SPRITES = \
{ 
    "BODY" : ( BODIES_FOLDER , "body1.png" ) , 
    "HEAD" : ( HEADS_FOLDER  , "head0.png" )
}



class Sprite:
    
    def __init__( self , sprite_data ):
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
        name = fields[7]
        
        #quick dirty way to get the rest of name
        if len(fields) > 7:
            for x in range( 8 , len(fields) ):
                name += " " + fields[x]
                
        return int(fields[1]) , fields[2] , int(fields[3]) , int(fields[4]) , int(fields[5]) , int(fields[6]) , name
        
    def get_image( self ):
    
        if self.image is not None:
            return self.image 

        path_info = DEFAULT_SPRITES.get( self.sprite_type )        
        
        if path_info is None:
            print( "sprite type not coded: " + self.name )
            return None
            
        folder , img_file = path_info
        
        with Image.open( path.join(folder , img_file) ) as image:
            box = (self.x , self.y , self.x + self.width , self.y + self.height) #left , upper , right , lower
            self.image = image.crop( box )
            self.image.save( self.name.replace("\s","_") + "_" + str(self.sprite_index) + ".png" ) #for debugging
            return self.image
        
    def __str__( self ):
        return (
            "Sprite( sprite_index={} , sprite_type={} , "
            "x={} , y={} , width={} , height={}, name={} )"
        ).format( self.sprite_index, self.sprite_type, \
        self.x , self.y , self.width , self.height , self.name )

class GaniParser:

    def __init__( self , filename ):
    
        with open( filename , "r" ) as file:
            self.lines = file.read().splitlines()
            
        #print( len(self.lines) )
        self.lines_parsed = 1 # skip first line, its just "Gani0001"
        
        self.sprites = self.get_sprites()
        for sprite in self.sprites:
            print( sprite )
            img = sprite.get_image()
        
        
    def get_sprites( self ):
        sprites = []

        for x in range( self.lines_parsed , len(self.lines) ):
            self.lines_parsed += 1
            
            if self.lines[x][0:6] == "SPRITE":
                sprites.append( Sprite(self.lines[x]) )
            else:
                break
                
        return sprites

        

if __name__ == "__main__":
    GaniParser( "C:\\Users\\Christopher Serio\\Desktop\\idle.gani" )
		