import sys
import re
from os import path, linesep
from PIL import Image


if len(sys.argv) < 3:
    print( "Usage: python GaniParser.py gani_path direction" )
    exit(1)
    
with open( "config.txt" , "r" ) as config_file:
    config = {}
    lines = config_file.readlines()
    for line in lines:
        tokens = line.split("=")
        config[ tokens[0] ] = tokens[1]
    

GRAAL_FOLDER = config.get( "graal_folder" )
LEVELS_FOLDER = path.join( GRAAL_FOLDER , "levels" )
IMAGES_FOLDER = path.join( LEVELS_FOLDER , "images" )
BODIES_FOLDER = path.join( LEVELS_FOLDER , "bodies" )
HEADS_FOLDER = path.join( LEVELS_FOLDER , "heads" )
SHIELDS_FOLDER = path.join( LEVELS_FOLDER , "shields" )
HATS_FOLDER = path.join( LEVELS_FOLDER , "hats" )
GANI = sys.argv[1]

DEFAULT_SPRITES = \
{ 
    "BODY" : ( BODIES_FOLDER , "body1.png" ) , 
    "HEAD" : ( HEADS_FOLDER  , "head0.png" ) ,
    "SHIELD" : ( SHIELDS_FOLDER , "shield1.png" ),
    "ATTR1" : ( HATS_FOLDER , "hat1.png" ),
}

class Utils:

    def __init__(self):
        pass
        
    #retrieves files like era_foobar by splitting the string and checking if the file is there    
    #fuck the images can be in any of the folders.... wtf.  one is a shield - check chidori
    @staticmethod
    def get_image( file_name ):
        print( "retrieving file: " + file_name )
        tokens = file_name.split("_")
        
        if len( tokens ) < 1:
            return None
            
        file_path = path.join( path.join( IMAGES_FOLDER , tokens[0] ) , file_name )
        
        print( file_path + " " + str( path.isfile( file_path ) ) )
        
        if not path.isfile( file_path ):
            file_path = path.join( path.join( IMAGES_FOLDER , "downloads" ) , file_name )
            if not path.isfile( file_path ):
                return None
            
    
        return Image.open( file_path ).convert( "RGBA" )
        
class Settings:
    
    def __init__( self , settings_data ):
        self.loop = False
        self.continuous = False
        self.default_param1 = ""
        self.default_param2 = ""
        self.default_param3 = ""
        self.default_attr1 = "hat0.png"
        self.default_attr2 = ""
        self.default_attr3 = ""
        self.default_head = "head0.png"
        self.default_body = "body1.png"
        self.default_shield = "shield1.png"
        self.parse_settings_data( settings_data )
        
    def setTrue( self , attr_name , useless_arg="rawR" ):
        setattr( self , attr_name , True )
        
    def setString( self , attr_name , string ):
        #print( "setting " + attr_name + " to " + string )
        setattr( self , attr_name , string )
        
    def parse_settings_data( self , settings_data ):
    
        switch_map = \
        {
            "LOOP" : ( self.setTrue , "loop" ) ,
            "CONTINUOUS" : ( self.setTrue , "continuous" ) ,
            "DEFAULTPARAM1" : ( self.setString , "default_param1" ) ,
            "DEFAULTPARAM2" : ( self.setString , "default_param1" ) ,
            "DEFAULTPARAM3" : ( self.setString , "default_param1" ) ,
            "DEFAULTATTR1" : ( self.setString , "default_attr1" ) ,
            "DEFAULTATTR2" : ( self.setString , "default_attr1" ) ,
            "DEFAULTATTR3" : ( self.setString , "default_attr1" ) ,
            "DEFAULTHEAD" : ( self.setString , "default_head" ) ,
            "DEFAULTBODY" : ( self.setString , "default_body" ) ,
            "DEFAULTSHIELD" : ( self.setString , "default_shield" )
        }
        for line in settings_data:
            tokens = line.split( " " )
            
            #loop/continuous have no second token after, and only appear in data if true            
            if len(tokens) == 1:
                tokens.append("unused string for setTrue" )
                
            two_tuple = switch_map.get( tokens[0] )
            
            if two_tuple is None: 
                print( "setting not coded : " + tokens[0])
                continue
            
            function , attr_name = two_tuple
            function( attr_name , tokens[1] )
            #print( attr_name + ":" + str(getattr( self , attr_name )) )

    def __str__( self ):
        return ( 
            "Settings( loop={} , continuous={} , defaultparam1={} , defaultparam2={} , defaultparam3={} , "
            "defaultattr1={} , defaultattr2={}, defaultattr3={}, defaulthead={} , defaultbody={}, defaultshield={} )" 
        ) \
        .format( self.loop , self.continuous , self.default_param1 , self.default_param2 , self.default_param3 , \
        self.default_attr1 , self.default_attr2 , self.default_attr3 , self.default_head , self.default_body , self.default_shield )

class Still:

    def __init__( self , still_data , sprite_map , direction ):
        self.directions = \
        { 
            "up" : 0 , 
            "left" : 1 , 
            "down" : 2 , 
            "right" : 3
        }
        self.sprite_map = sprite_map
        self.sprite_coords = self.parse_sprite_coords( still_data , direction )
        self.length = self.parse_length( still_data )
        self.sound_file = self.parse_sound_file( still_data )
        self.offset = self.calculate_offset( self.sprite_coords )
        #self.sprite_coords = self.adjust_coords( self.sprite_coords , self.offset )
        self.dimensions = self.calculate_dimensions( self.sprite_coords )
        

        
    def parse_sound_file( self , still_data ):
        match = re.search( "PLAYSOUND.*" , still_data , re.DOTALL )
        if match is None:
            return None
        line = match.group(0)
        tokens = line.split( " " )
        return tokens[1]
    
    def parse_length( self , still_data ):
        match = re.search( "WAIT.*" , still_data , re.DOTALL )
        if match is None:
            return 0.05 #the length of 1 frame in graal
        line = match.group(0)
        tokens = line.split( " " )
        return 0.05 + 0.05 * int(tokens[1])
    
    def parse_sprite_coords( self , still_data , direction ):
        sprite_coords = {}
        directions = still_data.split("\n") #up, left , down, right
        matches = re.findall( "-?[0-9]+\s+-?[0-9]+\s+-?[0-9]+" , directions[ self.directions.get(direction) ] )
        for match in matches:
            split = re.split( "\s+" , match )
            sprite_coords[ int(split[0]) ] = ( int(split[1]) , int(split[2]) ) 
        return sprite_coords
        
        
    def calculate_offset( self , sprite_coords ):
        x_offset = 0
        y_offset = 0
        for coord in sprite_coords.values():
            if coord[0] < x_offset:
                x_offset = coord[0]
            if coord[1] < y_offset:
                y_offset = coord[1]
        return ( abs(x_offset) , abs(y_offset) )
        
    def adjust_coords( self , offset ):
        
        if offset[0] == 0 and offset[1] == 0:
            return
            
        for key , value in self.sprite_coords.items():
            self.sprite_coords[key] = ( value[0] + offset[0], value[1] + offset[1] )
            

            
        
    def calculate_dimensions( self , sprite_coords ):
        dim_x = 0
        dim_y = 0
        for sprite_index, coord  in sprite_coords.items():
            width = self.sprite_map[sprite_index].width
            height = self.sprite_map[sprite_index].height
            if coord[0] + width > dim_x:
                dim_x = coord[0] + width
            if coord[1] + height > dim_y:
                dim_y = coord[1] + height
        return ( 0 , 0 , dim_x , dim_y )
        
        
    def create_image( self , dimensions ):
        print( dimensions )
        still_img = Image.new( "RGBA" , dimensions ) #change this line to fix the dimensions of biggest frame in animation
        for sprite_index , coord in self.sprite_coords.items():
            sprite = self.sprite_map[sprite_index]
            sprite_img = sprite.get_image()
            
            #print( sprite )
            #print( sprite_img )
            
            if sprite_img is None:
                print( "not pasting " + sprite.name )
                continue
            still_img.paste( sprite_img , ( coord[0] , coord[1] ) , mask=sprite_img)#, coord[0] + 20 , coord[1] + 20 ) )
        return still_img
        
    
    def __str__( self ):
        return "Still( sprite_coords={} ,\nlength={} , sound_file={} , offset={} , dimensions={})".format( self.sprite_coords , self.length , \
        self.sound_file , self.offset , self.dimensions )
        

class Animation:
    
    def __init__( self , animation_data , sprite_map , direction ):
        self.direction = direction
        self.stills = self.get_stills( animation_data , sprite_map , direction )
        self.dimension = self.get_largest_dimension( self.stills )
        self.offset = self.calculate_offset( self.stills )
        print( self.dimension )
        #for still in self.stills:
            #print( still.dimensions )
        
    def get_stills( self , animation_data , sprite_map , direction ):
        stills = []
        chunks = animation_data.split( "\n\n" )
        for chunk in chunks:
            stills.append( Still( chunk , sprite_map , direction ) )
        return stills
        
    def get_largest_dimension( self , stills ):
        dim_x = 0
        dim_y = 0
        for still in stills:
            if still.dimensions[2] > dim_x:
                dim_x = still.dimensions[2]
            if still.dimensions[3] > dim_y:
                dim_y = still.dimensions[3]
        return ( dim_x , dim_y )
        
    def calculate_offset( self , stills ):
        offset_x = 0
        offset_y = 0
        for still in stills:
            offset = still.offset
            if offset[0] > offset_x:
                offset_x = offset[0]
            if offset[1] > offset_x:
                offset_y = offset[1]
        return offset
            
        
    def save_gif( self , filename ):
        still_imgs = []
        for still in self.stills:
            still.adjust_coords( self.offset )
            still_imgs.append( still.create_image( (500,500) ) )
            
        #for still_img in still_imgs:
            #still_img.show() 
        #gif = Image.new( "RGBA" , ( still_imgs[0].width , still_imgs[0].height ) )
        still_imgs[0].save( filename, save_all=True , append_images=still_imgs[1:], optimize=False ,\
        duration = 50 , loop=0 , disposal=2)
            
        

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
        
        print( self )        
        if "." in self.sprite_type:  #is a filename
            image = Utils.get_image( self.sprite_type )
            if image is None:
                return None
            box = (self.x , self.y , self.x + self.width , self.y + self.height) #left , upper , right , lower
            self.image = image.crop( box )
            return self.image
            
            
        path_info = DEFAULT_SPRITES.get( self.sprite_type )        
        
        if path_info is None:
            #print( "sprite type not coded: " + self.sprite_type )
            return None
            
        folder , img_file = path_info
        
        with Image.open( path.join(folder , img_file) ).convert("RGBA") as image:
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

    def __init__( self , filename , direction ):
    
        with open( filename , "r" ) as file:
            self.content = file.read()
            self.lines = self.content.splitlines()
            
        #print( len(self.lines) )
        self.lines_parsed = 1 # skip first line, its just "Gani0001"
        
        self.sprite_map = self.get_sprite_map()        
        self.settings = self.get_settings()                
        self.animation = self.get_animation( direction )
        self.animation.save_gif( "coolGif.gif" )
        
        
        
        
    def get_sprite_map( self ):
        sprite_map = {}

        for x in range( self.lines_parsed , len(self.lines) ):
            self.lines_parsed += 1
            
            if self.lines[x][0:6] == "SPRITE":
                sprite = Sprite( self.lines[x] )
                sprite_map[ sprite.sprite_index ] = sprite
            else:
                break
                
        return sprite_map
        
    def get_settings( self ):
        settings_data = []
        for x in range( self.lines_parsed , len(self.lines) ):
            self.lines_parsed +=1 
            
            if self.lines[x] == "":
                break
            else:
                settings_data.append( self.lines[x] )
        return Settings( settings_data )
                
    def get_animation( self , direction ):
        match = re.search( "ANI\n.+?ANIEND" , self.content , flags=re.DOTALL ) 
        if match:
            data = match.group(0)
            data = data.lstrip( "ANI" + linesep )
            data = data.rstrip( "ANIEND" + linesep )
            return Animation( data , self.sprite_map , direction )
        return None

    

GaniParser( GANI , sys.argv[2] )
		